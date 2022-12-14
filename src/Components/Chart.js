import React from "react";
import "../css/chart.css";
import "../css/App.css";
import { Chart, registerables } from "chart.js";

/**
 * 
 * @param {*} candleData 
 * @apiNote convert candle data into plottable close price data
 */
var preparePlotableCloseData = (stockCode, candleData) => {
    // get time stamp
    var timeStamps = [];

    for (var i=0; i<candleData.t.length; i++) 
        timeStamps.push(new Date(candleData.t[i] * 1000));

    return {
        stockCode: stockCode,
        x_axis: timeStamps,
        y_axis: candleData.c
    };
}

const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

/**
 * 
 * @param {} data 
 * @apiNote generate config for plot data
 */
var setUpChartConfig = (data) => {
    var config = {
        type: "line",
        data: {
            labels: data.x_axis,
            datasets: [
                {
                    data: data.y_axis,
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderColor: "rgb(73,212,25)",
                    segment: {
                        borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
                    },
                }
            ]
        },
        options: {
            responsive: true,
            
            scales: {
                x: {
                    ticks: {
                      display: false
                    },
                    grid: {
                      display: false
                    }
                },
                y: {
                    ticks: {
                      display: true,
                      stepSize: 5
                    },  
                    grid: {
                      display: false
                    },
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true,
                    mode: 'point'
                },
            },
            elements: {
              point:{
                  radius: 0
              }
            },
            maintainAspectRatio: false,
        }
        
    }

    return config;
}

/**
 * 
 * @param {*} param0 
 * @returns 
 * @apiNote stockValue: AAPL
 * @apiNote candleData: {c: Array(179), h: Array(179) ???}
 */
class MyChart extends React.Component {
    constructor() {
        super();
        this.chartRef = React.createRef();
    }

    componentWillMount = () => {
        Chart.register(...registerables);
    }

    componentDidMount = () => {
        //canvas ref
        var canvasRef = this.chartRef.current.getContext("2d");
        //plottable data object
        var plottableData = preparePlotableCloseData(this.props.stockCode, this.props.candleData);
        // set up chart
        var configChart = setUpChartConfig(plottableData);
        console.log(plottableData);
        // render chart
        new Chart(canvasRef, configChart);
    }

    render() {
        return (
            <div className="my__chart" id={"myChart-"+this.props.stockCode}>
                <h2 className="h5 mb-3">
                    {(this.props.stockCode==="")? "" : this.props.stockCode}
                    <div className="ml-2 d-inline">
                    (Last 72 hours)
                    </div>
                </h2>
                <div className="my__canvas">
                    <canvas ref = {this.chartRef}/>
                </div>
            </div>
        );
    }
}

export default MyChart;