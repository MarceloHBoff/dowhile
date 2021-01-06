import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default {
  searchUsers: async (q = '') => {
    try {
      const response = await api.get('/search/users', { params: { q } });
      return response.data;
    } catch {
      throw new Error('Search users failed');
    }
  },

  getUserByUsername: async (username = '') => {
    try {
      const response = await api.get(`/users/${username}`);
      return response.data;
    } catch {
      throw new Error('Github get user by username error');
    }
  },
};
