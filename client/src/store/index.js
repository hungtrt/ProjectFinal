import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService";
import categoryService from "./services/categoryService";
import productService from "./services/productService";
import salesService from "./services/salesService";
import paymentService from "./services/paymentService";
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import productReducer from "./reducers/productReducer";
import salesReducer from "./reducers/salesReducer";
import cartReducer from "./reducers/cartReducer";
import homeProducts from "./services/homeProducts";
import orderService from "./services/orderService";
import userOrdersService from "./services/userOrdersService";

const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    [salesService.reducerPath]: productService.reducer,
    [homeProducts.reducerPath]: homeProducts.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
    [orderService.reducerPath]: orderService.reducer,
    [userOrdersService.reducerPath]: userOrdersService.reducer,
    productSlicer: productReducer,
    salesReducer: salesReducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
    cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      categoryService.middleware,
      productService.middleware,
      salesService.middleware,
      homeProducts.middleware,
      paymentService.middleware,
      orderService.middleware,
      userOrdersService.middleware,
    ]),
});
export default Store;
