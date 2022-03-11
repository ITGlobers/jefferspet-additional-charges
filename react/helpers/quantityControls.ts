interface ControllerProps{
    methods:Methods
    quantities: Quantites
    itemToUpdate: string
}

interface Methods{
    addItem: any
    updateQuantity:any 
    removeItem: any
}

interface Quantites{
    currentQuantity: number
    selectedItemQuantity: number
    addShipAmtQty: number
    addShipAmt: number
}



export const quantityController = ({ methods, quantities, itemToUpdate}:ControllerProps) => {
    
    const {addItem, updateQuantity, removeItem} = methods
    const {
        currentQuantity, 
        selectedItemQuantity, 
        addShipAmtQty, 
        addShipAmt
    } = quantities

    const item = JSON.parse(itemToUpdate)
    const quantityToAdd = Math.ceil(selectedItemQuantity / addShipAmtQty) * addShipAmt

    if( !currentQuantity && selectedItemQuantity){
        addItem([item])
    }else if( currentQuantity && !selectedItemQuantity){
        removeItem(item)
    }else{
        updateQuantity({...item, quantity:quantityToAdd})
    }

    return quantityToAdd
}