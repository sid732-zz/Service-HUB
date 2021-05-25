import { SET_USER_EMAIL, UNSET_USER_EMAIL } from "./userTypes"

const initialState = {
    userEmail:null
}

const userReducer=(state=initialState,action)=>{
    
    switch (action.type){
        case SET_USER_EMAIL:
            return {
                userEmail:action.userEmail
            };
        case UNSET_USER_EMAIL:
            return{
                userEmail:null
            };
        default :
            return state;
    }
}

export default userReducer;