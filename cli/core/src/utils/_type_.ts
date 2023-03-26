export type Obj<T = any> = Record<string, T>

export type RequireSome<T, K extends keyof T> = T & Required<Pick<T, K>>
