import moment from "moment-timezone"
import 'moment/locale/ja'

import { param2SearchValue, searchValue2Params } from "@/actions/vrwSearch"
import { getTransitionRawChildren } from "nuxt/dist/app/compat/capi"

export enum SearchMode {
    CUSTOM_BETWEEN = "CUSTOM_BETWEEN",
    CUSTOM_AFTER = "CUSTOM_AFTER",
    CUSTOM_BEFORE = "CUSTOM_BEFORE",
    WEEK_TEIKI = "WEEK_TEIKI",
    WEEK = "WEEK",
    MONTH = "MONTH",
    YEAR = "YEAR",
    QUARTER = "QUARTER",
    DISABLED = "DISABLED",
}

export interface timeRangeIF {
    start: string
    end: string
    mode: SearchMode
    enable: boolean
}

const parseMode = (start: string, end: string): SearchMode => {
    const isSame = (a: TimeRange, b: TimeRange): boolean => {
        return a.start === b.start && a.end === b.end
    }
    const customRange = new TimeRange({start, end, mode: SearchMode.CUSTOM_BETWEEN})
    const targetModes = [
        SearchMode.WEEK_TEIKI, SearchMode.WEEK, SearchMode.MONTH, SearchMode.YEAR, SearchMode.QUARTER
    ]
    for (const mode of targetModes) {
        const range = TimeRange.fromMode(new Date(customRange.start), mode)
        if (isSame(range, customRange)) {
            return mode
        }
    }
    return SearchMode.CUSTOM_BETWEEN
}

export class TimeRange implements timeRangeIF {
    start: string
    end: string
    mode: SearchMode
    enable: boolean = false
    constructor(data:timeRangeIF = {
        start: "",
        end: "",
        mode: SearchMode.DISABLED,
        enable: false
    }){
        this.start = data.start || ""
        this.end = data.end || ""
        this.mode = data.mode || SearchMode.CUSTOM_BETWEEN
        this.enable = data.enable || false
    }

    // 文字列から生成
    static fromString(str:string=""): TimeRange {
        let data = param2SearchValue(str, "datetime")

        if (data.mode === "BETWEEN"){
            return new TimeRange({
                start: data.value0,
                end: data.value1,
                mode: parseMode(data.value0, data.value1),
                enable: true
            })
        } else if (data.mode === "EQ"){
            return new TimeRange({
                start: data.value0,
                end: data.value0,
                mode: SearchMode.CUSTOM_BETWEEN,
                enable: true
            })
        } else if (data.mode === "GT" || data.mode === "GT_E"){
            return new TimeRange({
                start: data.value0,
                end: data.value0,
                mode: SearchMode.CUSTOM_AFTER,
                enable: true
            })
        } else if (data.mode === "LT" || data.mode === "LT_E"){
            return new TimeRange({
                start: data.value0,
                end: data.value0,
                mode: SearchMode.CUSTOM_BEFORE,
                enable: true
            })
        } else if (data.mode === "BEGINS"){
            // ほんとはパースしたいけど、いまちょっと思いつかないので無効化する
            return new TimeRange({
                start: "",
                end: "",
                mode: SearchMode.DISABLED,
                enable: false
            })
        } else {
            return new TimeRange({
                start: "",
                end: "",
                mode: SearchMode.DISABLED,
                enable: false
            })
        }
    }

    // モードから期間を生成
    static fromMode(dt:Date, mode:SearchMode, dt2:Date=new Date): TimeRange {
        console.log("fromMode", moment(dt), mode)
        let start = moment(dt)
        let end = moment(dt)
        switch (mode) {
            case SearchMode.WEEK_TEIKI:
                console.log("WEEK_TEIKI")
                start = moment(dt).startOf("week")
                end = moment(dt).endOf("week")
                break
            case SearchMode.WEEK:
                console.log("WEEK")
                start = moment(dt).startOf("week").add(1, "day")
                end = moment(dt).endOf("week").add(1, "day")
                break
            case SearchMode.MONTH:
                console.log("MONTH")
                start = moment(dt).startOf("month")
                end = moment(dt).endOf("month")
                break
            case SearchMode.YEAR:
                console.log("YEAR")
                start = moment(dt).startOf("year")
                end = moment(dt).endOf("year")
                break
            case SearchMode.QUARTER:
                console.log("QUARTER")
                start = moment(dt).startOf("quarter")
                end = moment(dt).endOf("quarter")
                break
            case SearchMode.CUSTOM_BETWEEN:
                console.log("CUSTOM_BETWEEN")
                start = moment(dt)
                end = moment(dt2)
                break
            case SearchMode.CUSTOM_AFTER:
                console.log("CUSTOM_AFTER")
                start = moment(dt)
                end = moment(dt)
                break
            case SearchMode.CUSTOM_BEFORE:
                console.log("CUSTOM_BEFORE")
                start = moment(dt)
                end = moment(dt)
                break
            default:
                return new TimeRange({
                    start: "",
                    end: "",
                    mode: SearchMode.DISABLED,
                    enable: false
                })
        }
        return new TimeRange({
            start: start.format("YYYY-MM-DDTHH:mm:ss"),
            end: end.format("YYYY-MM-DDTHH:mm:ss"),
            mode: mode,
            enable: true
        })
    }

    // 文字列に変換
    toString(): string {
        if (this.mode === SearchMode.CUSTOM_BEFORE){
            return searchValue2Params("LT_E", this.start, null, "datetime")
        } else if (this.mode === SearchMode.CUSTOM_AFTER){
            return searchValue2Params("GT_E", this.end, null, "datetime")
        } else if (this.mode === SearchMode.DISABLED){
            return searchValue2Params("EX", null, null, "datetime")
        }
        return searchValue2Params("BETWEEN", this.start, this.end, "datetime")
    }

    // 次の範囲
    prev(): TimeRange {
        switch (this.mode) {
            case SearchMode.WEEK_TEIKI:
                return TimeRange.fromMode(moment(this.start).add(1, "weeks").toDate(), SearchMode.WEEK_TEIKI)
            case SearchMode.WEEK:
                return TimeRange.fromMode(moment(this.start).add(1, "weeks").toDate(), SearchMode.WEEK)
            case SearchMode.MONTH:
                return TimeRange.fromMode(moment(this.start).add(1, "months").toDate(), SearchMode.MONTH)
            case SearchMode.YEAR:
                return TimeRange.fromMode(moment(this.start).add(1, "years").toDate(), SearchMode.YEAR)
            case SearchMode.QUARTER:
                return TimeRange.fromMode(moment(this.start).add(1, "quarters").toDate(), SearchMode.QUARTER)
            case SearchMode.CUSTOM_BETWEEN:
                let range = moment(this.end).diff(moment(this.start), "days")
                return new TimeRange({
                    start: moment(this.end).add(1, "day").format("YYYY-MM-DDTHH:mm:ss"),
                    end: moment(this.end).add(range + 1, "day").format("YYYY-MM-DDTHH:mm:ss"),
                    mode: SearchMode.CUSTOM_BETWEEN,
                    enable: true
                })
            default:
                return this
        }
    }

    // 前の範囲
    next(): TimeRange {
        switch (this.mode) {
            case SearchMode.WEEK_TEIKI:
                return TimeRange.fromMode(moment(this.start).add(-1, "weeks").toDate(), SearchMode.WEEK_TEIKI)
            case SearchMode.WEEK:
                return TimeRange.fromMode(moment(this.start).add(-1, "weeks").toDate(), SearchMode.WEEK)
            case SearchMode.MONTH:
                return TimeRange.fromMode(moment(this.start).add(-1, "months").toDate(), SearchMode.MONTH)
            case SearchMode.YEAR:
                return TimeRange.fromMode(moment(this.start).add(-1, "years").toDate(), SearchMode.YEAR)
            case SearchMode.QUARTER:
                return TimeRange.fromMode(moment(this.start).add(-1, "quarters").toDate(), SearchMode.QUARTER)
            case SearchMode.CUSTOM_BETWEEN:
                let range = moment(this.end).diff(moment(this.start), "days")
                return new TimeRange({
                    start: moment(this.start).add(-range - 1, "day").format("YYYY-MM-DDTHH:mm:ss"),
                    end: moment(this.start).add(-1, "day").format("YYYY-MM-DDTHH:mm:ss"),
                    mode: SearchMode.CUSTOM_BETWEEN,
                    enable: true
                })
            default:
                return this
        }
    }
}

/*
export function time_between(dt_0:string="", dt_1:string="", mode:string="upcoming", weeks:number=0, months:number=0, years:number=0): string[]{
    if (mode==="custom"){
        return [dt_0, dt_1]
    }

    let start:any = moment.utc().format('YYYY-MM-DDTHH:mm:ss');
    let end:any = moment.utc();
    if (mode == "upcoming"){
        if (weeks > 0){
            end.set({
                'date': end.date() - end.day() + 7 * (weeks + 1),
                'hour': 15,
                'minute': 0,
                'second': 0,
                'millisecond': 0
            });
            start.set({
                'date': start.date() - start.day(),
                'hour': 12,
                'minute': 0,
                'second': 0,
                'millisecond': 0
            });
        } else {
            end.set({
                'year': end.year() + years,
                'month': years? 1 : end.month() + months,
                'date': 0,
                'hour': 0,
                'minute': 0,
                'second': 0,
                'millisecond': 0
            });
            start.set({
                'month': years? 1 : end.month(),
                'date': 0,
                'hour': 0,
                'minute': 0,
                'second': 0,
                'millisecond': 0
            });
        }

    } else if (mode == "past"){
        start = moment.utc();
        start.set({
            'month': start.month() - months,
            'date': 1,
            'hour': 0,
            'minute': 0,
            'second': 0,
            'millisecond': 0
        });
    return [end.format('YYYY-MM-DDTHH:mm:ss'), start];
}
}
*/
