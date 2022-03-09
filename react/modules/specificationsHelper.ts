interface Props{
    specificationId:string
}

interface saveProps{
    specificationId:string
    specifications:string
}

const specificationFieldName = 'specifications'

export const getSpecification = ({ specificationId }:Props) =>{
    if(!specificationId) return
    
    const specifications = localStorage.getItem(specificationFieldName) ?? ''
    const specification = JSON.parse(specifications)[specificationId]
    return specification
}

export const saveSpecification = ({ specificationId, specifications }:saveProps) => {
    if(!specificationId) return
    const currentSpecification = getSpecification({ specificationId })
    localStorage.setItem(
        specificationFieldName, 
        JSON.stringify({
            ...currentSpecification, 
            [specificationId]:specifications
        })
    )
}