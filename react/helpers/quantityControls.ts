interface ControllerProps{
    methods:Methods
    itemToUpdate: string
    quantities:Quantites
}

interface Methods{
    addItem: any
    updateQuantity:any 
    removeItem: any
}

interface Quantites{
    currentQuantity: number
    quantityToAdd: number
}



export const quantityController = ({ methods, quantities, itemToUpdate}:ControllerProps) => {
    
    const  { quantityToAdd, currentQuantity } = quantities

    const {addItem, updateQuantity, removeItem} = methods

    const item = JSON.parse(itemToUpdate)

    if( !currentQuantity && quantityToAdd){
        addItem([item])
    }else if( currentQuantity && !quantityToAdd ){
        removeItem(item)
    }else{
        updateQuantity({...item, quantity:quantityToAdd})
    }

    return quantityToAdd
}