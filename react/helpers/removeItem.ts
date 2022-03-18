
interface Props{
    itemIdex:number
    idSelector:string
}

export const removeAdditionalItem = ({ itemIdex, idSelector }:Props) =>{
    setTimeout(()=>{
        const itemsWrapper = document.getElementById(idSelector)
        const itemsSelector = 'div.vtex-flex-layout-0-x-flexRowContent--minicart-components'
        const itemsNodeList:any = itemsWrapper?.querySelectorAll(itemsSelector)
        const itemsList = [...itemsNodeList]
        itemsList[itemIdex]?.remove()
        console.log('itemIdex: ', itemIdex)
    }, 10)
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