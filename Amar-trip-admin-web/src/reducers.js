import { combineReducers } from "@reduxjs/toolkit";
import ridesReducer  from "./modules/rides/components/reducer";
import usersReducer from "./modules/drivers/Reducer";
import ridesSummaryReducer from "./modules/dashboard/reducer";
import authReducer from "./modules/login/reducer"
import paymentsReducer from "./modules/payments/reducer";
import locationReducer from "./modules/locations/reducer";


const rootReducer = combineReducers({
    ridesReducer,
    usersReducer,
    ridesSummaryReducer,
    authReducer,
    paymentsReducer,
    locationReducer
    
});

export default rootReducer;
