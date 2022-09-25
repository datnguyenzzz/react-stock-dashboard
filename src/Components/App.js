import React, { useReducer } from "react";
import Search from "./Search";
import "../css/App.css"
import "../css/styles.css"

export const ACTION = {
  SET_STOCK_CODE: "set-stock-code"
}

/**
 * 
 * @param {*} state 
 * @param {*} action
 * @apiNode action = {type: ... , payload: {...}} 
 * @apiNode state = {stockCode: ...}
 */
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_STOCK_CODE:
      return {...state, stockCode: action.payload.stockCode};
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, {stockCode: ""});

  return (
    <div className="app-container">
      <div className="row app-container__row">
        <div className="col-12 app-container__container">
          <div className="app-container__left">
            <Search dispatch = {dispatch} />
            <div>
              Filter
            </div>
          </div>
          <div className="app-container__right">
            <div className="card card-container">
              <div className="card-body">
                {(state.stockCode==="")? "Stock code" : state.stockCode}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
