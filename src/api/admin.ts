import { api } from './config';

export const adminAPI = {
  getUsers: () => api.get('/admin/users'),

  addUser: (userData: { email: string; password: string; isAdmin?: boolean }) =>
    api.post('/admin/users', userData),

  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),

  updateUserPassword: (id: string, password: string) =>
    api.put(`/admin/users/${id}/password`, { password }),

  // ✅ New unified update user API
  updateUser: (
  id: string,
  data: { username?: string; password?: string }
) => api.put(`/admin/users/${id}`, data),
  getStats: () => api.get('/admin/users/stats'),
};
