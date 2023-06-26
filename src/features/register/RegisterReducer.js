import axios from "axios";
import { config } from "../../app/apiConfig";
import feEnv from "../../app/apiConfig";

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case "register/request":
      return { loading: true };
    case "register/success":
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case "register/fail":
      return { loading: false, data: action.payload, success: false };
    case "register/reset":
      return {};
    default:
      return state;
  }
};

export const registerAction = (body) => async (dispatch) => {
  try {
    dispatch({ type: "register/request" });

    const { data } = await axios.post(
      `${feEnv.HOST}/api/auth/register`,
      body,
      config
    );

    dispatch({ type: "register/success", payload: data });

    setTimeout(function () {
      dispatch({
        type: "register/reset",
      });
    }, 3000);
  } catch (error) {
    dispatch({ type: "register/fail", payload: error.response.data });
    setTimeout(function () {
      dispatch({
        type: "register/reset",
      });
    }, 3000);
  }
};

export default registerReducer.reducer;
