import axios from "axios";
import feEnv from "../../app/apiConfig";

export const UpNDelReducer = (state = {}, action) => {
  switch (action.type) {
    case "UpNDel/request":
      return { loading: true };
    case "UpNDel/success":
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case "UpNDel/fail":
      return { loading: false, data: action.payload, success: false };
    case "UpNDel/reset":
      return {};
    default:
      return state;
  }
};

export const GetReducer = (state = {}, action) => {
  switch (action.type) {
    case "getData/request":
      return { loading: true };
    case "getData/success":
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case "getData/fail":
      return { loading: false, data: action.payload, success: false };
    case "getData/reset":
      return {};
    default:
      return state;
  }
};

export const UpAction = (type, body, id) => async (dispatch, getState) => {
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

    dispatch({ type: "UpNDel/request" });

    const { data } = await axios.put(
      `${feEnv.HOST}/api/${type}/${id}`,
      body,
      config
    );

    dispatch({ type: "UpNDel/success", payload: data });

    setTimeout(function () {
      dispatch({
        type: "UpNDel/reset",
      });
    }, 3000);
  } catch (error) {
    dispatch({ type: "UpNDel/fail", payload: error.response.data });
    setTimeout(function () {
      dispatch({
        type: "UpNDel/reset",
      });
    }, 3000);
  }
};

export const DelAction = (type, id) => async (dispatch, getState) => {
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

    dispatch({ type: "UpNDel/request" });

    const { data } = await axios.delete(
      `${feEnv.HOST}/api/${type}/${id}`,
      config
    );

    dispatch({ type: "UpNDel/success", payload: data });

    setTimeout(function () {
      dispatch({
        type: "UpNDel/reset",
      });
      dispatch({
        type: "getData/reset",
      });
    }, 2000);
    if (type.slice(0, 10) !== "categories") {
      dispatch({ type: "expenData/reset" });
    }
  } catch (error) {
    dispatch({ type: "UpNDel/fail", payload: error.response.data });
    setTimeout(function () {
      dispatch({
        type: "UpNDel/reset",
      });
    }, 3000);
  }
};

export const GetAction = (type, id) => async (dispatch, getState) => {
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

    dispatch({ type: "getData/request" });

    const { data } = await axios.get(`${feEnv.HOST}/api/${type}/${id}`, config);

    dispatch({ type: "getData/success", payload: data });
  } catch (error) {
    dispatch({ type: "getData/fail", payload: error.response.data });
  }
};

export const creAction = (type, body, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "UpNDel/request" });

    const {
      login: { LoggedUser },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LoggedUser.token}`,
      },
    };

    const { data } = await axios.post(
      `${feEnv.HOST}/api/${type}/${id}`,
      body,
      config
    );

    dispatch({ type: "UpNDel/success", payload: data });
    setTimeout(function () {
      dispatch({
        type: "UpNDel/reset",
      });
    }, 3000);
  } catch (error) {
    dispatch({ type: "UpNDel/fail", payload: error.response.data });
    setTimeout(function () {
      dispatch({
        type: "UpNDel/reset",
      });
    }, 3000);
  }
};
export default UpNDelReducer.reducer;
