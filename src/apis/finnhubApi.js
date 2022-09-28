import axios from "axios";

export default axios.create({
    baseURL: 'https://finnhub.io/api/v1/'
});
//https://finnhub.io/api/v1/quote?symbol=AAPL&token=