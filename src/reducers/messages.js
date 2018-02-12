import {MESSAGE_CREATED, MESSAGE_DELETED, MESSAGE_UPDATED, MESSAGES_FETCHED} from "../types";

const messages = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case MESSAGE_CREATED:
            return [ ...state, {
                id: action.id,
                text: action.text
            }];
        case MESSAGES_FETCHED:
            return action.messages;
        case MESSAGE_UPDATED:
            return state.map(message =>
                (message.id === action.id)
                ? { ...message, text: action.text}
                : message);
        case MESSAGE_DELETED:
            return state.filter(message => message.id !== action.id);
        default:
            return state;
    }
};

export default messages;
