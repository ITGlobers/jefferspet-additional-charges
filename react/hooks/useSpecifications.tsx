import { useState, useEffect } from 'react'
import { useOrderForm } from "vtex.order-manager/OrderForm"
import { parseSpecificationsValue } from '../modules/parseSpecifications'

interface Item{
    productId:string
}

const useSpecifications = () => {
  const [state, setState] = useState([{}])
  const { orderForm:{ items } } = useOrderForm()
  const itemsId = items.map((item:Item) => item.productId)
  
  const parseValue = (data:any) =>{
      const AddShipAmt = parseSpecificationsValue({specificName:'AddShipAmtQty', specifications:data})
      const AddShipAmtQty = parseSpecificationsValue({specificName:'AddShipAmtQty', specifications:data})
      return {AddShipAmt, AddShipAmtQty}
  }
  
  useEffect(() => {
    itemsId.forEach((itemId:string) => {
        const additionalChargeItemId = '50114'
        if(itemId === additionalChargeItemId) return
        const url = `/api/catalog_system/pvt/products/${itemId}/specification`
        fetch(url)
        .then(response=>response.json())
        .then(data => {
            const specifications = parseValue(data)
            setState([...state, {[itemId]:{specifications}}])
        })
    });
  }, [items])

  useEffect(()=>{
    console.log(state)
  }, [state])

  return state
}

export default useSpecifications