import moment from "moment-timezone"
import 'moment/locale/ja'

export const searchValue2Params = (mode: string, value0: any, value1: any, stringKey: string): string => {
    //時間ならフォーマット
    if (value0 instanceof Date) {
        value0 = moment(value0).format('YYYY-MM-DD HH:mm:ss');
    }
    if (value1 instanceof Date) {
        value1 = moment(value1).format('YYYY-MM-DD HH:mm:ss');
    }
    
    if (stringKey) {
        value0 = `"${value0}"`
        value1 = `"${value1}"`
    }
    switch (mode) {
        case "EQ":
            return `${value0}`
        case "LT":
            return `..${value0}`
        case "LT_E":
            return `...${value0}`
        case "GT":
            return `${value0}..`
        case "GT_E":
            return `${value0}...`
        case "BEGINS":
            return `${value0}*`
        case "CONTAINS":
            return `*${value0}*`
        case "N_EQ":
            return `--${value0}`
        case "BETWEEN":
            return `${value0}...${value1}`
        case "EX":
            return `*`
        case "N_EX":
            return `--`
        default:
            return `*`
    }
}

export const param2SearchValue = (param: string, stringKey: string): any => {
    let res: any = {}
    if (!param || param === "") {
        res = {
            enable: false,
            mode: "EQ",
            value0: "",
        }
    }
    else if (param === "*") {
        res = {
            enable: true,
            mode: "EX"
        }
    }
    else if (param === "--") {
        res = {
            enable: true,
            mode: "N_EX"
        }
    }
    else if (param.startsWith("...")) {
        res = {
            enable: true,
            mode: "LT_E",
            value0: param.slice(3)
        }
    }
    else if (param.startsWith("..")) {
        res = {
            enable: true,
            mode: "LT",
            value0: param.slice(2)
        }
    }
    else if (param.endsWith("...")) {
        res = {
            enable: true,
            mode: "GT_E",
            value0: param.slice(0, -3)
        }
    }
    else if (param.endsWith("..")) {
        res = {
            enable: true,
            mode: "GT",
            value0: param.slice(0, -2)
        }
    }
    else if (param.startsWith("--")) {
        res = {
            enable: true,
            mode: "N_EQ",
            value0: param.slice(2)
        }
    }
    else if (param.startsWith("*")) {
        res = {
            enable: true,
            mode: "CONTAINS",
            value0: param.slice(1)
        }
    }
    else if (param.endsWith("*")) {
        res = {
            enable: true,
            mode: "BEGINS",
            value0: param.slice(0, -1)
        }
    }
    else if (param.indexOf('...') != -1) {
        res = {
            enable: true,
            mode: "BETWEEN",
            value0: param.split("...")[0],
            value1: param.split("...")[1]
        }
    } else {
        res = {
            enable: true,
            mode: "EQ",
            value0: param
        }
    }
    if (stringKey && res.value0) {
        res.value0 = res.value0.replace(/^"|"$/g, '')
    }
    if (stringKey && res.value1) {
        res.value1 = res.value1.replace(/^"|"$/g, '')
    }
    return res
}

export const modeDict = [{
    key: "EQ",
    value: "完全一致"
}, {
    key: "LT",
    value: "より小さい"
}, {
    key: "LT_E",
    value: "以下"
}, {
    key: "GT",
    value: "より大きい"
}, {
    key: "GT_E",
    value: "以上"
}, {
    key: "BEGINS",
    value: "先頭一致"
}, {
    key: "N_EQ",
    value: "等しくない"
}, {
    key: "BETWEEN",
    value: "範囲"
}, {
    key: "EX",
    value: "値あり"
}, {
    key: "N_EX",
    value: "値なし"
}]