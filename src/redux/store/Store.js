import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "../reducers/AuthReducer";
import BasketReducer from "../reducers/BasketReducer";
import PedidoReducer from "../reducers/PedidoReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: AuthReducer,
  basket: BasketReducer,
  pedido: PedidoReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
const persistor = persistStore(store);

export { persistor };

export default store;
