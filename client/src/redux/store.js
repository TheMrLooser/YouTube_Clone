import {configureStore , combineReducers} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";
import {PAUSE ,PERSIST,PURGE  ,persistReducer,persistStore, FLUSH,REHYDRATE ,REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key:"root",
    version:1,
    storage,
}

const rootReducer = combineReducers({user:userReducer , video:videoReducer})
const persistedReducer = persistReducer(persistConfig,rootReducer)

 export const  store =  configureStore({
    reducer: persistedReducer,
    // middleware:(getDefaultMiddleware) =>{
    //     getDefaultMiddleware({
    //         serializableCheck:{
    //             ignoredActions:[PAUSE,PERSIST,PURGE,FLUSH,REHYDRATE,REGISTER]
    //         },
    //     })
    // },
    // reducer:{
    //     video:videoReducer,
    //     user:userReducer
    // }
     

 })

 export const persistor = persistStore(store)