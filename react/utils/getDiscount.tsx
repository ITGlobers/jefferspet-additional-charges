export const getBestDisscount = (product: any, selectedItemId: any) => {

  const selectedSKU = product?.items?.find((item: any) => item?.itemId === selectedItemId)
  const sellerActive = selectedSKU?.sellers?.find((seller: any) => seller.sellerDefault == true)
  const { commertialOffer } = sellerActive;
  let matrizdedescuentos: any[] = []
  let finalMatrix: any[] = []

  if (commertialOffer) {

    /*Ingresar el Precio Full*/
    finalMatrix.push(`precioNormal,${parseInt(commertialOffer.ListPrice.toString())}`)
    /* Valida si hay descuento por tabla de precios */
    if (commertialOffer?.Price < commertialOffer.ListPrice) {
      if (commertialOffer?.discountHighlights?.length ||
        commertialOffer.Price === commertialOffer.PriceWithoutDiscount) {
        let discount = commertialOffer?.Price
        matrizdedescuentos.push(`tabladeprecios,${parseInt(discount.toString())}`)
        finalMatrix.push(`tabladeprecios,${parseInt(discount.toString())}`)
      }
    }

    /*INGRESA TODOS LOS TEASERS, CON SUS EFECTOS*/
    if (commertialOffer?.teasers && commertialOffer?.teasers?.length) {

      commertialOffer?.teasers?.forEach((element: any) => {

        if (element?.effects) {

          let discount = 0;
          let effect = element?.effects?.parameters?.find((parameter: any) => parameter?.name === "PromotionalPriceTableItemsDiscount")
          discount = commertialOffer?.Price - effect?.value

          if (!effect) {

            effect = element?.effects?.parameters?.find((parameter: any) => parameter?.name === "PercentualDiscount")
            discount = commertialOffer?.ListPrice - parseInt(commertialOffer?.ListPrice) * parseInt(effect?.value) / 100
          }

          matrizdedescuentos.push(`${element?.name},${parseInt(discount.toString())}`)
        }
      });


    }

    /*Ordenamos la matriz de mayor a menor descuento*/
    let menorPrecio = matrizdedescuentos.length ? matrizdedescuentos[0] : null
    if (matrizdedescuentos.length) {
      for (var i = 1; i < matrizdedescuentos.length; i++) {
        var element = matrizdedescuentos[i].toString().split(",")[1]
        var menor = menorPrecio.toString().split(",")[1]
        if (parseInt(element) == parseInt(menor)) {
          var promoType = matrizdedescuentos[i].toString().split(",")[0]
          var promoType2 = menorPrecio.toString().split(",")[0]
          if (promoType.toString().indexOf("tco") != -1 &&
            promoType2.toString().indexOf("condensa") != -1) {
            menorPrecio = matrizdedescuentos[i]
          }
        }
        if (parseInt(element) <= parseInt(menor)) {
          menorPrecio = matrizdedescuentos[i];
        }
      }
      finalMatrix.push(menorPrecio)
    }
  }

  return finalMatrix

}
