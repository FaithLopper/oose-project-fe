import axios from "axios";
import feEnv from "../../app/apiConfig";

export const ExpenReducer = (state = {}, action) => {
  switch (action.type) {
    case "expen/request":
      return { loading: true };
    case "expen/success":
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case "expen/fail":
      return { loading: false, data: action.payload, success: false };
    case "expen/reset":
      return {};
    default:
      return state;
  }
};

export const ExpenDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "expenData/request":
      return { loading: true };
    case "expenData/success":
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case "expenData/fail":
      return { loading: false, data: action.payload, success: false };
    case "expenData/reset":
      return {};
    default:
      return state;
  }
};

export const expenditureCreate = (body) => async (dispatch, getState) => {
  try {
    dispatch({ type: "expen/request" });

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
      `${feEnv.HOST}/api/expenditures/`,
      body,
      config
    );

    dispatch({ type: "expen/success", payload: data });
    setTimeout(function () {
      dispatch({
        type: "expen/reset",
      });
    }, 3000);
  } catch (error) {
    dispatch({ type: "expen/fail", payload: error.response.data });
    setTimeout(function () {
      dispatch({
        type: "expen/reset",
      });
    }, 3000);
  }
};

export const expenditureGet =
  (startDate, endDate) => async (dispatch, getState) => {
    try {
      dispatch({ type: "expenData/request" });

      const {
        login: { LoggedUser },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LoggedUser.token}`,
        },
      };
      const { data } = await axios.get(
        `${feEnv.HOST}/api/expenditures/paging?start=${startDate}&end=${endDate}`,
        config
      );

      dispatch({ type: "expenData/success", payload: data });
    } catch (error) {
      dispatch({ type: "expenData/fail", payload: error.response.data });
    }
  };

export default ExpenReducer.reducer;
