import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { loginReducer } from "../features/login/LoginReducer";
import { registerReducer } from "../features/register/RegisterReducer";
import { UpdateUserInfoReducer } from "../features/updateUserInfo/UpdateUserInfoReducer";
import {
  ExpenReducer,
  ExpenDataReducer,
} from "../features/expenditures/ExpenReducer";
import { UpNDelReducer, GetReducer } from "../features/updateAndDelete/UpNDel";
import {
  TransUpReducer,
  TransCreReducer,
  TransGetReducer,
  TransDelReducer,
} from "../features/transaction/TransactionReducer";

const reducer = {
  counter: counterReducer,
  login: loginReducer,
  register: registerReducer,
  updateUserInfo: UpdateUserInfoReducer,
  expenditures: ExpenReducer,
  expenData: ExpenDataReducer,
  upNDel: UpNDelReducer,
  getData: GetReducer,
  transUp: TransUpReducer,
  transCre: TransCreReducer,
  transGet: TransGetReducer,
  transDel: TransDelReducer,
};

export const LoggedUser = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

export const store = configureStore({
  reducer,
});
