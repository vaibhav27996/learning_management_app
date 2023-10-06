import axios from "axios";

export function createLanguage(language) {
    return axios.post('http://localhost:8000/languages/createLanguage', language, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error; 
      });
  }

export function getLanguage() {
    return axios.get('http://localhost:8000/languages')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error; // Rethrow the error to propagate it
      });
  }

export function deleteLanguage(id) {
    return axios.delete(`http://localhost:8000/languages/deleteLanguage/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error; // Rethrow the error to propagate it
      });
  }


export function editLanguage(id, data) {
    console.log(id, data)
    return axios.put(`http://localhost:8000/languages/updateLanguage/${id}`, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error; // Rethrow the error to propagate it
      });
  }

