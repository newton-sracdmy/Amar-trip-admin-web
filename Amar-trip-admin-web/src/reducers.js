import { combineReducers } from "@reduxjs/toolkit";
import ridesReducer  from "./modules/rides/components/reducer";
import usersReducer from "./modules/drivers/Reducer";


const rootReducer = combineReducers({
    ridesReducer,
    usersReducer 
});

export default rootReducer;
