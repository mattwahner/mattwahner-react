import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Modal} from "semantic-ui-react";
import {deleteMessage} from "../actions/messages";
import {connect} from "react-redux";

class EditModal extends React.Component {
    state = {
        arb: '',
        open: false
    };

    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false});

    updateMessage = () => {
        this.props.onUpdate(this.props.id, this.state.arb)
            .then(this.close());
        this.setState({ arb: '' });
    };

    deleteMessage = () => {
        this.props.onDelete(this.props.id);
        this.close();
    };

    render() {
        return (
            <Modal size="tiny"
                   open={this.state.open}
                   onClose={this.close}
                   trigger={<Button basic color="yellow" onClick={this.open}>Edit</Button>}
                   closeOnEscape={false}
            >
                <Modal.Header>
                    Editing...
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.updateMessage}>
                        <Form.Field>
                            <input
                                type="text"
                                placeholder="Location"
                                onChange={e => this.setState({ arb: e.target.value })}
                                value={this.state.arb}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="yellow" onClick={this.updateMessage}>Update</Button>
                    <Button color="red" onClick={this.deleteMessage}>Delete</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onDelete: (id) => dispatch(deleteMessage(id))
});

EditModal.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(EditModal);
