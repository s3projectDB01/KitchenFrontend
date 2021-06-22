import React from "react";

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { menuItem: "", loading: true };
    }

    componentDidMount() {
        this.populateMenuItems();
    }

    render() {
        let contents = this.state.loading ? <span>Loading...</span> : this.state.menuItem;

        return (
            <li> {this.props.amount}x {contents}</li>
        );
    }

    async populateMenuItems() {
        //API CALL
        const response = await fetch(window.globalConfig.API_URL + "/Menu/MenuItems/GetById?id=" + this.props.menuItemId);
        const data = await response.json();
        this.setState({ menuItem: data.name, loading: false });
    }
}

export default MenuItem;