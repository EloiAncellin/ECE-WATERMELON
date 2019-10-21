import React from 'react';
import './App.css';
import Header from "./app/containers/Header/Header";
import {
    Route,
    Redirect,
} from "react-router-dom";
import {getUserFromStorage} from "./services/storageService";
import "./app/containers/Menu/Menu"
import GlobalRouter from "./app/containers/globalRouter";
import "./app/styles/app.css";

function App() {
    return (
        <GlobalRouter/>
    );

    function PrivateRoute({children, ...rest}) {
        let isAuthenticated = false;

        let user = getUserFromStorage();

        if (user.status === "success") {
            isAuthenticated = true;
        } else {
            isAuthenticated = false;
        }
        return (
            <Route
                {...rest}
                render={({location}) =>
                    isAuthenticated ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: location}
                            }}
                        />
                    )
                }
            />
        );
    }

    function PublicPage() {
        return <h3>Public</h3>;
    }

    function ProtectedPage() {
        return (
            <div>
                <Header/>
            </div>
        );
    }
}

export default App;
