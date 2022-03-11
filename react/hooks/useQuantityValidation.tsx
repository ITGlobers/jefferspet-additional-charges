import { useEffect, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { quantityController } from '../helpers/quantityControls'

interface Item{
    productId:string
    quantity:number
    id:string
}

const selectedItemId = "25811"
const additionalChargeId = "109139"

const useQuantityValidation = () => {
  const [state, ] = useState('')
  const {orderForm:{ items }} = useOrderForm()
  const { addItem, removeItem, updateQuantity } = useOrderItems();
  const selectedItem = items.find((item:Item) => item.productId === selectedItemId)
  const additionalsItem = items.find((item:Item) => item.id === additionalChargeId)
  const additionalsCurrentQuantity = additionalsItem?.quantity 
  const addShipAmtQty = 6
  const addShipAmt = 5
  const selectedItemQuantity = selectedItem?.quantity
  
  useEffect(() => {
    const additionalChargeItem = {
      assemblyId: "Additional Charge_shipping",
      id: additionalChargeId,
      seller: "1",
      quantity: addShipAmt,
    }
    const itemToUpdate = JSON.stringify(additionalChargeItem)
    
    const quantities = {
      currentQuantity:additionalsCurrentQuantity,
      selectedItemQuantity, 
      addShipAmtQty, 
      addShipAmt
    }
    const methods = {
        addItem, 
        updateQuantity, 
        removeItem
    }
    
    quantityController({methods, quantities, itemToUpdate})
    
  }, [ selectedItemQuantity ])
  
  return state
}

export default useQuantityValidation