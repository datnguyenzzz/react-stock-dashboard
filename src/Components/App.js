import React, { useReducer } from "react";
import Search from "./Search";
import "../css/App.css"
import "../css/styles.css"

export const ACTION = {
  SET_STOCK_CODE: "set-stock-code",
  SET_CANDLE_DATA: "set-candle-data"
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
    case ACTION.SET_CANDLE_DATA:
      return {...state, candleData: action.payload.candleData};
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, {stockCode: "", candleData: {}});

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
            <div className="card card-container graph">
              <div className="card-body">
                <h2 className="h4 mb-0">
                  {(state.stockCode==="")? "" : state.stockCode + " (last 72 hours)"}
                </h2>
                {Object.keys(state.candleData).length===0 ? 
                  <p className="no-candle-data-message">
                    No current stock found. Go to the first box and search for a stock.
                  </p>
                  : 
                  <div>
                    {state.candleData.c}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
