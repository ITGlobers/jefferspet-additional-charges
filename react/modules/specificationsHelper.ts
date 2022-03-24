import {
    ContextProps, 
    GetterProps, 
    Specification,
    SaveProps
} from '@typings/helpers'

const specificationFieldName = 'specifications'

export const getLocalStorageSpecification = ({ productId }:GetterProps) =>{
    const specifications = localStorage.getItem(specificationFieldName)
    
    if (!specifications) return null
    
    const productSpecifications = JSON.parse(specifications)

    if(!!productId) return productSpecifications[productId]
    
    return productSpecifications && productSpecifications
}

export const saveLocalStorageSpecifications = ({ productId, specifications }:SaveProps) => {
    if(!productId || !specifications) throw new Error('Error at saveLocalStorageSpecifications: productId or specifications are undefined')
    
    const currentSpecifications = getLocalStorageSpecification({}) ?? {}
    

    const updatedSpecifications = JSON.stringify({...currentSpecifications, [productId]:specifications})
    localStorage.setItem(
        specificationFieldName, 
        updatedSpecifications
    )

    return specifications
}

export const getProductContextSpecifications = ({ productContext, specificationsName, productId }:ContextProps) => {
    if(!productContext) return null
    
    const parsedProductContext = JSON.parse(productContext)
    const productContextId  = parsedProductContext?.product?.productId
    
    if(productContextId !== productId) return null
    
    const allSpecifications = parsedProductContext?.product?.properties
    const match = (specification:Specification) => specificationsName?.includes(specification?.name)
    const contextSpecifications = allSpecifications?.find?.(match)
    const specifications = JSON.parse(contextSpecifications?.values[0])
    const { sku } =specifications

    if(!!productId){
        const specificationsSaved = saveLocalStorageSpecifications({ productId, specifications:sku })
        return specificationsSaved
    }
    return null
}

export const parseSpecifications = (specifications:Specification[]) => {
    let parsedSpecifications = {}
    
    specifications.map((specification:Specification) => {
        const { name, values } = specification
        parsedSpecifications = {
            ...parsedSpecifications,
            [name]:values.pop()
        }
    })

    return parsedSpecifications
}