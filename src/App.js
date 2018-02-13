import React from 'react';
import { Route } from 'react-router-dom';
import BoardPage from "./components/BoardPage";
import HomePage from "./components/HomePage";
import './app.css';

const App = () => (
    <div className="App">
        <Route path="/" exact component={HomePage} />
        <Route path="/board" exact component={BoardPage} />
    </div>
);

export default App;
