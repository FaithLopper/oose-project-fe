import axios from "axios";
import { config } from "../../app/apiConfig";
import feEnv from "../../app/apiConfig";
import { LoggedUser } from "../../app/store";

export const loginReducer = (state = { LoggedUser }, action) => {
  switch (action.type) {
    case "login/request":
      return { ...state, loading: true };
    case "login/success":
      return {
        loading: false,
        LoggedUser: action.payload,
        success: true,
      };
    case "login/fail":
      return { ...state, loading: false, data: action.payload, success: false };
    case "logout":
      return { LoggedUser: {} };
    default:
      return state;
  }
};

export const loginAction = (usernameOrEmail, password) => async (dispatch) => {
  try {
    dispatch({ type: "login/request" });

    const { data } = await axios.post(
      `${feEnv.HOST}/api/auth/login`,
      { usernameOrEmail, password },
      config
    );

    dispatch({ type: "login/success", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.response);
    dispatch({ type: "login/fail", payload: error.response.data });
  }
};

export const logoutAction = () => async (dispatch) => {
  console.log(1);
  localStorage.removeItem("userInfo");
  dispatch({ type: "logout" });
};

export default loginReducer.reducer;
