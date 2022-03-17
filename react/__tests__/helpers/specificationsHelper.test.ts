import { getProductContextSpecifications, getSpecifications, getProductSpecifications } from "../../modules/specificationsHelper";

describe('specificationsHelper',()=>{
    
    const productContext = JSON.stringify({
        product:{
            properties:[
                {name:'Specification1'},
                {name:'Specification2'},
                {name:'Specification3'}
            ]
        }
    })


    test('getProductContextSpecifications must return false when specifications does not exist', ()=>{
        
        const productContext = JSON.stringify({specifications:{}})
        const specificationsName = ['Another thing']

        const specification = getProductContextSpecifications({productContext, specificationsName})

        expect(specification).toBe(false)
    })
    test('getProductContextSpecifications must return an object when specifications exists', ()=>{
        
        const specificationsName = ['Specification1', 'Specification2']

        const specification = getProductContextSpecifications({productContext, specificationsName})

        expect(specification).toMatchObject([{name:'Specification1'}, {name:'Specification2'}])
    })
    test('When specifications does not exist into local storage either product context getSpecifications must run getProductSpecifications ', ()=>{
        
        const specificationsName = ['Specific']

        getSpecifications({productContext, specificationsName, productId:''})

        expect(getProductSpecifications).toBeCalled()
    })
    test('getSpecifications must return an specification object when specifications does exist', ()=>{
        
        const specificationsName = ['Specification1']

        const specification = getSpecifications({productContext, specificationsName, productId:''})

        expect(specification).toMatchObject([{name:'Specification1'}])
    })  
})