import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteResponseAction,
  getAllResponseAction,
  updateRenderAction,
} from "../redux/ResponseReducer";

export const ResponseList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllResponseAction());
  }, []);

  const deleteRecord = (item) => {
    console.log("DELETE RECORD", item.respId);
    //dispatch the call.
    dispatch(deleteResponseAction(item));
  };

  // Step2-update
  const updateRecord = (item) => {
    console.log("UPDATE RECORD", item);

    // Step3-updating the store
    dispatch(updateRenderAction(item));

    //navigating to the page
    history.push("/response-upsert");
  };

  return (
    <div>
      <div className="alert alert-secondary mb-0">
        <h3>Response List</h3>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">ANSWER</th>
            <th scope="col">RESPONSE DATE</th>
            <th scope="col">RESPONSE TIME</th>
            <th scope="col">ACCURACY</th>
            <th scope="col">LIKES</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {state.response.responseList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.respId}</th>
              <td>{item.answer}</td>
              <td>{item.respDate}</td>
              <td>{item.respTime}</td>
              <td>{item.accuracy}</td>
              <td>{item.likes}</td>
              <td>
                {/**Step1-update */}
                <input
                  type="button"
                  value="UPDATE"
                  className="btn btn-outline-secondary btn-sm mr-1"
                  onClick={() => updateRecord(item)}
                />
                <input
                  type="button"
                  value="DELETE"
                  // onClick={deleteRecord}
                  onClick={() => deleteRecord(item)}
                  className="btn btn-outline-danger btn-sm ml-1 "
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
