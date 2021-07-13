import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createResponseAction, updateResponseAction } from "../redux/ResponseReducer";

export const ResponseUpsert = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  const formEl = useRef();

  const [answer, setAnswer] = useState(state.response.uref.answer);
  const [respDate, setRespDate] = useState(state.response.uref.respDate);
  const [respTime, setRespTime] = useState(state.response.uref.respTime);
  const [accuracy, setAccuracy] = useState(state.response.uref.accuracy);
  const [likes, setLikes] = useState(state.response.uref.accuracy);
  const updateAnswer = (e) => setAnswer(e.target.value);
  const updateRespDate = (e) => setRespDate(e.target.value);
  const updateRespTime = (e) => setRespTime(e.target.value);
  const updateAccuracy = (e) => setAccuracy(e.target.value);

  const updateLikes = (e) => setLikes(e.target.value);
  // const updateRelevance = (e) => setRelevance(e.target.value);
  // const updateTotalComments = (e) => setTotalComments(e.target.value);
//   const updateLikes = (e) => setLikes(e.target.value);

//   const updateAccuracy = (e) => {
//     console.log(e.target.value);

//     //REPLACING ALL THE NON-DIGIT ^\\d WITH EMPTY STRING
//     const numericValue = e.target.value.replace(/[^\d]/gi, "");
//     setRelevance(numericValue);
//   };

//   const updateTotalComments = (e) => {
//     console.log(e.target.value);

//     //REPLACING ALL THE NON-DIGIT ^\\d WITH EMPTY STRING
//     const numericValue = e.target.value.replace(/[^\d]/gi, "");
//     setTotalComments(numericValue);
//   };

  const addNewResponse = (e) => {
    //WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createResponseAction({
          answer,
          respDate,
          respTime,
          accuracy,
          likes,
        })
      );

      // clear the form
      setAnswer("");
      setRespDate("");
      setRespTime("");
      setAccuracy("");
      setLikes("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const updateResponse = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        updateResponseAction({
          respId: state?.feed?.uref?.respId,
          answer,
          respDate,
          respTime,
          accuracy,
          likes,
        })
      );

      // clear the form
      setAnswer("");
      setRespDate("");
      setRespTime("");
      setAccuracy("");
      setLikes("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };
  return (
    <div>
      <div className="alert alert-secondary">
        {state?.response?.uref?.respId ? <h5>Response Update</h5> : <h5>Response Create</h5>}
      </div>

      {state?.response?.progress && (
        <div className="mx-4 alert alert-success">Operation Success</div>
      )}

      <form ref={formEl} className="mx-4 needs-validation " noValidate>
        <div>
          <input
            type="text"
            value={answer}
            onChange={updateAnswer}
            className="form-control form-control-lg mb-1"
            placeholder="Enter the answer"
            minLength="5"
            maxLength="100"
            required
          />
        </div>

        <div>
          <input
            type="date"
            value={respDate}
            onChange={updateRespDate}
            className="form-control form-control-lg mb-1"
            placeholder="Select the Response Date"
            // minLength="3"
            // maxLength="30"
            required
            required
          />
        </div>

        <div>
          <input
            type="time"
            value={respTime}
            onChange={updateRespTime}
            className="form-control form-control-lg mb-1"
            placeholder="Select Feed Time"
            // minLength="3"
            // maxLength="30"
            required
          />
        </div>


        <div>
          <input
            type="text"
            value={accuracy}
            onChange={updateAccuracy}
            className="form-control form-control-lg mb-1"
            placeholder="Enter the Accuracy percentage"
            // minLength="6"
            maxLength="3"
            required
          />
        </div>

        

        <div>
          <input
            type="Number"
            value={likes}
            onChange={updateLikes}
            className="form-control form-control-lg mb-1"
            placeholder="Enter to Like"
             //minLength="10"
            // maxLength="100"
            required
          />
        </div>

        <div>
          {state?.response?.uref?.respId ? (
            <input
              type="button"
              onClick={updateResponse}
              value="Update Response"
              className="btn btn-lg btn-secondary w-100"
            />
          ) : (
            <input
              type="button"
              onClick={addNewResponse}
              value="Add Response"
              className="btn btn-lg btn-secondary w-100"
            />
          )}
        </div>
      </form>
    </div>
  );
};