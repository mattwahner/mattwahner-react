import React from 'react';
import {Button} from "semantic-ui-react";

class HomePage extends React.Component {
    render() {
        return (
            <Button onClick={() => this.props.history.push('/board')} fluid>Board</Button>
        );
    }
}

export default HomePage;