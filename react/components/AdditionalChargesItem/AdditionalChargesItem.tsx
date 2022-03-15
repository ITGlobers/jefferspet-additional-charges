import React, { ReactChildren, useEffect, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useCssHandles } from 'vtex.css-handles'
import { removeAdditionalItem } from '../../helpers/removeItem'
import useQuantityValidation from '../../hooks/useQuantityValidation'

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
  const additionalsItem = items?.find?.(matchCondition)
  const additionalItemIndex = items?.findIndex?.(matchCondition)
  const [price, setPrice]:any = useState(0)
  const [ includeAdditionalCharges, { additionalQuantity }]:any = useQuantityValidation()
  
  const validateQuantity =()=>{
    if(additionalQuantity !== additionalsItem?.quantity){
      includeAdditionalCharges()
    }
  }

  useEffect(()=>{
    validateQuantity()
  },[ items ])

  useEffect(()=>{
    if(additionalItemIndex > 0){
      const price = (additionalsItem?.priceDefinition?.total / 100)
      setPrice(price.toFixed(2))
      removeAdditionalItem({ itemIdex:additionalItemIndex, idSelector:itemsWrapperId })
    }
  }, [ items ])

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
          <span> ${ additionalQuantity }</span> 
        </p>
      }
    </>
  )
}

export default AdditionalChragesItem