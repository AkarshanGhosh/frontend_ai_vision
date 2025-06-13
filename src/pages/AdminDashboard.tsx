import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, FileText, Plus, Trash2, Edit, Settings } from 'lucide-react';
import { adminAPI } from '../api/admin';
import { blogAPI, Blog } from '../api/blog';
import { toast } from 'sonner';
import EditUserModal from '@/components/EditUserModal';
import { format, isValid, parseISO } from 'date-fns';

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<any>(null);

  // Helper function to safely format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date';
    
    const date = new Date(dateString);
    
    // If the date is invalid, try parsing as ISO string
    if (!isValid(date)) {
      const isoDate = parseISO(dateString);
      if (isValid(isoDate)) {
        return format(isoDate, 'MMM d, yyyy');
      }
      return 'Invalid date';
    }
    
    return format(date, 'MMM d, yyyy');
  };

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminAPI.getStats().then(res => res.data),
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => adminAPI.getUsers().then(res => res.data),
  });

  const { data: blogs, isLoading: blogsLoading } = useQuery({
    queryKey: ['admin-blogs'],
    queryFn: () => blogAPI.getBlogs().then(res => res.data),
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id: string) => blogAPI.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
      toast.success('Blog post deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete blog post');
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => adminAPI.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'], exact: true });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'], exact: true });
      toast.success('User deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUserMutation.mutate(id);
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users, content, and monitor site activity</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {blogsLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{blogs?.length || 0}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Online Users</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{stats?.onlineUsers || 0}</div>}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Blog Management */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Blog Management</CardTitle>
            <Button asChild>
              <Link to="/admin/blog/add">
                <Plus className="h-4 w-4 mr-2" />
                Add Post
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {blogsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                ))}
              </div>
            ) : blogs && blogs.length > 0 ? (
              <div className="space-y-4">
                {blogs.slice(0, 5).map((blog: Blog) => (
                  <div key={blog.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-1">{blog.title}</h4>
                      <p className="text-sm text-muted-foreground">by {blog.author}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/blog/edit/${blog.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteBlogMutation.mutate(blog.id)}
                        disabled={deleteBlogMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No blog posts yet</p>
            )}
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                ))}
              </div>
            ) : users && users.length > 0 ? (
              <div className="space-y-4">
                {users.slice(0, 5).map((user: any) => (
                  <div key={user.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.email}</span>
                        {user.is_admin && <Badge variant="secondary">Admin</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Joined: {formatDate(user.created_at)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={deleteUserMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No users found</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={!!editingUser}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={async (userId, newUsername, newPassword) => {
          try {
            const updateData: any = {};
            if (newUsername) updateData.username = newUsername;
            if (newPassword) updateData.password = newPassword;

            if (Object.keys(updateData).length === 0) {
              toast.info('Nothing to update');
              return;
            }

            await adminAPI.updateUser(userId, updateData);
            toast.success('User updated successfully');
            setEditingUser(null);
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
          } catch (err) {
            toast.error('Failed to update user');
          }
        }}
      />
    </div>
  );
};

export default AdminDashboard;