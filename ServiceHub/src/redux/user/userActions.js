import { SET_USER_EMAIL, UNSET_USER_EMAIL } from "./userTypes"

export const setActiveUser =(userEmail)=>{
    return {
        type:SET_USER_EMAIL,
        userEmail
    }
}
export const setUserLogOutState=()=>{

    return {
        type:UNSET_USER_EMAIL
    }
}