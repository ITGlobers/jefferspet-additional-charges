import React, { ReactChildren, useEffect, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useCssHandles } from 'vtex.css-handles'
import { deleteAdditionalCartItem } from '../../helpers/removeItem'
import { parsePrice } from '../../modules/parseValues'

import './AdditionalChargesItem.css'

interface Props{
  children: ReactChildren
}

interface Item{
  id:string
}

const CSS_HANDLES = ['items__wrapper', 'additionals__price', 'additionals__item', 'additionals__icon', 'additionals__wrapper']
const itemsWrapperId = 'items__wrapper'

const additionalChargeId = "109139"

const AdditionalChragesItem = ({ children }:Props) => {

  const { orderForm:{ items }, } = useOrderForm()
  const handles = useCssHandles(CSS_HANDLES)
  const matchCondition = (item:Item) => item.id === additionalChargeId
  const additionalItemIndex = items?.findIndex?.(matchCondition)
  const [price, setPrice]:any = useState(0)

  const getCurrentTotalValue = () =>{
    const match = (item:Item) => item?.id === additionalChargeId
    const additionalItem = items?.find(match)
    const additionalCurrentQuantity = additionalItem?.quantity ?? 0
    setPrice(additionalCurrentQuantity)
    return additionalCurrentQuantity
  }

  useEffect(()=>{
    getCurrentTotalValue()
    deleteAdditionalCartItem()
  },[ items ])

  return (
    <>
      <div id={itemsWrapperId} className={ handles.items__wrapper }>
        { children }
      </div>
      {
        !isNaN(price) && (price !== 0) && additionalItemIndex > 0
        &&
        <div className={`ph4 ph6-l pt5 c-on-base ${ handles.additionals__wrapper }`}>
          <p className={`${ handles.additionals__item }`}>
            <span className={`${handles.additionals__icon} mr4`}></span>
            Additional charges:
          </p>
          <p className={ `${handles.additionals__price} ml4` }> { parsePrice({value: price}) }</p>
        </div>
      }
    </>
  )
}

export default AdditionalChragesItem
