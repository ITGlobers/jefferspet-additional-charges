import React, { useEffect, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useProduct } from 'vtex.product-context'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { createAdditionalChargeObject } from './utils'

// import { useCssHandles } from 'vtex.css-handles'
// import { useProduct } from 'vtex.product-context'
//
// import { Wrapper } from 'vtex.add-to-cart-button'

// import { OrderForm } from 'vtex.order-manager'
// const { useOrderForm } = OrderForm

// const CSS_HANDLES = [
//   'buttonVisibility'
// ]

export const actionsAdditionalApp = () => {
  const orderForm = useOrderForm()
  const {product, selectedItem, selectedQuantity} = useProduct()
  const additionalChargeObject = createAdditionalChargeObject(product)
  const { addItem, setManualPrice, updateQuantity} = useOrderItems();
  const [additionalShipping, setAdditionalShipping] = useState(false);
  const [hazardousShipping, setHazardousShipping] = useState(false);

  useEffect(() => {
    if (additionalChargeObject.AddShip.productQuantity !== "0") {
      setAdditionalShipping(true)
    }
    if (additionalChargeObject.HazShip.productQuantity !== "0") {
      setHazardousShipping(true)
    }
  }, [])

  console.log("use order items", useOrderItems(), )
  console.log("my additional Charges", additionalChargeObject, additionalShipping, hazardousShipping)

  const addToCart = () => {
    addItem(
      [
        {
          id: selectedItem.itemId,
          quantity: selectedQuantity,
          seller: "1",
          skuName: product.productName,
          name: product.productName,
          options: [
            {
              assemblyId: "Additional Charge_shipping",
              id: 109139,
              seller: "1",
              quantity: 1
            }
          ]
        }
      ]
    )
  }

  const changePrice = () => {
    setManualPrice(5000, 1);
    // let data = JSON.stringify({
    //   "price": 5000
    // })

    // const fetching = () => {
    //   fetch("/api/checkout/pub/orderForm/e7ed44782f774bfe973d97533cac96e4/items/1/price", {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-VTEX-API-AppKey': 'vtexappkey-jefferspet-URQTXD',
    //       'X-VTEX-API-AppToken': 'HMBFHPHQIKMCHGPBJVOFWUNHBHOSLETCNBOOBJYCXHVMETPTDHHBEANNZTEZAOFDRKOFSBZZWLHOYADHRVPEWRXNNAOHFZBICRVTFKABHIFSSZOYQXIFZBGZNARRMRUX'
    //     },
    //     body: data,
    //     redirect: 'follow'
    //   })
    //   .then(response => response.text())
    //   .catch(error => console.log('error', error));
    // }
    // fetching()
  }

  const updateItemQuantity = () => {
    // Here I want to update the quantity and price of Additional or Hazardous Shipping
    console.log(orderForm.orderForm.items[0]);

    updateQuantity({...orderForm.orderForm.items[0], quantity: ++orderForm.orderForm.items[0].quantity})
    updateQuantity({...orderForm.orderForm.items[1], quantity: 1})
  }
  return(
    <>
      <button onClick={addToCart}>ADD TO CART</button>
      <button onClick={changePrice}>CHANGE PRICE</button>
      <button onClick={updateItemQuantity}>UPDATE QUANTITY</button>
    </>
  )
}
