import React from "react";
import "../css/styles.css";
import "../css/table-data.css";

class TableQuote extends React.Component {
    constructor() {
        super();
        this.state = {
            currency: "$",
        }
    }

    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps);
    }

    render() {
        //quote content update if need
        return (
            (this.props.loading) ? <p>Loading ....</p>
            :    
            <div className="card card-container table-data">
                <div className="card-body">
                    <h2 className="h6 mb-3">
                        Latest available data:
                    </h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Stock Code</th>
                                <th scope="col">Last Updated Data</th>
                                <th scope="col">Open Price</th>
                                <th scope="col">Low Price</th>
                                <th scope="col">High Price</th>
                                <th scope="col">Previous Close Price</th>
                                <th scope="col">Current Price</th>
                                <th scope="col">% From Yesterday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(this.props.quoteData).map((key) => {
                                    return (
                                        <tr>
                                            <th> {key} </th>
                                            <td>{this.props.quoteData[key].t}</td>
                                            <td>{this.props.quoteData[key].o.toFixed(2)}</td>
                                            <td>{this.props.quoteData[key].l.toFixed(2)}</td>
                                            <td>{this.props.quoteData[key].h.toFixed(2)}</td>
                                            <td>{this.props.quoteData[key].pc.toFixed(2)}</td>
                                            <td>{this.props.quoteData[key].c.toFixed(2)}</td>
                                            <td>{(100 - 100.0*this.props.quoteData[key].pc / this.props.quoteData[key].c).toFixed(2)}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    };
}

export default TableQuote;