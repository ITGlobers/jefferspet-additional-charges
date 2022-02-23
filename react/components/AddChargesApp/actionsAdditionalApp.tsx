import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { Wrapper } from 'vtex.add-to-cart-button'

// import { OrderForm } from 'vtex.order-manager'
// const { useOrderForm } = OrderForm

const CSS_HANDLES = [
  'buttonVisibility'
]

export const actionsAdditionalApp = () => {

  const { product, selectedItem } = useProduct()
  const { addItem } = useOrderItems()
  // const { orderForm } = useOrderForm()

  // const productProperties = product?.properties
  // const shipAmmountQuantityObject = productProperties.filter(
  //   (productProperty: any) => productProperty.name === 'AddShipAmtQty'
  // )

  // const shipAmmountQuantity = parseInt(shipAmmountQuantityObject[0]?.values[0])

  const { skuSelector } = !!product && product
  const skuIsSelected = skuSelector?.areAllVariationsSelected

  const [valueAdditional, setValueAdditional] = useState(0)
  const [charges, setCharges] = useState(false)
  // const [quytProduct, setQytProduct] = useState(0)

  const handles: any = useCssHandles(CSS_HANDLES)

  useEffect(() => {

    console.log('productoo', product)

    setCharges(false)
    let dropdownContainer: any = document.getElementById("dropdownContainer")

    if (dropdownContainer) {
      dropdownContainer.style.display = "block"
    }

    if (product.properties) {
      let nameAdditional = product.properties.find((parameter: any) =>
        parameter.name === "AddShipAmt"
      )
      if (product.itemMetadata) {
        let itemName = product.itemMetadata.items.find((element: any) =>
          element.name === "Additional Charge"
        )
        if (itemName) {
          setCharges(true)
          if (dropdownContainer) {
            dropdownContainer.style.display = "none"
          }
        }
      }
      if (nameAdditional) {
        setValueAdditional(parseFloat(nameAdditional.values[0]))
      }
    }
  }, [product, valueAdditional, charges, selectedItem])

  const addAdditionalCharges = () => {
    // let productIterations = Math.ceil(quytProduct / shipAmmountQuantity)
    addItem([{
      id: selectedItem.itemId,
      quantity: 10,
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
    }])
  }

  // setTimeout(() => {
  //   const qytProduct: any = document.querySelector(`#quantity-dropdown-${selectedItem.itemId}`)?.textContent
  //   const qytProductHigh: any = document.querySelector(`#quantity-input-${selectedItem.itemId}`)

  //   if (qytProduct) {
  //     setQytProduct(parseFloat(qytProduct))
  //   }

  //   if (qytProductHigh) {
  //     const qytProductHighNumber = qytProductHigh.value
  //     setQytProduct(parseFloat(qytProductHighNumber))
  //   }

  // }, 0);

  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     'X-VTEX-API-AppKey': 'vtexappkey-jefferspet-URQTXD',
  //     'X-VTEX-API-AppToken': 'HMBFHPHQIKMCHGPBJVOFWUNHBHOSLETCNBOOBJYCXHVMETPTDHHBEANNZTEZAOFDRKOFSBZZWLHOYADHRVPEWRXNNAOHFZBICRVTFKABHIFSSZOYQXIFZBGZNARRMRUX'
  //   },
  //   body: JSON.stringify(
  //     {
  //       noSplitItem: true,
  //       composition: {
  //         items: [
  //           {
  //             id: "109139",
  //             quantity: Math.ceil(quytProduct / 5) * 6,
  //             seller: "1"
  //           }
  //         ]
  //       }
  //     }
  //   ),
  // };

  // const addAdd = () => {
  //   const fetching = () => {
  //     fetch(`/api/checkout/pub/orderForm/3dd925b76f3742a6ab81e40065ea0455/items/0/assemblyOptions/Additional Charge_shipping?an=jefferspet`, options).then(
  //       res => res.json()).then(data => {
  //         console.log('data', data)
  //       }).catch(err => console.error('error:' + err))
  //   }
  //   fetching()
  // }

  const options = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VTEX-API-AppKey': 'vtexappkey-jefferspet-URQTXD',
      'X-VTEX-API-AppToken': 'HMBFHPHQIKMCHGPBJVOFWUNHBHOSLETCNBOOBJYCXHVMETPTDHHBEANNZTEZAOFDRKOFSBZZWLHOYADHRVPEWRXNNAOHFZBICRVTFKABHIFSSZOYQXIFZBGZNARRMRUX'
    },
    body: JSON.stringify({ price: 4000 })
  }

  const changePrice = () => {
    const fetching = () => {
      fetch(`/api/checkout/pub/orderForm/c03c671ab44e4721bf218e2ef47b0148/items/1/price`, options).then(
        res => res.json()).then(data => {
          console.log('data', data)
        }).catch(err => console.error('error:' + err))
    }
    fetching()
  }



  return (
    <>
      {
        charges
          ?
          <button className={`${handles.buttonVisibility}`}
            id='addCharges'
            onClick={addAdditionalCharges}>Add to cart</button>
          :
          <Wrapper addToCartFeedback="customEvent" customPixelEventId="add-to-cart-button" onClickEventPropagation={
            skuIsSelected
              ?
              'enabled'
              :
              'disabled'
          } />
      }

      {/* button test  */}

      <Wrapper addToCartFeedback="customEvent" customPixelEventId="add-to-cart-button" onClickEventPropagation={
        skuIsSelected
          ?
          'enabled'
          :
          'disabled'
      } />

      {/* button fetch  */}
      {/* <button onClick={addAdd}>Add Additional</button> */}
      <button onClick={changePrice}>ChangePrice</button>
    </>
  )
}
