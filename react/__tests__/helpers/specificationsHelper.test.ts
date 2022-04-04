import { getProductContextSpecifications } from "../../modules/specificationsHelper";

describe('specificationsHelper',()=>{

    const productContext = JSON.stringify({
        product:{
            productId: '1234',
            properties:[
                {
                  name:'Specification1',
                  values:['sku:{1234:{}}']
                },
                {
                  name:'Specification2',
                  values:['sku:{1232:{}}']
                },
                {
                  name:'Specification3',
                  values:['sku:{1233:{}}']
                }
            ]
        }
    })


    test('getProductContextSpecifications must return null value when specifications does not exist', ()=>{

        const productContext = JSON.stringify({specifications:{}})
        const specificationsName = ['Another thing']

        const specification = getProductContextSpecifications({productContext, specificationsName, productId:'abc'})

        expect(specification).toBeNull()
    })
    test('getProductContextSpecifications must return an object when specifications exists', ()=>{

        const specificationsName = ['Specification1']
        const productId = '1234'

        const specification = getProductContextSpecifications({productContext, specificationsName, productId})

        expect(specification).toMatchObject([{name:'Specification1'}])
    })
})
