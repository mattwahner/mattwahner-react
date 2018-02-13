import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {Button, Card, Form, Grid, Message} from "semantic-ui-react";
import {createMessage, fetchMessages, setMessage, updateMessage} from "../actions/messages";
import EditModal from "./EditModal";

class Dashboard extends React.Component {
    state = {
        arb: '',
        loading: false,
        notification: '',
        error: ''
    };

    componentDidMount = () => this.props.fetchMessages();

    createSubmit = () => {
        this.setState({ loading: true });
        this.props.createMessage(this.state.arb)
            .then(() => this.setState({ loading: false }))
            .catch((error) => {
                this.setState({ loading: false, error });
                setTimeout(() => {
                    this.setState({ error: '' })
                }, 3000);
            });
        this.setState({ arb: '' });
    };

    onMessageUpdate = (id, text) =>
        this.props.updateMessage(id, text)
            .catch((error) => {
                this.setState({ loading: false, error });
                setTimeout(() => {
                    this.setState({ error: '' })
                }, 3000);
            });

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
                            <EditModal id={message.id} text={message.text} onUpdate={this.onMessageUpdate}/>
                        </div>
                    </Card.Content>
                </Card.Content>
            </Card>
        ));

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Form onSubmit={this.createSubmit} loading={this.state.loading}>
                            <Form.Input
                                type="text"
                                placeholder="Location"
                                onChange={e => this.setState({ arb: e.target.value })}
                                value={this.state.arb}
                                label="Create a location"
                                action={ <Button primary>Create</Button> }
                            />
                        </Form>
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
                { this.state.error &&
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Message negative>
                            <Message.Header>
                                Error
                            </Message.Header>
                            <p>{ this.state.error }</p>
                        </Message>
                    </Grid.Column>
                </Grid.Row>
                }
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Card.Group centered>
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
    fetchMessages: () => dispatch(fetchMessages()),
    createMessage: (text) => dispatch(createMessage(text)),
    updateMessage: (id, text) => dispatch(updateMessage(id, text))
});

Dashboard.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })),
    fetchMessages: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    updateMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
