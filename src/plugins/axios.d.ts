// 定义接口返回数据类型，这里根据后端返回去定义

interface resPage {
    page: number
    pageSize: number
    total: number
    hasNextPage: boolean
    pageTotal: number
}

interface itfRes<T = {}[] | {} | []> {
    code: number
    message: string | undefined
    data: T
    reason?: string
    page?: resPage
}

import * as axios from 'axios'

declare module 'axios' {
    interface AxiosResponse extends itfRes
}