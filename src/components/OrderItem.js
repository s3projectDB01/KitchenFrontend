import React from "react";
import Moment from "react-moment";
import "./OrderItem.css";


function calculateWaitingTime(createdTime) {

    return <Moment diff={createdTime} unit="minutes"></Moment>
}

function updateStatusToDone(props) {

    const newOrder = {
        ...props,
        status: "done"
    }
    
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( newOrder )
    };
    console.log(newOrder)

    fetch('https://localhost:6001/Order', requestOptions)
        .then(response => response.json())
        .then(refreshPage)
}

function updateStatusToProgress(props) {
    
    const newOrder = {
        ...props,
        status: "inprogress"
    }
    
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( newOrder )
    };
    console.log(newOrder)

    fetch('https://localhost:6001/Order', requestOptions)
        .then(response => response.json())
        .then(refreshPage)
}

function refreshPage() {
    window.location.reload(false)
}

function OrderItem(props) {
    return (
        <div className="orderitem">
            <div className="orderitem-table">Order</div>
            <div className="orderitem-waitingtime">Waiting for {calculateWaitingTime(props.item.date)} minutes</div>
            <div>{props.item.status}</div>
            <button onClick={() => updateStatusToProgress(props.item)}>In Progress</button>
            <button onClick={() => updateStatusToDone(props.item)}>DONE</button>
        </div>
    )
}

export default OrderItem;
