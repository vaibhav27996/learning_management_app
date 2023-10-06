import axios from "axios";

export function createSubscription(subscription) {
    return axios.post('http://localhost:8000/subscriptions/createSubscription', subscription, {
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

export function getSubscriptions() {
    return axios.get('http://localhost:8000/subscriptions')
      .then((response) => {
        console.log(response)
        console.log("Api",response.data)
        return response.data;
      })
      .catch((error) => {
        throw error; // Rethrow the error to propagate it
      });
  }

export function deleteSubscription(id) {
    return axios.delete(`http://localhost:8000/subscriptions/deleteSubscription/${id}`)
      .then((response) => {
        // console.log("languageApi",response.data)
        return response.data;
      })
      .catch((error) => {
        throw error; // Rethrow the error to propagate it
      });
  }


export function editSubscription(id, data) {
    console.log(id, data)
    return axios.put(`http://localhost:8000/subscriptions/updateSubscription/${id}`, data)
      .then((response) => {
        // console.log("languageApi",response.data)
        return response.data;
      })
      .catch((error) => {
        throw error; // Rethrow the error to propagate it
      });
  }

