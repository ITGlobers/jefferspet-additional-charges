export const createAdditionalChargeObject = (product:any) => {
  const additionalChargeObject = {
    AddShip: {
      productAmmount: "",
      productQuantity: ""
    },
    HazShip: {
      productAmmount: "",
      productQuantity: ""
    }
  }
  product.properties.forEach((property: any) => {
    switch (property.name) {
      case "AddShipAmtQty":
        additionalChargeObject.AddShip.productQuantity = property.values[0]
        break
      case "AddShipAmt":
        additionalChargeObject.AddShip.productAmmount = property.values[0]
        break
        case "HazShipAmtQty":
          additionalChargeObject.HazShip.productQuantity = property.values[0]
          break
        case "HazShipAmt":
          additionalChargeObject.HazShip.productAmmount = property.values[0]
          break
          default:
            break
    }
  })
  return additionalChargeObject
}
