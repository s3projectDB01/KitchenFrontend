import React from 'react'
import AppBar from '@material-ui/core/AppBar'

function NavBar() {
    const styleObj = {
        color: "#fff",
        textAlign: "center",
        fontSize: "2em",
        marginBlockStart: "0.6em",
        marginBlockEnd: "0.6em"
    }

    return(
        <div>
            <AppBar position="static">
                <h1 style={styleObj}>Kitchen Overview</h1>
            </AppBar>
        </div>
    )
}

export default NavBar;