import React from "react";
import Moment from "react-moment";
import "./OrderItem.css";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from "./MenuItem";
import TableNumber from "./TableNumber";


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


const useStyles = makeStyles((theme) => ({
    root: {
        background: '#DCE3E9',
        width: 345,
        height: 300,
        border: "2px solid",
        textAlign: 'center',
        display: 'inline-block',
        float: 'left',
        margin: 30,
        "&:hover": {
            background: '#C6CCD1',
        },
        scroll: {
            maxHeight: "400px",
            overflowY: 'scroll',
        }
    },
    status: {
        background: '#a9a9a9',
        // #FFE4B5
        borderBottom: "3px dotted",
    },
    details: {
        border: "1px solid",
        textAlign: 'left',
        scrollBehavior: "smooth",
    },
    pending: {
        background: '#FF0000',
    },
    inprogress: {
        background: '#FFFF00',
    },
    itemsmenu: {
        textAlign: 'left',
        background: '#568884',
    },
    buttons: {
        position: "relative",
        bottom: "0",
        left: "0",
    }
}));


function OrderItem(props) {
    const classes = useStyles();

    return (
    <Card className={classes.root}>
        <CardHeader className={classes.status}
            title={<TableNumber orderId={props.item.id} />}
            subheader={<>Waiting for {calculateWaitingTime(props.item.date)} minutes</>}
        />
        
        <CardContent>
            <div className={classes.details}>
                <ul>
                    {props.item.items.map(menuItem => {
                        return <MenuItem menuItemId={menuItem.menuItem} amount={menuItem.amount} key={menuItem.id}/>
                    })}
                </ul>
            </div>
        </CardContent>
        <CardContent>
            <div className={classes.buttons}>
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


export default OrderItem;
