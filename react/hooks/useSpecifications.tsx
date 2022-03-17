import { useState, useEffect } from 'react'
import { useOrderForm } from "vtex.order-manager/OrderForm"
import { useProduct } from 'vtex.product-context'
import { getLocalStorageSpecification, getProductContextSpecifications } from '../modules/specificationsHelper'

const specificationsName = ["AddShipAmt", "AddShipAmtQty", "HazShipAmt", "HazShipAmtQty"] 

const useSpecifications = () => {
  const [state, setState]:any = useState({})
  const { orderForm:{ items } } = useOrderForm()
  const productContext = useProduct()
  const productId = productContext?.product?.productId
  
  const handleSpecifications = (specifications:any) => {
    const currentSpecifications = state[productId] ?? []

    setState({
      ...state,
      [productId]:[
        ...currentSpecifications,
        specifications
      ]
    })
  }

  useEffect(() => {
    const specifications = getLocalStorageSpecification({productId})

    if(!specifications && !!productId){
      const specifications = getProductContextSpecifications({ productContext:JSON.stringify(productContext), specificationsName })
      handleSpecifications(specifications)
    }else if(!!specifications){
      handleSpecifications(specifications)
    }
  }, [ items ])

  return state
}

export default useSpecifications