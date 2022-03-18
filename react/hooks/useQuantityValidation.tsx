import { useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { quantityController } from '../helpers/quantityControls'
import { Item } from '@typings/orderForm'

const additionalChargeId = "109139"

const useQuantityValidation = () => {
  const [state, setState] = useState({
    additionalQuantity:0
  })
  const {orderForm:{ items }} = useOrderForm()
  const { addItem, removeItem, updateQuantity } = useOrderItems();
  const additionalsItem = items.find((item:Item) => item.id === additionalChargeId)
  const additionalsCurrentQuantity = additionalsItem?.quantity 

  const includeAdditionalCharges = (quantityToAdd:number) => {
    const additionalChargeItem = {
      assemblyId: "Additional Charge_shipping",
      id: additionalChargeId,
      seller: "1",
      quantity: quantityToAdd,
    }
    const itemToUpdate = JSON.stringify(additionalChargeItem)
    
    const quantities = {
      quantityToAdd, 
      currentQuantity: additionalsCurrentQuantity
    }
    const methods = {
        addItem, 
        updateQuantity, 
        removeItem
    }
    
    const additionalQuantity = quantityController({methods, quantities, itemToUpdate})
    
    setState({
      ...state,
      additionalQuantity
    })
  }  
  
  return [includeAdditionalCharges, state]
}

export default useQuantityValidation