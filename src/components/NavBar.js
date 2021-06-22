import React from 'react'
import AppBar from '@material-ui/core/AppBar'

function NavBar() {
    const styleObj = {
        color: "#fff",
        textAlign: "center",
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