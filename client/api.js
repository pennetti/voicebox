import axios from 'axios';

export default function addCorpus(text) {
    return axios.post('/src', { text })
        .then(response => response.data);
}
