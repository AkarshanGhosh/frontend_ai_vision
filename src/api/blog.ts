
import { api } from './config';

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export const blogAPI = {
  getBlogs: async () => {
  const res = await api.get('/blog/blogs');
  return res.data?.blogs || []; // ✅ Ensure it always returns an array
},
  
  getBlog: (id: string) => api.get(`/blog/blogs/${id}`),
  
  createBlog: (blogData: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post('/blog/blogs', blogData),
  
  updateBlog: (id: string, blogData: Partial<Blog>) =>
    api.put(`/blog/blogs/${id}`, blogData),
  
  deleteBlog: (id: string) => api.delete(`/blog/blogs/${id}`),
};
