import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();
const initialState = {
  loading: false,
  amount: 0,
  total: 0,
  cart: cartItems,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = ()=>{
    dispatch({type:'CLEAR_CART'})
  }
  const remove = (id)=>{
   
    dispatch({type:'REMOVE_ITEM',payload:id})
  }
  const increase = (id)=>{
    dispatch({type:'INCREASE',payload: id})
  }
  const decrease = (id)=>{
    dispatch({type:'DECREASE',payload: id})
  }

  const fetchData = async()=>{
    dispatch({type:'LOADING'})
    const res = await fetch(url)
    const data = await res.json()
    dispatch({type:'DISPLAY_ITEM',payload:data})
  }

  const toggleAmount = (id,type)=>{
    dispatch({type:'TOGGLE_ITEM',payload:{id,type}})
  }

  useEffect(() => {
    fetchData()
   
  }, [])


  useEffect(() => {
    dispatch({type: 'GET_TOTAL'})
  
  }, [state.cart])
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
