import { quantityController } from '../../helpers/quantityControls'

describe('quantityController.tsx',()=>{
    
    const mockQuantities = {
        currentQuantity:0, 
        quantityToAdd:0,
        selectedItemQuantity:0, 
        addShipAmtQty:0, 
        addShipAmt:0
    }

    const mockMethods = {
        addItem:jest.fn(), 
        updateQuantity:jest.fn(), 
        removeItem:jest.fn()
    } 

    const {removeItem, updateQuantity, addItem} = mockMethods
    const itemToUpdate = JSON.stringify({})

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('When currentQuantity is equal to zero and selectedItemQuantity is biggest than zero it must to add additional prices item',()=>{
        //Arrange
        const quantities = {...mockQuantities, selectedItemQuantity: 14, currentQuantity:0}
        //Act
        quantityController({ quantities, methods:mockMethods, itemToUpdate})
        //Assert
        expect( addItem ).toHaveBeenCalled()
        expect( addItem ).toHaveBeenCalledWith([JSON.parse(itemToUpdate)])
    })   
    test('When currentQuantity is biggest than zero and selectedItemQuantity is not null or is equal to zero it must remove the additionals item',()=>{
        //Arrange
        const quantities = {...mockQuantities, currentQuantity:10}
        //Act
        quantityController({ quantities, methods:mockMethods, itemToUpdate})
        //Assert
        expect( removeItem ).toHaveBeenCalled()
        expect( removeItem ).toHaveBeenCalledWith(JSON.parse(itemToUpdate))
    })   
    test('When none other condition is applied, it must update quantity by using quantity to add value',()=>{
        //Arrange
        const selectedItemQuantity = 17
        const addShipAmtQty = 5
        const addShipAmt = 3
        const quantities = {
            ...mockQuantities, 
            currentQuantity: 14, 
            selectedItemQuantity, 
            addShipAmtQty, 
            addShipAmt
        }
        const quantityToAdd = Math.ceil(selectedItemQuantity / addShipAmtQty) * addShipAmt
        //Act
        quantityController({ quantities, methods:mockMethods, itemToUpdate:JSON.stringify({})})
        //Assert
        expect( updateQuantity ).toHaveBeenCalled()
        expect( updateQuantity ).toHaveBeenCalledWith({quantity: quantityToAdd})
    })
    test('When selectedItemQuantity is between [1] and addShipAmtQty the [quantityToAdd] must be equal to addShipAmt', ()=>{
        //Arrange
        const addShipAmt = 6
        const quantities = {...mockQuantities, selectedItemQuantity:4, addShipAmt, addShipAmtQty:6}
        //Act
        const quantityToAdd = quantityController({ quantities, methods:mockMethods, itemToUpdate:JSON.stringify({})})
        //Assert
        expect( quantityToAdd ).toBe(addShipAmt)
    })   
})