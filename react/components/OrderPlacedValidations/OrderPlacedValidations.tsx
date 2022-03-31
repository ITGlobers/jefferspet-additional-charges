import { removeAdditionalItem } from '../../helpers/removeItem'
import { Item } from '@app/typings/orderForm'
import React, { ReactChildren, useEffect} from 'react'
import { useOrder } from 'vtex.order-placed/OrderContext'
import { addAdditionalValue } from '../../helpers/addDomElements'
import { parsePrice } from '../../modules/parseValues'

interface Props{
    children:ReactChildren
}

const additionalChargeId = "109139"

const OrderPlacedValidations = ({ children }:Props) => {

    const { items } = useOrder()
    const idSelector = "op-items-wrapper"
    const itemsId = items.map((item:Item) => item.id)
    const match = (item:Item) => item.id === additionalChargeId
    const additionalsItem = items?.find(match)

    useEffect(()=>{
        if(!items) return
        const countainAdditionals = itemsId?.includes(additionalChargeId)
        if(countainAdditionals){
            const itemIndex = items.findIndex((item:Item) => match(item))
            const additionalValue =  parsePrice({value: additionalsItem?.sellingPrice / 100})
            const classNode = 'li.vtex-order-placed-2-x-totalListItem--Tax'
            removeAdditionalItem({ itemIndex, idSelector })
            addAdditionalValue({ classNode, additionalValue })
        }
    }, [ items ])

    return (
        <>
            <div id={ idSelector }>
                { children }
            </div>
        </>
    )
}

export default OrderPlacedValidations
