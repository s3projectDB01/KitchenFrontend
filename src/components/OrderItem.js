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
            {/* <div className="orderitem-table">Order</div> */}
            <div className="orderitem-status">{props.item.status}</div>
            <div className="orderitem-waitingtime">Waiting for {calculateWaitingTime(props.item.date)} minutes</div>
            <div className="orderitem-details">
                Order Details:
                <div className="orderitem-details-items">
                    <ol>
                        MenuItem 1
                    </ol>
                </div>
            </div>

            <div className="btns">
                {
                    props.item.status === "pending" ? 
                    <button className="btn-progress" onClick={() => updateStatusToProgress(props.item)}>In Progress</button> :
                    <button className="btn-done" onClick={() => updateStatusToDone(props.item)}>DONE</button>
                }
            </div>

        </div>
    )
}

export default OrderItem;
