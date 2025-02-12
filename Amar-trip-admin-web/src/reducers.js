import { combineReducers } from "@reduxjs/toolkit";
import ridesReducer  from "./modules/rides/components/reducer";


const rootReducer = combineReducers({
    ridesReducer 
});

export default rootReducer;
