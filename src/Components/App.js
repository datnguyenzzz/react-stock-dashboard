import React from "react";
import Search from "./Search";
import "../css/App.css"
import "../css/styles.css"
import MyChart from "./Chart";
import Filter from "./Filter";
import TableQuote from "./TableQuote";

export const ACTION = {
  SET_STOCK_CODE: "set-stock-code",
  SET_CANDLE_DATA: "set-candle-data",
  ADD_QUOTE_DATA: "add-quote-data"
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stockCode: "",
      candleData: "",
      loadingQuoteTable: true,
      quoteTable: {}
    }
  }
  
  setStockCode = (newStockCode) => {
    this.setState({
      stockCode: newStockCode
    })
  }

  setCandleData = (newCandleData) => {
    this.setState({
      candleData: newCandleData
    })
  }

  setQuoteTable = (newStockCode, newQuoteData) => {
    console.log(newStockCode)
    console.log(newQuoteData)
    this.setState({loadingQuoteTable: true});
    this.setState({
      quoteTable: {
        ...this.state.quoteTable,
        [newStockCode]: newQuoteData
      }
    }, () => {
      this.setState({loadingQuoteTable: false});
    })

  }

  /**
   * 
   * @param {*} action 
   * @apiNote action = {type: ... , payload: {...}} 
   */
  dispatch = (action) => {
    switch (action.type) {
      case ACTION.SET_STOCK_CODE:
        return this.setStockCode(action.payload.stockCode);
      case ACTION.SET_CANDLE_DATA:
        return this.setCandleData(action.payload.candleData);
      case ACTION.ADD_QUOTE_DATA:
        return this.setQuoteTable(action.payload.stockCode, action.payload.quoteData);
      default:
        return this.state;
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="row app-container__row">
          <div className="col-12 app-container__container">
            <div className="app-container__left">
              <Search dispatch = {this.dispatch} />
              <Filter dispatch = {this.dispatch} />
            </div>
            <div className="app-container__right">
              <div className="card card-container graph">
                <div className="card-body">
                  
                  {Object.keys(this.state.candleData).length===0 ||
                    this.state.candleData.s === "no_data" ? 
                    <p className="no-candle-data-message">
                      No current stock found. Go to the first box and search for a stock.
                    </p>
                    : 
                    <MyChart stockCode = {this.state.stockCode} candleData = {this.state.candleData} dispatch = {this.dispatch} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row table-data-row">
          <div className="col-12 table-data-col">
            <TableQuote loading = {this.state.loadingQuoteTable} quoteData={this.state.quoteTable} />
          </div>
        </div>
      </div>
    );
  };
}

export default App;
