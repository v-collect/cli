const axios = require('axios');

axios.interceptors.response.use(res=>res.data);


async function fetchRepoList(){
    return axios.get(`https://api.github.com/repos/vincent-cy/question`)
}

async function fetchTagList(repo){
    return axios.get(`https://api.github.com/repos/vincent-cy/${repo}/tags`)
}

module.exports = {
    fetchRepoList,
    fetchTagList
}