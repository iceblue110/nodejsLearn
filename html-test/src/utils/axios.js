const axios = require('axios')
import {
  Message
} from 'element-ui'

const get = (url, params = {}) => {
  return axios.get(url, params)
    .then(intercepter)
    .catch(error => {
      Message({
        message: error,
        type: 'error'
      });

    })
}
const post = (url, params = {}) => {
  return axios(url, params)
    .then(intercepter)
    .catch(error => {
      Message({
        message: error,
        type: 'error'
      });
    })
}

/* 拦截器 */
function intercepter(response) {
  if (response.status != '200') {
    Message({
      message: response.statusText,
      type: 'error'
    });

    return {};
  }

  if (response.data.errno == '-1') {
    Message({
      message: response.data.message,
      type: 'error'
    });
    return {};
  }
  return response.data
}

module.exports = {
  get,
  post
}
