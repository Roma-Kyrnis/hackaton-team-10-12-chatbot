import Axios from 'axios';

import config from '../config';

const axios = Axios.create({ baseURL: config.env.BACKEND_DOMAIN, timeout: 15000 });

// TODO: connect server

export const createUser = async (user: any) => {
  try {
    const res = await axios.post('entities');
    return res.data;
  } catch (error) {
    console.log('Cannot create user because: ');
    console.log(error);
  }
};

export const getRegions = async () => {
  const res = await axios.get<string[]>('handbook/regions');
  return res.data;
};
