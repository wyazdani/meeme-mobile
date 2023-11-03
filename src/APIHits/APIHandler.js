var axios = require('axios');
import { checkConnected } from '../utiles/export';
import { PREFIX, LIVEURL, STAGINGURL } from '@env';
const localHost = 'http://192.168.11.133:3000/';

export const HitApi = async (url, apiMethod, params, token) => {
  console.log('URL>.', LIVEURL + PREFIX + url)
  const connection = await checkConnected();

  if (connection) {
    var options = {
      method: apiMethod,
      url: `${LIVEURL + PREFIX + url}`,
      maxBodyLength: Infinity,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
      data: params,
    };
    try {
      var response = await axios(options);

      let obj = {
        status: response?.status || 0,
        data: response?.data || null,
        message: response?.data?.message,
      };

      return obj;
    } catch (err) {
      const { message } = err;

      let obj;
      if (message == 'Network Error') {
        obj = {
          status: 0,
          message: 'Server is down',
        };
      } else {
        obj = {
          status: err?.response?.status || 0,
          message: err?.response?.data?.message || 'Something wrong try again',
        };
      }

      return obj;
    }
  } else {
    let obj = {
      status: 0,
      message: 'Network is not available',
    };
    return obj;
  }
};
