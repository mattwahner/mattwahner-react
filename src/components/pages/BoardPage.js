import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from "../forms/LoginForm";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const BoardPage = ({ token, onLogout }) => {
    let display = null;
    if (token)
        display = <button onClick={onLogout}>Logout</button>;
    else
        display = <LoginForm />;

    return (
        <div>
            <h1>Board Page</h1>

            { display }
        </div>
    );
};

const mapStateToProps = (state) => ({
    token: state.user.token
});

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(logout())
});

BoardPage.propTypes = {
    token: PropTypes.string,
    onLogout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);