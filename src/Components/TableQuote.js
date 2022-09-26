import React from "react";

class TableQuote extends React.Component {
    constructor() {
        super();
        this.state = {
            currency: "$"
        }
    }

    render() {
        return (
            <div>
                Quote data
            </div>
        )
    };
}

export default TableQuote;