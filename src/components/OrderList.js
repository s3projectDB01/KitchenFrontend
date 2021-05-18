import React from "react";
import OrderItem from "./OrderItem";
import "./OrderList.css";

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { orderItems: [], loading: true };
    }

    render() {
        let contents = this.state.loading ? <span>Loading...</span> : OrderList.renderOrderItems(this.state.orderItems)

        return (
            <div>
                {contents}
            </div>
        );
    }

    componentDidMount() {
        this.loadOrderItems();
    }

    async loadOrderItems() {
        const response = await fetch("https://localhost:6001/Order/allNotDone");
        const data = await response.json();
        this.setState({ orderItems: data, loading: false});
    }

    static renderOrderItems(orderItems) {

        return (
            <div className="orderlist">
                {orderItems.map(o => <OrderItem item={o} />)}
            </div>
        );
    }
}

export default OrderList;