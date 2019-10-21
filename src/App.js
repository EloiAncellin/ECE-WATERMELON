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
}

export default App;
