import React from "react";
import OrderItem from "./OrderItem";
import "./OrderList.css";
import * as signalR from "@microsoft/signalr";
//import { withStyles } from "@material-ui/core/styles";


// const styles = () => ({
//   root: {
//     background: "ffffff",
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   }
// });


class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { orderItems: [], loading: true };
        this.connection = new signalR.HubConnectionBuilder().withUrl(window.globalConfig.WEBSOCKET_URL).build();
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

        this.connection.on("NewOrder", (msg) => this.loadOrderItems());

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
                {orderItems.map(o => <OrderItem item={o} key={o.id} />)}
            </div>
        );
    }
}

// export default withStyles(styles)(OrderList);
export default OrderList;