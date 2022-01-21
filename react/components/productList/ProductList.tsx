import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles';
import { string } from 'prop-types'
import { useCategories } from '../../hooks/useCategories';
import ProductListContext from './ProductListContext';

const CSS_HANDLES = [
  'flex_direction'
]

const ProductList = (props: any) => {

  const [categorySelected, setCategorySelected] = useState<any>(null)
  const { loading, items, categoriesQty } = useCategories()

  const handles: any = useCssHandles(CSS_HANDLES)

  if (loading) return <div>Cargando...</div>

  useEffect(() => {
    setCategorySelected(categoriesQty[0])
  }, [categoriesQty])

  return (
    <div className={`${handles.flex_direction}`}>
      {
        items.map((item: any, i: number) => {
          const productCategory = item.productCategoryIds?.split("/")[1]
          let index = 1
          if (productCategory === "2000001") {
            index = 2
          }
          if (item.productCategoryIds && item.productCategories[item.productCategoryIds?.split("/")[index]] === categorySelected && categorySelected !== 'Todas las categorías')
            return <ProductListContext itemb={item} {...props} ind={i} key={i} />
          else if (categorySelected === 'Todas las categorías') return <ProductListContext itemb={item} {...props} ind={i} key={i} />
          else return null
        })
      }
    </div>
  )
}

ProductList.protoTypes = {
  promId: string
}

ProductList.defaultProps = {
  promId: ""
}


export default ProductList
