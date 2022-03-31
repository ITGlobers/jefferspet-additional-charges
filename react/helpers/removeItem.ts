
interface Props{
    itemIndex:number
    idSelector:string
}

export const removeAdditionalItem = ({ itemIndex, idSelector }:Props) =>{
    setTimeout(()=>{
        const itemsWrapper = document.getElementById(idSelector)
        const itemsSelector = 'div.vtex-order-placed-2-x-package--delivery'
        const itemsNodeList:any = itemsWrapper?.querySelectorAll(itemsSelector)
        const itemsList = [...itemsNodeList]
        itemsList[itemIndex]?.remove()
    }, 1000)
}

export const deleteAdditionalCartItem = () =>{
    setTimeout(()=>{
        const addition = document.querySelector('#image-109139')
        const additionalItem = (
            addition?.
            parentElement?.
            parentElement?.
            parentElement?.
            parentElement?.
            parentElement?.
            parentElement?.
            parentElement?.
            parentElement
        )
        additionalItem?.remove()
    }, 1000)
}
