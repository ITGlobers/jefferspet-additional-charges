import { useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { getLocalStorageSpecification, getProductContextSpecifications } from '../modules/specificationsHelper'

const specificationsName = ["AddShipAmt", "AddShipAmtQty", "HazShipAmt", "HazShipAmtQty"] 

const useSpecifications = () => {
  const [state, ]:any = useState({})
  const productContext = useProduct()
  
  const handleSpecifications = (productId:string) => {
    const specifications = getLocalStorageSpecification({ productId })

    if(!specifications && !!productId){
      const specifications = getProductContextSpecifications({ productContext:JSON.stringify(productContext), specificationsName, productId })
      return specifications
    }
  
    return specifications
  }

  return [handleSpecifications, state]
}

export default useSpecifications