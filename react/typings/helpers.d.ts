export interface ContextProps{
    productContext:string
    specificationsName:string[]
    productId:string
}
export interface GetterProps{
    productId?:string
}
export interface Specification{
    name:string
    values:string[]
}
export interface SpecificationData{
    Name:string
}

export interface GetProductSpecificationsProps extends GetterProps{
    specificationsName:string[] | undefined
}
export interface GetSpecificationsProps extends ContextProps{
    productId?:string
}
export interface SaveProps extends GetterProps{
    specifications:any
}