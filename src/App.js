import React from 'react';
import './App.css';
import Header from "./app/containers/Header/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";import Menu from "./app/containers/Menu/Menu";
import Login from "./app/containers/Login/Login";
import {saveUserToStorage} from "./services/userService";


function App() {saveUserToStorage();


    const logged = true;
    let user = localStorage.getItem('user');

    return (
        <div className="App">
            {/*<Header/>*/}
            {/*<DumbRouter loggedIn={true}/>*/}

            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/public">Public Page</Link>
                        </li>
                        <li>
                            <Link to="/protected">Protected Page</Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/public">
                            <PublicPage/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <PrivateRoute path="/protected">
                            <ProtectedPage/>
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        </div>
    );

    function PrivateRoute({children, ...rest}) {
        let isAuthenticated = false;

        //localStorage.clear();
        let user = localStorage.getItem('user');
        if(user !== "undefined"){
            user = JSON.parse(user);
        }

        if( user !== null && user.id !== undefined){
            isAuthenticated= true;
        }else{
            isAuthenticated=false;
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
        return <Header/>;
    }


}
export default App;
