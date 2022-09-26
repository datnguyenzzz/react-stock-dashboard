import React, { useState } from "react";
import "../css/styles.css";
import "../css/search.css";
import { ACTION } from "./App";
import finnhubApi from "../apis/finnhubApi";

var Search = ({ dispatch }) => {

    const [stockCode, setStockCode] = useState("");

    const passStockCode = {
        type: ACTION.SET_STOCK_CODE,
        payload: {
            stockCode: stockCode
        }
    }

    const passCandleData = (data) => {
        return {
            type: ACTION.SET_CANDLE_DATA,
            payload: {
                candleData: data
            }
        }
        
    }

    /**
     * 1. pass stock code to App state
     * 2. make api call
     * 
     * quote: https://finnhub.io/api/v1/quote?symbol=AAPL&token=
     * 
     * candle: /stock/candle?symbol=&resolution=&from=&to=
     * 3. clear current code
     */
    var handleSearchQuery = () => {
        //pass stock code to App
        dispatch(passStockCode);
        //make api call
        console.log("Make api call to " + stockCode);

        //get qoute data
        const quotePromise = new Promise((resolve, reject) => {
            var quote = finnhubApi.get('/quote', {
                params: {
                    symbol: stockCode,
                    token: 'bqhq9i7rh5rbubolrqd0'
                }
            })

            if (quote) resolve(quote);
            else reject("Wrong code!!!");
        });

        quotePromise.then((response) => {
            handleQuoteData(response.data);
        }).catch((err) => {
            console.log(err);
        })

        //get stock candle

        let toDate = Math.round(new Date().getTime() / 1000);
        let fromDate = toDate - (72 * 3600);
        const candlePromise = new Promise((resolve, reject) => {
            var payload = passCandleData({});
            dispatch(payload);
            //make call api
            var candle = finnhubApi.get('/stock/candle', {
                params: {
                    symbol: stockCode,
                    resolution: 5,
                    from: fromDate,
                    to: toDate,
                    token: 'bqhq9i7rh5rbubolrqd0'
                }
            })

            if (candle) resolve(candle);
            else reject("Wrong code!!");
        });

        candlePromise.then((response) => {
            handleCandleData(response.data);
        })
        .catch((err) => {
            console.log(err);
        })

        //clear stock code
        setStockCode("");
    }

    var handleQuoteData = (data) => {
        console.log(data);
    }

    var handleCandleData = (data) => {
        var payload = passCandleData(data);
        dispatch(payload);
    }

    /**
     * 
     * @param {*} event 
     * @apiNote change stock to upper case
     */
    var changeStockCode = (event) => {
        setStockCode(event.target.value.toUpperCase());
    }

    return (
        <div className="card card-container search">
            <div className="card-body">
                <h2 className="h6 mb-2">
                    Search stock code: 
                </h2>
                <input type="text" value = {stockCode}
                    className="form-control stock-code__value"
                    onChange={changeStockCode}
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