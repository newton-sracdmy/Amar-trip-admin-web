import { combineReducers } from "@reduxjs/toolkit";
import ridesReducer  from "./modules/rides/components/reducer";
import usersReducer from "./modules/drivers/Reducer";
import ridesSummaryReducer from "./modules/dashboard/reducer";
import authReducer from "./modules/login/reducer"

const rootReducer = combineReducers({
    ridesReducer,
    usersReducer,
    ridesSummaryReducer,
    authReducer

});

export default rootReducer;
