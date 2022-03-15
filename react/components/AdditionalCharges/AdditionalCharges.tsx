import React, { useEffect } from 'react'
import useQuantityValidation from '../../hooks/useQuantityValidation'

const AdditionalCharges = () => {
  const [ includeAdditionalCharges, { selectedItemQuantity }]:any = useQuantityValidation()

  useEffect(()=>{
    includeAdditionalCharges()
  }, [selectedItemQuantity])

  return <> </>
}

export default AdditionalCharges