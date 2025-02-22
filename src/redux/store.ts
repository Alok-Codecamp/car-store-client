
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import authReduser from './features/auth/authSlice';
import storage from "redux-persist/lib/storage";
import orderReduser from './features/admin/orderManagement/orderSlice'
const persistConfig = {
    key: "auth",
    storage,
};

const persistedAuthReduser = persistReducer(persistConfig, authReduser)
export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReduser,

        order: orderReduser,
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }).concat(baseApi.middleware)
})



export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);