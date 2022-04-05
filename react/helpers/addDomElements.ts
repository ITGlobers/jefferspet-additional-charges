interface Props{
  classNode:string
  additionalValue:string
}

export const addAdditionalValue = ({ classNode, additionalValue }:Props) => {
  const baseNode = document.querySelector(classNode)
  const additionalsItem = document.createElement('li')
  additionalsItem.className = 'additionals-item pv3 flex justify-between items-center'
  additionalsItem.innerHTML = `
    <span class="c-on-base" style="color:rgb(85, 65, 58)">
      Additional charges
    </span>
    <span class="c-on-base" style="color:rgb(85, 65, 58)">
      ${ additionalValue }
    </span>
  `
  baseNode?.after(additionalsItem)
}

export const changeMinicartCounter = (quantity:string) => {
  const minicartButtonSelector = 'span.vtex-minicart-2-x-minicartQuantityBadgeDefault'
  const minicartButton = document.querySelector(minicartButtonSelector) as HTMLElement
  if(!minicartButton) throw new Error ('The mini cart button quantity could not be updated')
  minicartButton.innerText = quantity
}
