import React, { useState } from "react";
import "../css/styles.css";
import "../css/search.css";

var Search = () => {

    const [stockCode, setstockCode] = useState("");

    var handleSearchQuery = () => {
        alert("Make api call with " + stockCode);
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