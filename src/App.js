import React from 'react';
import { Route } from 'react-router-dom';
import BoardPage from "./components/BoardPage";
import './app.css';

const App = () => (
    <div>
        <Route path="/board" exact component={BoardPage} />
    </div>
);

export default App;
