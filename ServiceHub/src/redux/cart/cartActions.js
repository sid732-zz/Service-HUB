import { ADD_QUANTITY, ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SUB_QUANTITY, UPDATE_TOTAL } from "./cartTypes"

export const addToCart = (data, service_type, city) => {
    return {
        type: ADD_TO_CART,
        payload: data,
        service_type,
        city
    }
}

export const removeFromCart = id => {
    return {
        type: REMOVE_FROM_CART,
        id
    }
}

export const addQuantity = id => {
    return {
        type: ADD_QUANTITY,
        id
    }
}

export const subQuantity = id => {
    return {
        type: SUB_QUANTITY,
        id
    }
}

export const emptyCart = () => {
    return {
        type: EMPTY_CART
    }
}

export const updateTotal = () => {
    return {
        type: UPDATE_TOTAL
    }
}