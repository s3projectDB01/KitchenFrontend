import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import "./OrderItem.css";


function calculateWaitingTime(createdTime) {

    return <Moment diff={createdTime} unit="minutes"></Moment>
}

function refreshPage() {
    window.location.reload(false)
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

    fetch(window.globalConfig.API_URL + '/Order/Order', requestOptions)
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

    fetch(window.globalConfig.API_URL + '/Order/Order', requestOptions)
        .then(response => response.json())
        .then(refreshPage)
}

function LoadMenuItems(cb) {
    
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(window.globalConfig.API_URL + '/Menu/MenuItem')
            const data = await response.json();
            cb(data)
        }
        fetchData();
    }, [cb])
}

function LoadIngredients(props) {
    props.ingredients ?
    props.ingredients.map(i => <li>{i.name}</li>)
    : console.log("no ingredients")
}

function OrderItem(props) {
    const [menuitems, setMenuitems] = useState([])
    LoadMenuItems(setMenuitems);
    
    return (
        <div className="orderitem">
            {/* <div className="orderitem-table">Order</div> */}
            <div className="orderitem-status">{props.item.status}</div>
            <div className="orderitem-waitingtime">Waiting for {calculateWaitingTime(props.item.date)} minutes</div>
            <div className="orderitem-details">
                Order Details:
                <div className="orderitem-details-items">
                    {menuitems.map((m) => {
                        return <>
                            <ul key={m.id}>{m.name}</ul>
                            {LoadIngredients(m)}
                        </>
                    })}
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
