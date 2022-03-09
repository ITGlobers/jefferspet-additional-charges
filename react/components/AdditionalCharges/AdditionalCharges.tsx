import { useEffect } from 'react'
import useSpecifications from '../../hooks/useSpecifications'

const AdditionalCharges = () => {
  const specifications = useSpecifications()
  useEffect(() => {
    console.log(specifications)
  }, [specifications])
  
  return null
}

export default AdditionalCharges