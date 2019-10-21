import React, {Component} from 'react';
import {getUserFromStorage} from "../../services/storageService";
import Connect from "./Connect";
import Header from "./Header/Header";

class GlobalRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            userStatus: ""
        };
        let storageUser = getUserFromStorage();
        this.state.userStatus = storageUser.status;
        if (storageUser.status === "success") {
            this.state.user = storageUser.result;
        } else {

        }
    }

    render() {
        if (this.state.user.id) {
            return (
                <div>
                    <Header/>
                </div>
            )
        } else {
            return (<Connect/>);
        }
    }
}

export default GlobalRouter;
