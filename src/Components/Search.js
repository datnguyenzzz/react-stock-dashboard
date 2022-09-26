import React from "react";
import "../css/styles.css";
import "../css/search.css";
import { ACTION } from "./App";
import finnhubApi from "../apis/finnhubApi";

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stockCode: ""
        }
    }

    setStockCode = (newStockCode) => {
        this.setState({
            stockCode: newStockCode
        });
    }

    passStockCode = (data) => {
        return {
            type: ACTION.SET_STOCK_CODE,
            payload: {
                stockCode: data
            }
        }
    }

    passCandleData = (data) => {
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
    handleSearchQuery = () => {
        //pass stock code to App
        var payload = this.passStockCode(this.state.stockCode);
        this.props.dispatch(payload);
        //make api call
        console.log("Make api call to " + this.state.stockCode);

        //get qoute data
        const quotePromise = new Promise((resolve, reject) => {
            var quote = finnhubApi.get('/quote', {
                params: {
                    symbol: this.state.stockCode,
                    token: 'bqhq9i7rh5rbubolrqd0'
                }
            })

            if (quote) resolve(quote);
            else reject("Wrong code!!!");
        });

        quotePromise.then((response) => {
            this.handleQuoteData(response.data);
        }).catch((err) => {
            console.log(err);
        })

        //get stock candle

        let toDate = Math.round(new Date().getTime() / 1000);
        let fromDate = toDate - (72 * 3600);
        const candlePromise = new Promise((resolve, reject) => {
            var payload = this.passCandleData({});
            this.props.dispatch(payload);
            //make call api
            var candle = finnhubApi.get('/stock/candle', {
                params: {
                    symbol: this.state.stockCode,
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
            this.handleCandleData(response.data);
        })
        .catch((err) => {
            console.log(err);
        })

        //clear stock code
        this.setStockCode("");
    }

    handleQuoteData = (data) => {
        console.log(data);
    }

    handleCandleData = (data) => {
        var payload = this.passCandleData(data);
        this.props.dispatch(payload);
    }

    /**
     * 
     * @param {*} event 
     * @apiNote change stock to upper case
     */
    changeStockCode = (event) => {
        this.setStockCode(event.target.value.toUpperCase());
    }

    render() {
        return (
            <div className="card card-container search">
                <div className="card-body">
                    <h2 className="h6 mb-2">
                        Search stock code: 
                    </h2>
                    <input type="text" value = {this.state.stockCode}
                        className="form-control stock-code__value"
                        onChange={this.changeStockCode}
                        placeholder = "Stock code (e.g GOOG)"/>

                    <button onClick={this.handleSearchQuery}
                        className="btn btn-secondary w-100 btn-search"> 
                        Search result 
                    </button>
                </div>
            </div>
        );
    }
}

export default Search;