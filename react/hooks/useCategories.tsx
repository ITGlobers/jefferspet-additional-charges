import { useState, useEffect } from 'react';
import { OrderForm } from 'vtex.order-manager'
import type { Item } from 'vtex.checkout-graphql'

const { useOrderForm } = OrderForm


const idsParaChequear = ['2', '2000001']

export const useCategories = () => {
  const [categories, setCategories] = useState<any>({})
  const [categoriesQty, setCategoriesQty] = useState<any>([])
  const [itemsValue, setitemsValue] = useState(0)
  const [valueRegistered, setvalueRegistered] = useState(0)
  const [sellers, setSellers] = useState<string[]>([])
  const [availableIds, setAvailableIds] = useState<string[]>([])
  const [showThermometer, setShowThermometer] = useState<boolean>(true)


  const { orderForm, loading } = useOrderForm()
  console.log("ORDER FORM>>>", orderForm)
  const { items, value, totalizers } = orderForm;

  useEffect(() => {
    if (!loading && items.length > 0) {
      let allCategories: any = { "Todas las categorías": items.length }
      let allCategoriesQty: string[] = ["Todas las categorías"]
      let allSellers: string[] = []
      let allIds: string[] = []
      var index;
      let mostrarTermometro = true;
      items.forEach((item: Item) => {
        const arrayOfIds = item.productCategoryIds?.split("/") || [];
        if (item.productCategoryIds) {
          index = 1;
          if (arrayOfIds[index] === "2000001") {
            index = 2;
          }
          if (!allCategories[item.productCategories[arrayOfIds[index]]]) {
            allCategories[item.productCategories[arrayOfIds[index]]] = 1
            allCategoriesQty.push(item.productCategories[arrayOfIds[index]])
          } else {
            allCategories[item.productCategories[arrayOfIds[index]]] += 1
          }

          //if some product its different from supermercado (2000001) or pequeños electrodomesticos (2) Seteados arriba!
          if (!idsParaChequear.some(ai => arrayOfIds.includes(ai))) {
            mostrarTermometro = false
          }

        }
        //get all sellers
        if (item.seller) {
          if (!allSellers.includes(item.seller)) {
            allSellers.push(item.seller)
          }
        }
        //save all availables ids
        if (item.availability === "available") {
          allIds.push(item.id)
        }


      })
      setCategoriesQty(allCategoriesQty)
      setCategories(allCategories)
      setSellers(allSellers)
      setShowThermometer(mostrarTermometro)
      if (JSON.stringify(availableIds) !== JSON.stringify(allIds)) {
        setAvailableIds(allIds)
      }
    }
  }, [loading, items])

  useEffect(() => {
    if (totalizers.length > 0) {
      const totalItems: any = totalizers.find((total: any) => total.id === "Items")
      const totalItemsDiscounts: any = totalizers.find((total: any) => total.id === "Discounts")
      if (totalItems.value) {
        if (totalItemsDiscounts?.value < 0) {
          setitemsValue((totalItems.value + totalItemsDiscounts.value) / 100)
        } else {
          setitemsValue(totalItems.value / 100)
        }
      } else {
        setitemsValue(0)
      }
    }
  }, [totalizers])

  useEffect(() => {
    if (value) {
      setvalueRegistered(value / 100)
    }
  }, [value])



  return { loading, items, categories, categoriesQty, totalValue: valueRegistered, itemsValue, sellers, availableIds, showThermometer }
}
