import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./Login/Login";
import Menu from "./Menu/Menu.js";
import Header from "./Header/Header";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


function App() {
    return (
        <div className="App">
            <Header/>

        </div>
    );
}

export default App;
