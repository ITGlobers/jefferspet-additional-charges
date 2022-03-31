interface Props{
  value:number | string
}

export const parsePrice = ({ value }:Props) => {
  const parsedPrice = value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })

  return parsedPrice
}
