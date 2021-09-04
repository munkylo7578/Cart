import { act } from "react-dom/test-utils"


const reducer = (state,action)=>{
    if(action.type === 'CLEAR_CART')
    {
        return {...state,cart:[]}
    }
  
    if(action.type === 'REMOVE_ITEM'){
     
        return {...state,cart: state.cart.filter(data=>{
            return data.id !== action.payload
        })}
    }

    if(action.type === 'TOGGLE_ITEM')
    {
        const handleToggle = state.cart.map(cartItem=>{
            if(cartItem.id === action.payload.id && action.payload.type === 'inc')
            {
                return {...cartItem,amount: cartItem.amount + 1}
            }
            if(cartItem.id === action.payload.id && action.payload.type === 'dec')
            {
                return {...cartItem,amount: cartItem.amount - 1}
            }
            return cartItem
        }).filter(cartItem=>cartItem.amount !== 0)
        return{...state,cart: handleToggle}
    }


    /* if(action.type === 'INCREASE'){
        let tempCart = state.cart.map(cartItem=>{
            if(cartItem.id === action.payload)
            {
                return {...cartItem,amount: cartItem.amount + 1}
            }
            return cartItem
        })
        return {...state,cart: tempCart}
    }
    if(action.type === 'DECREASE'){
        let tempCart = state.cart
        .map(cartItem=>{
            if(cartItem.id === action.payload)
            {
                return {...cartItem,amount: cartItem.amount - 1}
            }
            return cartItem
        })
        .filter(cartItem=>cartItem.amount !==0)
        return {...state,cart: tempCart}
    } */
    if(action.type === "GET_TOTAL"){
        let {amount,total} = state.cart.reduce((cartTotal,cartItem)=>{
            const {price,amount} = cartItem
            cartTotal.amount += amount
            cartTotal.total += amount * price
            return cartTotal
        },{
           amount:0,
           total: 0 
        })
        total = parseFloat(total.toFixed(2))
       return {...state,amount: amount,total: total}
    }
    if(action.type ===  'LOADING'){
        return {...state,loading:true}
    }
    if(action.type === 'DISPLAY_ITEM'){
        return{...state,cart:action.payload,loading:false}
    }
    return state
    
}

export default reducer