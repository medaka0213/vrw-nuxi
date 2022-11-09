/* eslint-disable */

export interface BaseModelIF {
  pk: string
  sk: string
  unique: string
}

export class BaseModel implements BaseModelIF {
  pk: string
  sk: string
  unique: string

  constructor(data:any) {
    this.pk = data.pk || ""
    this.sk = data.sk || ""
    this.unique = data.unique || ""
  }

  itemType(): string {
    return this.sk.replace("_item", "")
  }

  itemDetailPath(): string {
    return `/q/${this.itemType()}/i/${this.pk}`
  }
  
  itemListPath(): string {
    return `/q/${this.itemType()}`
  }

  notFound(): boolean {
    return this.pk === "" || this.sk === ""
  }

  get_jp_value(key:string):any {
    const target: any = this
    let value: any = target[key + "_JP"]
    if (value !== undefined && value !== null && value !== "") {
      return value
    }
    value = target[key + "_jp"]
    if (value !== undefined && value !== null && value !== "") {
      return value
    }
    value = target[key]
    if (value !== undefined && value !== null && value !== "") {
      return value
    }
    return null
  }

  imageUrl():string {
    return "https://img.virtualrocketwatching.net/VRWlogo_21-02-14_JP.png"
  }
}
