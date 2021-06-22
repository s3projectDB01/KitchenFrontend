import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import "./OrderItem.css";
import Button from '@material-ui/core/Button';


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

async function GetMenuItems(itemids) {

    return itemids.map(element => {
        async function fetchData() {
            const response = await fetch(window.globalConfig.API_URL + `/Menu/MenuItems/GetById/${element.id}`, {method:"GET", mode:"cors",
             headers: {'Content-Type': 'application/json'}, credentials: 'include'})
            const data = await response.json();
            return data;
        }
        return fetchData();
    });
}


// async function GetIngredients(ingredientids) {

//     return ingredientids.map(element => {
        
//         async function fetchData() {
//             const response = await fetch(window.globalConfig.API_URL + `/Inventory/MenuItems/GetById/${element.id}`, {method:"GET", mode:"cors",
//              headers: {'Content-Type': 'application/json'}, credentials: 'include'})
//             const data = await response.json();
//             return data;
//         }
//         return fetchData();
//     });
// }











function OrderItem(props) {

    const styles = () => ({
        orderlist: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        orderItem: {
        marginTop: '15px',
        width: '100%',
        padding: '5px',
        maxWidth: '800px'
        },
        buttons: {
            variant: "contained",
            color: "primary",
        }
    })


    const [menuitems, setMenuitems] = useState([])

    useEffect(() => {
        GetMenuItems(props.item.items)
          .then(res => res.json())
          .then((result) => { setMenuitems([...menuitems, result])}, (error) => {console.log("no menu items loaded")})
      }, )

    
    return (
        <div style={styles.orderItem} className="orderitem">
            <div className="orderitem-status">{props.item.status}</div>
            TODO: add table number to order item
            {/* <div className="orderitem-tablenr">{props.item.tablenumber}</div> */}
            <div className="orderitem-waitingtime">Waiting for {calculateWaitingTime(props.item.date)} minutes</div>
            <div className="orderitem-details">
                Order Details:
                <div className="orderitem-details-items">

                    {menuitems.map((m) => {
                        return <>
                            <ul key={m.id}>
                                {m.name}
                                {/* {LoadIngredients(m)} */}
                            </ul>
                        </>
                    })}
                </div>
            </div>

            <div className="btns">
                {
                    props.item.status === "pending" ? 
                    <Button style={styles.buttons} className="btn-progress" onClick={() => updateStatusToProgress(props.item)}>IN PROGRESS</Button> :
                    <Button style={styles.buttons} className="btn-done" onClick={() => updateStatusToDone(props.item)}>DONE</Button>
                }
            </div>

        </div>
    )
}

export default OrderItem;
