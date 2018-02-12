import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from "../../actions/auth";
import { Button, Form, Message } from "semantic-ui-react";

class LoginForm extends React.Component {
    state = {
        password: '',
        loading: false,
        error: ''
    };

    onSubmit = () => {
        this.setState({loading: true});
        this.props.onSubmit(this.state.password)
            .catch(err => this.setState({ error: err.message, loading: false }));
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} loading={this.state.loading}>
                { this.state.error &&
                    <Message negative>
                        <Message.Header>Something went wrong!</Message.Header>
                        <p>{ this.state.error }</p>
                    </Message>
                }
                <Form.Field>
                    <label>Password</label>
                    <input
                        type="password"
                        value={ this.state.password }
                        onChange={ e => this.setState({ password: e.target.value }) }
                    />
                </Form.Field>
                <Button type="submit" primary>Login</Button>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: login(dispatch)
});

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(LoginForm);
