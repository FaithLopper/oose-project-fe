import axios from "axios";
import feEnv from "../../app/apiConfig";

export const UpdateUserInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "UpdateUserInfo/request":
      return { loading: true };
    case "UpdateUserInfo/success":
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case "UpdateUserInfo/fail":
      return { loading: false, data: action.payload, success: false };
    case "UpdateUserInfo/reset":
      return {};
    default:
      return state;
  }
};

export const UpdateUserInfoAction =
  (body, type) => async (dispatch, getState) => {
    try {
      const {
        login: { LoggedUser },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LoggedUser.token}`,
        },
      };

      dispatch({ type: "UpdateUserInfo/request" });

      const { data } = await axios.put(
        `${feEnv.HOST}/api/users/${type}`,
        body,
        config
      );

      dispatch({ type: "UpdateUserInfo/success", payload: data });

      if (type === "info") {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            email: data.email,
            expiresDate: LoggedUser.expiresDate,
            firstName: data.firstName,
            lastName: data.lastName,
            token: LoggedUser.token,
            username: LoggedUser.username,
          })
        );
      }
    } catch (error) {
      console.log(error.response);
      dispatch({ type: "UpdateUserInfo/fail", payload: error.response.data });
    }
  };

export default UpdateUserInfoReducer.reducer;
