import axios from "axios";

export function createTopic(topic) {
    return axios.post('http://localhost:8000/topics/createTopic', topic, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // console.log(response.data)
        return response.data;
      })
      .catch((error) => {
        throw error; // Rethrow the error to propagate it
      });
  }

export function getTopics() {
    return axios.get('http://localhost:8000/topics')
      .then((response) => {
        console.log("Api",response.data)
        return response.data;
      })
      .catch((error) => {
        throw error; // Rethrow the error to propagate it
      });
  }

export function deleteTopic(id) {
    return axios.delete(`http://localhost:8000/topics/deleteTopic/${id}`)
      .then((response) => {
        // console.log("languageApi",response.data)
        return response.data;
      })
      .catch((error) => {
        throw error; // Rethrow the error to propagate it
      });
  }


export function editTopic(id, data) {
    console.log(id, data)
    return axios.put(`http://localhost:8000/topics/updateTopic/${id}`, data)
      .then((response) => {
        // console.log("languageApi",response.data)
        return response.data;
      })
      .catch((error) => {
        throw error; // Rethrow the error to propagate it
      });
  }

