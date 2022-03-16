interface ContextProps{
    productContext:string
    specificationsName:string[]
}
interface GetterProps{
    productId:string
}
interface Specification{
    name:string
}
interface SpecificationData{
    Name:string
}

interface GetSpecificationsProps extends ContextProps{
    productId:string
}
interface SaveProps extends GetterProps{
    specifications:string
}

const specificationFieldName = 'productSpecifications'

export const getLocalStorageSpecification = ({ productId }:GetterProps) =>{
    if(!productId) return false
    
    const specifications = localStorage.getItem(specificationFieldName) ?? '{}'
    const productSpecification = JSON.parse(specifications)[productId]

    return productSpecification && productSpecification
}

export const saveLocalStorageSpecification = ({ productId, specifications }:SaveProps) => {
    if(!productId || !specifications) return
    const currentSpecifications = getLocalStorageSpecification({ productId })
    const updatedSpecifications = JSON.stringify({...currentSpecifications, [productId]:[...specifications]})
    localStorage.setItem(
        specificationFieldName, 
        updatedSpecifications
    )
    return updatedSpecifications
}

export const getProductContextSpecifications = ({ productContext, specificationsName }:ContextProps) => {
    const allSpecifications = JSON.parse(productContext)?.product?.properties
    const match = (specification:Specification) => specificationsName?.includes(specification?.name)
    const specifications = allSpecifications?.find?.(match)

    return specifications ?? false
}

export const getProductSpecifications = ({specificationsName, productId}:any) => {
    const additionalChargeItemId = '50114'
    if(productId === additionalChargeItemId) return
    let specifications
    const url = `/api/catalog_system/pvt/products/${productId}/specification`

    fetch(url)
    .then(response=>response.json())
    .then(data => {
        const match = (specification:SpecificationData) => specificationsName?.includes(specification?.Name)
        specifications = data?.filter(match)
    })

    return specifications
}

export const getSpecifications = ({ specificationsName, productContext, productId }:GetSpecificationsProps) =>{
  
  const specifications = ( 
    getLocalStorageSpecification({ productId }) 
    ? 
    getLocalStorageSpecification({ productId }) 
    :
    getProductContextSpecifications({ productContext, specificationsName })
    ?
    getProductContextSpecifications({ productContext, specificationsName })
    :
    getProductSpecifications( productId )
  )
  
  return specifications
}