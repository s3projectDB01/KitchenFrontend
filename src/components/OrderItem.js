import React from "react";
import Moment from "react-moment";

export default class OrderItem extends React.Component {
    render() {
        let orderItem = this.props.item;

        // to calculate the waiting time
        let createdTime = orderItem.date;
        let currentTime = new Date().toString();

        <Moment>{createdTime}</Moment>

        console.log("createdTime: " + createdTime);
        console.log("currentTime: " + currentTime);

        return (
            <tr key={orderItem.id}>
                <td>{orderItem.price}</td>
                <td>{orderItem.date}</td>
                <td>{orderItem.status}</td>
                <td><Moment diff={createdTime} unit="minutes"></Moment></td>
            </tr>            
        );
    }
}
