import React from 'react';
import { Route } from 'react-router-dom';
import BoardPage from "./components/pages/BoardPage";

const App = () => (
    <div className="ui container">
        <Route path="/board" exact component={BoardPage} />
    </div>
);

export default App;
