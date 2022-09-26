import React from "react";
import "../css/styles.css";
import "../css/table-data.css";

class TableQuote extends React.Component {
    constructor() {
        super();
        this.state = {
            currency: "$"
        }
    }

    render() {
        return (
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
                    </table>
                </div>
            </div>
        )
    };
}

export default TableQuote;