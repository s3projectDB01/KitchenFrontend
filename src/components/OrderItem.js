import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import "./OrderItem.css";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { deprecationHandler } from "moment";


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
            const response = await fetch(window.globalConfig.API_URL + `/Menu/MenuItems/GetById?id=${element.menuItem}`, {method:"GET", mode:"cors",
             headers: {'Content-Type': 'application/json'}, credentials: 'include'})
            const data = await response.json();
            return data;
        }
        return fetchData();
    });
}



const useStyles = makeStyles((theme) => ({
    root: {
        background: '#DCE3E9',
        width: 345,
        border: "2px solid",
        textAlign: 'center',
        display: 'inline-block',
        float: 'left',
        margin: 30,
        "&:hover": {
            background: '#C6CCD1',
        }
    },
    status: {
        // background: '#CA0088',
        borderBottom: "3px dotted",
    },
    details: {
        border: "1px soldid",
        background: "#55555",
    },
    pending: {
        background: '#FF0000',
    },
    inprogress: {
        background: '#FFFF00',
    }
}));



function OrderItem(props) {

    const [menuitems, setMenuitems] = useState([])

    useEffect(() => {
        GetMenuItems(props.item.items)
          .then(res => res.json())
          .then((result) => { setMenuitems([...menuitems, result])}, (error) => {console.log("no menu items loaded")})
    }, )


    const classes = useStyles();

    return (
    <Card className={classes.root}>
        <CardHeader className={classes.status}
            title={props.item.status}
            subheader={`Waiting for ${calculateWaitingTime(props.item.date)} minutes`}
        />
        <CardContent>
            <div className={classes.details}>
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
                    <Button variant='contained' color='primary' className="btn-progress" onClick={() => updateStatusToProgress(props.item)}>IN PROGRESS</Button> :
                    <Button variant='contained' color='secondary' className="btn-done" onClick={() => updateStatusToDone(props.item)}>DONE</Button>
                }
            </div>

        </CardContent>
    </Card>
  );
}





// function OrderItem(props) {

//     const styles = () => ({
//         orderitemstyle: {
//             background: "#f1f1f1",
//             marginTop: '15px',
//             width: '350px',
//             padding: '5px',
//             maxWidth: '800px',
//             border: 1,
//             '&:hover': {
//                 background: '#DCE3E9',
//                 boxShadow: 3,
//             },
//         },

//         status: {
//             background: 'yellow',
//             fontSize: 40,
//             textAlign: 'center',
//         },

//         waitingTime: {
//             background: '#FDF041',
//             borderRadius: 15,
//             textAlign: 'center',
//             padding: 3,
//             margin: 15,
//         },

//         details: {
//             border: 3,
//             padding: 5,
//             margin: 15,
//         },

//         detailitems: {
//             textAlign: 'left',
//         },

//         buttons: {
//             variant: "contained",
//             color: "primary",
//             '&:hover': {
//                 background: '#2c387e',
//                 boxShadow: 3,
//             },
//         }
//     })


export default OrderItem;
