import React from "react";
import OrderItem from "./OrderItem";

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
                <button onClick={() => this.loadOrderItems()}>Reload!</button>
            </div>
        );
    }

    componentDidMount() {
        this.loadOrderItems();
    }

    async loadOrderItems() {
        const response = await fetch("https://localhost:6001/Order/all");
        const data = await response.json();
        this.setState({ orderItems: data, loading: false});
    }

    static renderOrderItems(orderItems) {
        return (
            <center>
                <table>
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Waiting time</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.map(orderItem =>
                        <OrderItem item={orderItem}></OrderItem>
                    )}
                </tbody>
            </table>
            </center>
        );
    }
}

export default OrderList;