import React from "react";

class TableNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tableNumber: 0, loading: true };
    }

    componentDidMount() {
        this.populateTableNumber();
    }

    render() {
        return (this.state.loading ? <span>Loading...</span> : <span>Table: {this.state.tableNumber}</span>);
    }

    async populateTableNumber() {
        //API CALL
        const response = await fetch(window.globalConfig.API_URL + "/Order/Order/GetTableNumberByOrderId/" + this.props.orderId);
        const data = await response.json();
        this.setState({ tableNumber: data, loading: false });
    }
}

export default TableNumber;