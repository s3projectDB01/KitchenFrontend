import React from "react";
import Moment from "react-moment";
import "./OrderItem.css";

// export default class OrderItem extends React.Component {
//     render() {
//         let orderItem = this.props.item;

//         // to calculate the waiting time
//         let createdTime = orderItem.date;
//         let currentTime = new Date().toString();

//         <Moment>{createdTime}</Moment>

//         return (
//             <tr key={orderItem.id}>
//                 <td>{orderItem.price}</td>
//                 <td>{orderItem.date}</td>
//                 <td>{orderItem.status}</td>
//                 <td><Moment diff={createdTime} unit="minutes"></Moment></td>
//             </tr>            
//         );
//     }
// }

function calculateWaitingTime(createdTime) {

    return <Moment diff={createdTime} unit="minutes"></Moment>
}


function OrderItem(props) {
    
    return (

        <div className="orderitem">
            <div>{props.item.tablenumber}</div>
            <div>{calculateWaitingTime(props.item.date)} minutes</div>
            <div>{props.item.date}</div>
            <div>{props.item.status}</div>
            <div>€ {props.item.price}</div>
            <button>DONE</button>
        </div>

    )
}

export default OrderItem;
