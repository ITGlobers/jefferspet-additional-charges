import React, { ReactChildren, useEffect, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useCssHandles } from 'vtex.css-handles'

interface Props{
  children: ReactChildren
}

interface Item{
  id:string
}

const CSS_HANDLES = ['items__wrapper']
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
  },[ items ])

  return (
    <>
      <div id={itemsWrapperId} className={ handles.items__wrapper }>
        { children }
      </div>  
      {
        !isNaN(price) && price && additionalItemIndex > 0
        &&
        <p className={`ph4 ph6-l pt5 c-on-base`}>
          Additional charges: 
          <span> ${ price }</span> 
        </p>
      }
    </>
  )
}

export default AdditionalChragesItem