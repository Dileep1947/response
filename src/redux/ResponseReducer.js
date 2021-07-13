import axios from "axios";

const initState = {
  responseList: [],
  progress: false,

  //onClick of update button, the key will be updated
  uref: {},
};

//ACTION TYPES :: Response:ENTITY
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const Response_GET_ALL_ACTION_TYPE = "Response_GET_ALL_ACTION_TYPE";
const Response_UPDATE_RENDER_ACTION_TYPE = "Response_UPDATE_RENDER_ACTION_TYPE";

//ACTIONS :: Response
export const getAllResponseAction = () => {
  return async (dispatch) => {
    //API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/responses`;
    const response = await axios.get(url);

    //UI Update
    dispatch({ type: "Response_GET_ALL_ACTION_TYPE", payload: response.data });
  };
};

export const createResponseAction = (payload) => {
  return async (dispatch) => {
    //MAKING THE CALL
    const url = `http://localhost:8080/api/v1/responses`;
    await axios.post(url, payload);

    //UPDATE THE UI-TODO
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    //AFTER 5 SECONDS PROGRESS:: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const updateResponseAction = (payload) => {
  return async (dispatch) => {
    //MAKING THE SERVER CALL
    const url = `http://localhost:8080/api/v1/responses/${payload.respId}`;
    await axios.put(url, payload);

    //making the uref empty again
    updateRenderAction({});

    // update the ui. TODO
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    //after 5 seconds PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const deleteResponseAction = (payload) => {
  return async (dispatch) => {
    //MAKE AN API/SERVER CALL
    const url = `http://localhost:8080/api/v1/responses/${payload.respId}`;
    await axios.delete(url);

    //UPDATE THE UI TODO :: Fetch the updated list
    dispatch(getAllResponseAction());
  };
};

// step4
export const updateRenderAction = (payload) => {
  //ONLY UPDATING THE UI

  //step5
  return { type: Response_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};

// REDURE FOR STATE UPDTE
export function ResponseReducer(state = initState, action) {
  switch (action.type) {
    case Response_GET_ALL_ACTION_TYPE:
      return { ...state, responseList: action.payload };

    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };

    //step6
    case Response_UPDATE_RENDER_ACTION_TYPE:
      return { ...state, uref: action.payload };

    default:
      return state;
  }
}
