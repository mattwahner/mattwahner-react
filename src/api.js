import axios from 'axios';

export default {
    user: {
        login: (password) =>
            axios.post('/api/auth', {password})
                .then(res => res.data.token)
                .catch(error => {
                    if (error.response.data.message)
                        throw error.response.data.message;
                    else
                        throw error.message;
                })
    },
    messages: {
        set: (text) =>
            axios.post('/api/board', { text }),
        createMessage: (text) =>
            axios.post('/api/board/messages', { text })
                .then(res => ({ id: res.data._id, text: res.data.text }))
                .catch(error => {
                    if (error.response.data.error)
                        throw error.response.data.error;
                    else
                        throw error.message;
                }),
        fetchAll: () =>
            axios.get('/api/board/messages')
                .then(res => res.data.map(message => ({ id: message._id, text: message.text })))
                .catch(error => {
                    console.log(error);
                    if (error.response.data)
                        throw error.response.data;
                    else
                        throw error.message;
                }),
        updateMessage: (id, text) =>
            axios.put(`/api/board/messages/${id}`, { text }).then(res => ({ id: res.data._id, text: res.data.text }))
                .catch(error => {
                    if (error.response.data.error)
                        throw error.response.data.error;
                    else
                        throw error.message;
                }),
        deleteMessage: (id) =>
            axios.delete(`/api/board/messages/${id}`)
    }
}
