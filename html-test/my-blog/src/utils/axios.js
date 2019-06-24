const axios = require('axios')
import {
  Message
} from 'element-ui'

const get = (url, params = {}) => {
  console.log(url, params)
  let p = {
    params: params
  }
  return axios.get(url, p)
    .then(intercepter)
    .catch(error => {
      Message({
        message: error,
        type: 'error'
      });

    })
}
const post = (url, params) => {
  let p = {
    params: params
  }
  return axios({
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: params
    })
    .then(intercepter)
    .catch(error => {
      Message({
        message: error,
        type: 'error'
      });
    })

  // return axios.post(url, p)
  //   .then(intercepter)
  //   .catch(error => {
  //     Message({
  //       message: error,
  //       type: 'error'
  //     });
  //   })
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
    return response.data
  }
  return response.data
}

module.exports = {
  get,
  post
}
