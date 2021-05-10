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
                {/* <button onClick={() => this.loadOrderItems()}>Reload!</button> */}
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
            <div>
                {/* map the orders and if they are not completed, then display the orderitem */}
                {orderItems.map(o => (o.iscompleted ? "" : <OrderItem item={o} />))}
            </div>
        );
    }
}

export default OrderList;