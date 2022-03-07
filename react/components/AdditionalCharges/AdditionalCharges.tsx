import React, { ReactElement } from 'react'

interface Props{
    children: ReactElement | ReactElement[]
}

const AdditionalCharges = ({ children }:Props) => {
  return (
    <>
        { children }
    </>
  )
}

export default AdditionalCharges