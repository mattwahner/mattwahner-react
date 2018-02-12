import axios from 'axios';

export default {
    user: {
        login: (password) => {
            return axios.post('/api/auth', {password})
                .then(res => res.data.token)
                .catch(error => {
                    if (error.response.data.message)
                        throw error.response.data.message;
                    else
                        throw error.message;
                })
        }
    }
}
