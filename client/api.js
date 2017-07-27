import axios from 'axios';

export default function addCorpus(text) {
    return axios.post('/voicebox', { text })
        .then(response => response.data);
}
