import React, { useState } from "react";
import "../css/styles.css";
import "../css/search.css";
import { ACTION } from "./App";

var Search = ({ dispatch }) => {

    const [stockCode, setstockCode] = useState("");

    const passStockCode = {
        type: ACTION.SET_STOCK_CODE,
        payload: {
            stockCode: stockCode
        }
    }

    var handleSearchQuery = () => {
        dispatch(passStockCode);
        alert("Make api call with " + stockCode);
        setstockCode("");
    }

    return (
        <div className="card card-container search">
            <div className="card-body">
                <h2 className="h6 mb-2">
                    Search stock code: 
                </h2>
                <input type="text" value = {stockCode}
                    className="form-control stock-code__value"
                    onChange={(event)=>{
                        setstockCode(event.target.value);
                    }}
                    placeholder = "Stock code (e.g GOOG)"/>

                <button onClick={handleSearchQuery}
                    className="btn btn-secondary w-100 btn-search"> 
                    Search result 
                </button>
            </div>
        </div>
    );
}

export default Search;