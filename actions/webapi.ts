/* eslint-disable */
import axios from 'axios'
import {time_between} from "@/actions/time"
import Models, {GetModel} from '@/models/index'

const ROOT_API_URL = "https://api.virtualrocketwatching.net/v0"

export async function api_get(path:string=""):Promise<any> {
    if(!path.startsWith("/") && !path.startsWith("\\")){
        path = "/" + path
    }
    let result: any = await axios.get(ROOT_API_URL + path)
    return result
}

export async function get_items(type:string, params:any={}): Promise<any> {
    let path:string = `/q/${type}?${Object.keys(params).map(key => `${key}=${params[key]}`).join("&")}`
    let result:any = await api_get(path)
    return parse_items(result.data.Items)
}

export async function get_missions(params:any={}): Promise<any> {
    let path:string = `/q/mission?${Object.keys(params).map(key => `${key}=${params[key]}`).join("&")}`
    let result:any = await api_get(path)
    result = parse_items(result.data.Items)
    
    let items = result.launch || [];
    items = items.concat(result.event || []);
    items.sort((a:any, b:any) => {
        return a.datetime_format_sort() < b.datetime_format_sort() ? -1 : 1;
    });
    return items
}

export async function get_single_item(type:string, pk:string): Promise<any> {
    let result = await api_get(`/q/${type}/i/${pk}`)
    let res = result.data.Item || {}
    if (res.sk){
        const Model = GetModel(res.sk.replace("_item", ""))
        return new Model(res)
    } else {
        return {}
    }
}

//関連項目のパース
function parse_items (items: any[]) :any {
    console.log("parse_items", items)
    let _items:any = {}
    items.forEach(i => {
        const type = i.sk.replace("_item", "")

        const Model = GetModel(type)
        i = new Model(i)

        if (type in _items) {
            _items[type].push(i)
        } else {
            _items[type] = [i]
        }
    })
    return _items
}

//関連項目の取得
export async function get_item_relation(type:string, pk:string, key=null): Promise<any> {
    let path = `/q/${type}/i/${pk}/rel/`
    if(key){
        path += `${key}/`
    }
    let result = await api_get(path)
    result = result.data.Items
    if(key){
        return result
    } else {
        return parse_items(result)
    }
}

//参照項目の取得
export async function get_item_reference(type:string, pk:string, key=null): Promise<any> {
    let path = `/q/${type}/i/${pk}/ref/`
    if(key){
        path += `${key}/`
    }
    let result = await api_get(path)
    result = result.data.Items
    if(key){
        return result
    } else {
        return parse_items(result)
    }
}
