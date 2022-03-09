import { useState } from 'react'

interface Request{
    url:string
    options?:{
        method:string
        headers:{
            'Content-type':string
        }
        body: string
    }
}

const useRequest = () =>{
    const [state, setState] = useState({
        loading: true,
        data:{}
    })

    const request = ({url, options}:Request) =>{
        const parsedOptions = options ?? {}
        fetch(url, parsedOptions)
        .then(response => response.json())
        .then(data => {
            setState({
                loading: false,
                data
            })
        })
        .catch(e => {
            setState({
                ...state,
                loading:false
            })
            throw new Error('One error has been ocurred into request' + e)
        })
    }

    return [request, state]
}

export default useRequest