import { Stay } from "./stay.model"

export interface User {
    _id: string
    email: string
    password: string
    fullname: string
    imgUrl: string
    orders: object[]
    stays: Stay[]
}

export interface FilterBy {
    email?: string
    fullname?: string
}