import type { ReactNode } from 'react'
import React, { useMemo, memo } from 'react'
import type { Item } from 'vtex.checkout-graphql'
import { ItemContextProvider } from './ItemContext'
import LazyRender from './LazyRender'
import { ProductInfo } from './ProductInfo'

type TotalItemsType =
  | 'total'
  | 'distinct'
  | 'totalAvailable'
  | 'distinctAvailable'

interface Props {
  allowManualPrice?: boolean
  itemb: ItemWithIndex
  loading: boolean
  userType?: string
  itemCountMode?: TotalItemsType
  onQuantityChange: (
    value: number,
    item?: ItemWithIndex
  ) => void
  onRemove: (item?: ItemWithIndex) => void
  onSetManualPrice?: (price: number, itemIndex: number) => void
  lazyRenderHeight?: number
  lazyRenderOffset?: number
  children: ReactNode,
  ind: number
}

interface ItemWithIndex extends Item {
  index: number
}

interface ItemWrapperProps
  extends Pick<Props, 'onQuantityChange' | 'onRemove'> {
  item: ItemWithIndex
  itemIndex: number
  loading: boolean
  children: ReactNode
  shouldAllowManualPrice: boolean
  onSetManualPrice?: (price: number, itemIndex: number) => void
  lazyRenderHeight?: number
  lazyRenderOffset?: number
}

const ItemContextWrapper = memo<ItemWrapperProps>(function ItemContextWrapper({
  item,
  itemIndex,
  loading,
  onQuantityChange,
  onRemove,
  children,
  shouldAllowManualPrice,
  onSetManualPrice,
  lazyRenderHeight,
  lazyRenderOffset,
}) {
  const context = useMemo(
    () => ({
      item,
      itemIndex,
      loading,
      shouldAllowManualPrice,
      onQuantityChange: (value: number) =>
        onQuantityChange(value, item),
      onRemove: () => onRemove(item),
      onSetManualPrice: (price: number, index: number) =>
        onSetManualPrice?.(price, index),
    }),
    [
      item,
      itemIndex,
      loading,
      onQuantityChange,
      onRemove,
      onSetManualPrice,
      shouldAllowManualPrice,
    ]
  )

  return (
    <LazyRender height={lazyRenderHeight} offset={lazyRenderOffset}>
      <ItemContextProvider value={context}>{children}</ItemContextProvider>
    </LazyRender>
  )
})

const ProductListContext = memo<Props>(function ProductList(props) {
  const {
    itemb,
    lazyRenderHeight = 100,
    lazyRenderOffset = 300,
    userType = 'STORE_USER',
    allowManualPrice = false,
    ind,
    // children,
  } = props

  const shouldAllowManualPrice =
    allowManualPrice && userType === 'CALL_CENTER_OPERATOR'

  return (
    /* Replacing the outer div by a Fragment may break the layout. See PR #39. */
    <>
      <ItemContextWrapper
        item={itemb}
        itemIndex={ind}
        shouldAllowManualPrice={shouldAllowManualPrice}
        {...props}
        lazyRenderHeight={lazyRenderHeight}
        lazyRenderOffset={lazyRenderOffset}
      >
        <ProductInfo />
      </ItemContextWrapper>
    </>
  )
})

export default ProductListContext
