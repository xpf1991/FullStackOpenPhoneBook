import axios from 'axios'

const url = 'http://localhost:3001/Persons'

const getAll = () => {
    return axios.get(url).then(response => response.data)
}

const addPerson = (newPerson) => {
    return axios.post(url, newPerson).then(response => response.data)
}

const changeInfo = (id, newPersonInfo) => {
    return axios.put(`${url}/${id}`, newPersonInfo).then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${url}/${id}`).then(response => response.data)
}

export default { getAll, addPerson, changeInfo, deletePerson }