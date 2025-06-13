import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { blogAPI } from '../api/blog';
import { toast } from 'sonner';

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  // Initialize with empty strings to prevent controlled/uncontrolled input warnings
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('');
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const res = await blogAPI.getBlog(id!);
      const raw = res.data.blog || res.data;
      
      // Normalize the data structure from snake_case to camelCase
      return {
        id: raw.id,
        title: raw.title || '',
        content: raw.content || '',
        author: raw.author || raw.author_name || '',
        excerpt: raw.excerpt || '',
        createdAt: raw.created_at,
        updatedAt: raw.updated_at
      };
    },
    enabled: !!id,
  });

  const updateBlogMutation = useMutation({
    mutationFn: (blogData: { title: string; content: string; excerpt: string; author: string }) =>
      blogAPI.updateBlog(id!, blogData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog', id] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog post updated successfully!');
      navigate('/admin');
    },
    onError: (error) => {
      console.error('Update error:', error);
      toast.error('Failed to update blog post');
    },
  });

  // Update form fields when blog data is loaded
  useEffect(() => {
    if (blog && !isFormInitialized) {
      setTitle(blog.title || '');
      setContent(blog.content || '');
      setExcerpt(blog.excerpt || '');
      setAuthor(blog.author || '');
      setIsFormInitialized(true);
    }
  }, [blog, isFormInitialized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure all values are strings with fallbacks
    const titleValue = title || '';
    const contentValue = content || '';
    const authorValue = author || '';
    const excerptValue = excerpt || '';

    if (!titleValue.trim() || !contentValue.trim() || !authorValue.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const blogData = {
      title: titleValue.trim(),
      content: contentValue.trim(),
      excerpt: excerptValue.trim() || contentValue.trim().substring(0, 150) + '...',
      author: authorValue.trim(),
    };

    updateBlogMutation.mutate(blogData);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Skeleton className="h-8 w-32 mb-6" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're trying to edit doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter blog post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Enter a brief excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Write your blog post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={updateBlogMutation.isPending}
                  className="flex-1"
                >
                  {updateBlogMutation.isPending ? 'Updating...' : 'Update Post'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin')}
                  disabled={updateBlogMutation.isPending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditBlog;