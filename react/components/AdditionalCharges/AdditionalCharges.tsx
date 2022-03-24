import React, { useEffect, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Item } from '@typings/orderForm'
import useSpecifications from '../../hooks/useSpecifications'
import useQuantityValidation from '../../hooks/useQuantityValidation'


const additionalChargeId = "109139"

const AdditionalCharges = () => {
  
  const { orderForm:{ items } } = useOrderForm()
  const [additionalsPerItem, setAdditionalsPerItem]:any = useState({}) //Guardar productId:additionalTotalChage
  const [getSpecifications] = useSpecifications()
  const [includeAdditionalCharges]:any = useQuantityValidation()

  const getCurrentTotalValue = () =>{
    const match = (item:Item) => item?.id === additionalChargeId
    const additionalItem = items?.find(match)
    const additionalCurrentQuantity = additionalItem?.quantity
    return additionalCurrentQuantity ?? 0
  }

  const totalChargesValue = () =>{
    const reducer = (a:number, b:number) => a + b
    const match = (value:any) => !isNaN(value) || !!value
    const additionalsPerItemValues:any = Object.values(additionalsPerItem)?.filter(match)
    if(additionalsPerItemValues.length > 0){
      const totalChargesPrice = additionalsPerItemValues.reduce(reducer)
      return totalChargesPrice
    }
    return 0
  }

  const setTotalsByItem = () => {
    let itemAdditionals = {}

    if(!items.length) return

    items?.forEach((item:Item) => {
      const { productId, quantity, refId } = item
      const specifications = getSpecifications(productId)
      if(!specifications || productId === additionalChargeId){
        return
      }else{
        const itemSpecifications = specifications?.[refId]
        console.log('itemSpecifications: ', itemSpecifications)
        const { AddShipAmtQty, AddShipAmt, HazShipAmt, HazShipAmtQty } = itemSpecifications ?? { addShipAmtQty:0, addShipAmt:0 }
        const addShipAmtQty = parseInt(AddShipAmtQty)
        const addShipAmt = parseFloat(AddShipAmt)
        const hazShipAmtQty = parseInt(HazShipAmtQty)
        const hazShipAmt = parseFloat(HazShipAmt)
        const selectedItemQuantity = quantity
        const shipToAdd = Math.ceil(selectedItemQuantity / addShipAmtQty) * addShipAmt
        const hazShipToAdd = Math.ceil(selectedItemQuantity / hazShipAmtQty) * hazShipAmt
        const quantityToAdd = isNaN(hazShipToAdd) ? shipToAdd : shipToAdd + hazShipToAdd
        itemAdditionals = {
          ...itemAdditionals,
          [productId]:quantityToAdd
        }
      }
    })
    setAdditionalsPerItem(itemAdditionals)
  }

  useEffect(()=>{ 
    setTotalsByItem()
  }, [items])

  useEffect(()=>{
    const currentTotalValue = getCurrentTotalValue() ?? 0
    const totalValue = totalChargesValue()
    const quantityController = totalValue - currentTotalValue != 0
    if(quantityController && totalValue){   
      //Add additional charges
      includeAdditionalCharges(totalValue)
    }else if(totalValue === 0){
      includeAdditionalCharges(totalValue)
    }
  }, [additionalsPerItem])

  return <> </>
}

export default AdditionalCharges