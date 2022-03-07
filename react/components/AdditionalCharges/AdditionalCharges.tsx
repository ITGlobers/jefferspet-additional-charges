import React from 'react'

interface Props{
    children:any
}

const AdditionalCharges = ({ children }:Props) => {
  return (
    <>
        { children }
    </>
  )
}

export default AdditionalCharges