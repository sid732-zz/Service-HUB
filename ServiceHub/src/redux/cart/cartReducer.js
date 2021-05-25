import { ADD_QUANTITY, ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SUB_QUANTITY, UPDATE_TOTAL } from "./cartTypes"

const initialState = {
    service_type: '',
    city: '',
    total_bill: 0,
    services: [],
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                service_type: action.service_type,
                services: action.payload,
                city: action.city
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                services: state.services.map(service =>
                    service.sub_service_id === action.id ?
                        { ...service, selected: false, quantity: 0 }
                        : service
                )
            };
        case ADD_QUANTITY:
            return {
                ...state,
                services: state.services.map(service =>
                    service.sub_service_id === action.id
                        ? { ...service, selected: true, quantity: service.quantity + 1 }
                        : service
                )
            };
        case SUB_QUANTITY:
            return {
                ...state,
                services: state.services.map(service =>
                    service.sub_service_id === action.id
                        ? {
                            ...service, selected: service.quantity !==0 ? true: false, quantity: service.quantity !== 0 ? service.quantity - 1 : 0,
                        } : service
                )       
            };
        case EMPTY_CART:
            return {
                ...state,
                services: state.services.map(service =>
                    service.selected ?
                        { ...service, selected: false, quantity: 0 }
                        : service
                ),
                total_bill: 0
            };

        case UPDATE_TOTAL:
            return {
                ...state,
                total_bill: state.services.reduce((acc, ser) => acc + ser.sub_service_cost * ser.quantity, 0)
            }
        default:
            return state;
    }
}


export default cartReducer;