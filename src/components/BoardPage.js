import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import {Container, Header, Menu} from "semantic-ui-react";
import {logout} from "../actions/auth";

const BoardPage = ({ token, onLogout }) => {
    let display = null;

    const header = <Header textAlign="center" as="h1" inverted>Board Page</Header>;

    if (token) {
        display = (
            <Container>
                <Menu borderless inverted>
                    <Menu.Item>
                        { header }
                    </Menu.Item>
                    <Menu.Item
                        name="logout"
                        position="right"
                        onClick={onLogout}
                    >
                        Logout
                    </Menu.Item>
                </Menu>

                <Dashboard />
            </Container>
        );
    } else {
        display = (
            <Container>
                <Menu borderless inverted>
                    <Menu.Item>
                        { header }
                    </Menu.Item>
                </Menu>

                <LoginForm />
            </Container>
        );
    }

    return (
        display
    );
};

const mapStateToProps = state => ({
    token: state.user.token
});

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logout())
});

BoardPage.propTypes = {
    token: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);