import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import {Container, Header} from "semantic-ui-react";

const BoardPage = ({ token }) => {
    let display = null;
    if (token)
        display = <Dashboard />;
    else
        display = <LoginForm />;

    return (
        <Container>
            <Header as="h1">Board Page</Header>

            { display }
        </Container>
    );
};

const mapStateToProps = (state) => ({
    token: state.user.token
});

BoardPage.propTypes = {
    token: PropTypes.string,
};

export default connect(mapStateToProps)(BoardPage);