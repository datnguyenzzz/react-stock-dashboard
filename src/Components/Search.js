import React, { useState } from "react";

var Search = () => {

    const [stockName, setStockName] = useState("");

    var handleSearchQuery = () => {
        alert("Make api call with " + stockName);
    }

    return (
        <>
            <h2>Search stock code: </h2>
            <input type="text" value = {stockName}
                onChange={(event)=>{
                    setStockName(event.target.value);
                }}
                placeholder = "Stock code (e.g GOOG)"/>

            <button onClick={handleSearchQuery}> Search result </button>
        </>
    );
}

export default Search;