import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import {Button, Card, Form, Grid, Message} from "semantic-ui-react";
import {createMessage, fetchMessages, setMessage} from "../actions/messages";
import EditModal from "./EditModal";

class Dashboard extends React.Component {
    state = {
        arb: '',
        loading: false,
        notification: ''
    };

    componentDidMount = () => this.props.fetchMessages();

    createSubmit = () => {
        this.setState({ loading: true });
        this.props.createMessage(this.state.arb)
            .then(() => this.setState({ loading: false }));
        this.setState({ arb: '' });
    };

    onMessageSet = text => {
        setMessage(text)
            .then(() => this.setState({ notification: `Updated board to "${text}"`}))
            .then(() => setTimeout(() => {
                this.setState({ notification: '' })
            }, 3000));
    };

    render() {
        const messageCards = this.props.messages.map(message => (
            <Card key={message.id}>
                <Card.Content>
                    <Card.Header>
                        {message.text}
                    </Card.Header>
                    <Card.Content>
                        <div className="ui two buttons">
                            <Button basic color="green" onClick={() => this.onMessageSet(message.text)}>Set</Button>
                            <EditModal id={message.id} text={message.text}/>
                        </div>
                    </Card.Content>
                </Card.Content>
            </Card>
        ));

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Form onSubmit={this.createSubmit} loading={this.state.loading}>
                            <Form.Group>
                                <Form.Field>
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        onChange={e => this.setState({ arb: e.target.value })}
                                        value={this.state.arb}
                                    />
                                </Form.Field>
                                <Button type="submit" primary>Create</Button>
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button floated="right" onClick={this.props.onLogout} primary>Logout</Button>
                    </Grid.Column>
                </Grid.Row>
                { this.state.notification &&
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Message positive>
                                <Message.Header>
                                    Success
                                </Message.Header>
                                <p>{ this.state.notification }</p>
                            </Message>
                        </Grid.Column>
                    </Grid.Row>
                }
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Card.Group>
                            { messageCards }
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages
});

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logout()),
    fetchMessages: () => dispatch(fetchMessages()),
    createMessage: (text) => dispatch(createMessage(text))
});

Dashboard.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })),
    onLogout: PropTypes.func.isRequired,
    fetchMessages: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
