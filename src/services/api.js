import axios from 'axios';

const linkApi = {
  link: 'https://localhost:7137',
};

const api = axios.create({
  baseURL: linkApi.link,
});

export { api };
