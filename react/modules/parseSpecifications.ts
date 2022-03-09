interface Specification{
    Id: number
    Name: string
    Value: string[]
}

interface ParserDataProps{
    specifications: Specification[]
    specificName: string
}

export const parseSpecifications = ({specifications, specificName}:ParserDataProps) =>{
    if(!specifications || !specifications.length ) return
    const filterSpecifications = (specification:Specification) => specificName === specification.Name
    const [parsedSpecifications] = specifications?.filter(specification => filterSpecifications(specification))
    return parsedSpecifications
}

export const parseSpecificationsValue = (props:ParserDataProps)=>{
    const specification = parseSpecifications(props)
    return specification?.Value ?? []
}