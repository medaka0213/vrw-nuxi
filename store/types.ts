
export interface RootState {
  version: string;
}

export interface ItemState {
  isReceived : boolean
  [key: string]: any
}
