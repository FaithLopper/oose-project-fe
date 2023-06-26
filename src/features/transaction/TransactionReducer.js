import axios from "axios";
import feEnv from "../../app/apiConfig";

export const TransUpReducer = (state = {}, action) => {
  switch (action.type) {
    case "TransUp/request":
      return { upLoading: true };
    case "TransUp/success":
      return {
        upLoading: false,
        upData: action.payload,
        upSuccess: true,
      };
    case "TransUp/fail":
      return { upLoading: false, upData: action.payload, upSuccess: false };
    case "TransUp/reset":
      return {};
    default:
      return state;
  }
};

export const TransCreReducer = (state = {}, action) => {
  switch (action.type) {
    case "TransCre/request":
      return { creLoading: true };
    case "TransCre/success":
      return {
        creLoading: false,
        creData: action.payload,
        creSuccess: true,
      };
    case "TransCre/fail":
      return { creLoading: false, creData: action.payload, creSuccess: false };
    case "TransCre/reset":
      return {};
    default:
      return state;
  }
};

export const TransDelReducer = (state = {}, action) => {
  switch (action.type) {
    case "TransDel/request":
      return { delLoading: true };
    case "TransDel/success":
      return {
        delLoading: false,
        delData: action.payload,
        delSuccess: true,
      };
    case "TransDel/fail":
      return { delLoading: false, delData: action.payload, delSuccess: false };
    case "TransDel/reset":
      return {};
    default:
      return state;
  }
};

export const transCreAction = (body) => async (dispatch, getState) => {
  try {
    dispatch({ type: "TransCre/request" });

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
      `${feEnv.HOST}/api/transactions/`,
      body,
      config
    );

    dispatch({ type: "TransCre/success", payload: data });
    setTimeout(function () {
      dispatch({
        type: "TransCre/reset",
      });
    }, 3000);
  } catch (error) {
    dispatch({ type: "TransCre/fail", payload: error.response.data });
    setTimeout(function () {
      dispatch({
        type: "TransCre/reset",
      });
    }, 3000);
  }
};

export const TransUpAction = (body, id) => async (dispatch, getState) => {
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

    dispatch({ type: "TransUp/request" });

    const { data } = await axios.put(
      `${feEnv.HOST}/api/transactions/${id}`,
      body,
      config
    );

    dispatch({ type: "TransUp/success", payload: data });

    setTimeout(function () {
      dispatch({
        type: "TransUp/reset",
      });
    }, 3000);
  } catch (error) {
    dispatch({ type: "TransUp/fail", payload: error.response.data });
    setTimeout(function () {
      dispatch({
        type: "TransUp/reset",
      });
    }, 3000);
  }
};

export const TransDelAction = (id, value) => async (dispatch, getState) => {
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

    dispatch({ type: "TransDel/request" });

    const { data } = await axios.delete(
      `${feEnv.HOST}/api/transactions/${id}`,
      config
    );

    dispatch({ type: "TransDel/success", payload: data });

    setTimeout(function () {
      dispatch({
        type: "TransDel/reset",
      });
      dispatch(TransGetAction(value));
    }, 2000);
  } catch (error) {
    dispatch({ type: "TransDel/fail", payload: error.response.data });
    setTimeout(function () {
      dispatch({
        type: "TransDel/reset",
      });
    }, 3000);
  }
};

export const TransGetReducer = (state = {}, action) => {
  switch (action.type) {
    case "TransGet/request":
      return { getLoading: true };
    case "TransGet/success":
      return {
        getLoading: false,
        getData: action.payload,
        getSuccess: true,
      };
    case "TransGet/fail":
      return { getLoading: false, getData: action.payload, getSuccess: false };
    case "TransGet/reset":
      return {};
    default:
      return state;
  }
};

export const TransGetAction = (id) => async (dispatch, getState) => {
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

    dispatch({ type: "TransGet/request" });

    const { data } = await axios.get(
      `${feEnv.HOST}/api/transactions/paging/${id}`,
      config
    );

    dispatch({ type: "TransGet/success", payload: data });
  } catch (error) {
    dispatch({ type: "TransGet/fail", payload: error.response.data });
  }
};
