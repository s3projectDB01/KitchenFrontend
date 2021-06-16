import React from "react";
import OrderItem from "./OrderItem";
import "./OrderList.css";
import * as signalR from "@microsoft/signalr";

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { orderItems: [], loading: true };
        this.connection = new signalR.HubConnectionBuilder().withUrl(window.globalConfig.API_URL + "/orderHub").build();
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

        this.connection.on("NewOrder", this.loadOrderItems);

        this.connection.start();
    }

    async loadOrderItems() {
        console.log("it ran")
        const response = await fetch(window.globalConfig.API_URL + "/Order/Order/allNotDone");
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