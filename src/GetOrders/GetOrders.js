import React from "react";

class GetOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = { orders: [], loading: true };
    }

    componentDidMount() {
        this.populateOrders();
    }

    static renderOrders(orders) {
        return (
            <center>
                <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>price</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order =>
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.price}</td>
                    </tr>
                )}
                </tbody>
                </table>
            </center>
        );
    }

    render() {
        let contents = this.state.loading ? 
        <span>Loading...</span> : 
        GetOrders.renderOrders(this.state.orders)

        return (
            <div>
                {contents}
                <button onClick={() => this.populateOrders()}>Reload!</button>
            </div>
        );
    }

    async populateOrders() {
        //API CALL
        const response = await fetch("https://localhost:6001/Order");
        const data = await response.json();
        this.setState({ orders: data, loading: false });
    }
}

export default GetOrders;