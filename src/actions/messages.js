import {CURRENT_MESSAGE, MESSAGE_CREATED, MESSAGE_DELETED, MESSAGE_UPDATED, MESSAGES_FETCHED} from "../types";
import api from "../api";

export const currentMessage = text => ({
    type: CURRENT_MESSAGE,
    text
});

export const setMessage = (text) =>
    api.messages.set(text);

export const messageCreated = (id, text) => ({
    type: MESSAGE_CREATED,
    id,
    text
});

export const createMessage = text => dispatch =>
    api.messages.createMessage(text).then(message => dispatch(messageCreated(message.id, message.text)));

export const messagesFetched = (messages) => ({
    type: MESSAGES_FETCHED,
    messages
});

export const fetchMessages = () => dispatch =>
    api.messages.fetchAll().then(messages => dispatch(messagesFetched(messages)));

export const messageUpdated = (id, text) => ({
    type: MESSAGE_UPDATED,
    id,
    text
});

export const updateMessage = (id, text) => dispatch =>
    api.messages.updateMessage(id, text).then(message => dispatch(messageUpdated(message.id, message.text)));

export const messageDeleted = (id) => ({
    type: MESSAGE_DELETED,
    id
});

export const deleteMessage = id => dispatch =>
    api.messages.deleteMessage(id).then(message => dispatch(messageDeleted(id)));
