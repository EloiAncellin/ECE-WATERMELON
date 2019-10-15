import React, {Component} from 'react';

import {getUserFromStorage} from "../../services/storageService";
import Connect from "./Connect";
import Menu from "./Menu/Menu";
import Header from "./Header/Header";


class GlobalRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            userStatus: ""
        };
        let storageUser = getUserFromStorage();
        console.log(storageUser);
        this.state.userStatus = storageUser.status;
        console.log(this.state.userStatus);
        if (storageUser.status === "success") {
            this.state.user = storageUser.result;
            console.log(this.state.user);
            console.log(this.state.user.id);
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
