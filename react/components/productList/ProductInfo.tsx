import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedPrice } from 'vtex.formatted-price'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { Link } from 'vtex.render-runtime';
import { getFormattedPrice } from '../../utils/price'
import { useItemContext } from './ItemContext'

const CSS_HANDLES = [
  'minicartMainItemContainer',
  'minicartInfo',
  'minicartItemContainer',
  'minicartImage',
  'minicartQyt',
  'minicartX',
  'minicartPlus',
  'minicartMinus',
  'minicartNumber',
  'minicartLoader',
  'minicartLoaderCirclebg',
  'minicartLoaderCircle',
  'minicartLink',
  'minicartNoAvailable',
  'minicartAdditional'
]

export const ProductInfo = () => {

  const [isLoading, setIsLoading] = useState(false)
  const { removeItem, updateQuantity } = useOrderItems()
  const { item, loading } = useItemContext()
  const handles: any = useCssHandles(CSS_HANDLES)

  if (loading) return <div>Cargando</div>

  if (item === null || item === undefined) return null

  const handleQuantity = async (count: string) => {
    setIsLoading(true)
    if (count === "plus") {
      await updateQuantity({ ...item, quantity: ++item.quantity })
    } else {
      await updateQuantity({ ...item, quantity: --item.quantity })
    }
    setIsLoading(false)
  }

  return (

    <div className={`${handles.minicartMainItemContainer}`}>
      {
        item.refId === "additional"
        && <p className={`${handles.minicartAdditional}`}>Products have an additional shipping charge of {item.quantity}.00</p>
      }

      <div className={`${handles.minicartItemContainer} jefferspet-additional-charges-0-x-${item.refId}`}>

        <div>
          {item.imageUrls && (
            <Link to={item.detailUrl ? item.detailUrl : '/'}>
              <img
                src={item.imageUrls.at1x}
                className={`${handles.minicartImage}`}
              />
            </Link>
          )}
        </div>

        <div className={`${handles.minicartInfo}`}>
          <Link to={item.detailUrl ? item.detailUrl : '/'} className={`${handles.minicartLink}`}>
            {item.name && item.name.length > 50 ? item.name.slice(0, 50) + "..." : item.name}
          </Link>

          {
            (item.availability === "available")
              ?
              <div>
                {
                  item.priceDefinition?.calculatedSellingPrice !== item.listPrice
                    ?
                    (
                      <>

                        <div className={`itglobers-minicart-0-x-qtty${item.id} ${handles.minicartQyt}`}>
                          <div className={`${handles.minicartMinus}`} onClick={() => handleQuantity("minus")}>
                            &ndash;
                          </div>
                          <div className={`${handles.minicartNumber}`}>{item.quantity}</div>
                          <div className={`${handles.minicartPlus}`} onClick={() => handleQuantity("plus")}>
                            +
                          </div>
                        </div>

                        <div>
                          <FormattedPrice value={getFormattedPrice(item.listPrice)} />
                        </div>

                        <div>
                          <FormattedPrice value={getFormattedPrice(item.priceDefinition?.calculatedSellingPrice)} />
                        </div>

                      </>
                    )
                    :
                    <div>

                      <div className={`itglobers-minicart-0-x-qtty${item.id} ${handles.minicartQyt}`}>
                        <div className={`${handles.minicartMinus}`} onClick={() => handleQuantity("minus")}>
                          &ndash;
                        </div>
                        <div className={`${handles.minicartNumber}`}>{item.quantity}</div>
                        <div className={`${handles.minicartPlus}`} onClick={() => handleQuantity("plus")}>
                          +
                        </div>
                      </div>
                      <FormattedPrice value={getFormattedPrice(item.price * item.quantity)} />
                    </div>
                }
              </div>
              :
              <div>
                <div className={`${handles.minicartNoAvailable}`}>
                  Not available
                </div>
              </div>
          }
        </div>

        <div onClick={() => removeItem(item, 0)} className={`${handles.minicartX}`}>
          <svg fill="none" width="16" height="16" viewBox="0 0 16 16"
            className=" vtex-product-list-0-x-deleteIcon"
            xmlns="http://www.w3.org/2000/svg">
            <use href="#hpa-delete"></use>
          </svg>
        </div>

        {
          isLoading &&
          <div>
            loading
          </div>

        }

      </div>
    </div>

  )
}
