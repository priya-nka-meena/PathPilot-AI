import api from './api';

const authService = {
  async register({ fullName, email, password }) {
    const payload = { full_name: fullName, email, password };
    const res = await api.post('/auth/register/', payload);
    return res.data;
  },

  async login({ email, password }) {
    const res = await api.post('/auth/login/', { email, password });
    // store tokens in localStorage (MVP)
    if (res.data?.access) {
      localStorage.setItem('access', res.data.access);
    }
    if (res.data?.refresh) {
      localStorage.setItem('refresh', res.data.refresh);
    }
    return res.data;
  },

  async logout() {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return;
    await api.post('/auth/logout/', { refresh });
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  },

  getAccessToken() {
    return localStorage.getItem('access');
  },
};

export default authService;
