import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, User, ArrowLeft, Edit } from 'lucide-react';
import { blogAPI } from '../api/blog';
import { useAuth } from '../contexts/AuthContext';
import { format, isValid, parseISO } from 'date-fns';

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isAdmin } = useAuth();

  // Helper function to safely format dates
  const formatDate = (dateString: string, formatString: string = 'MMM d, yyyy') => {
    if (!dateString) return 'No date';
    
    const date = new Date(dateString);
    
    // If the date is invalid, try parsing as ISO string
    if (!isValid(date)) {
      const isoDate = parseISO(dateString);
      if (isValid(isoDate)) {
        return format(isoDate, formatString);
      }
      return 'Invalid date';
    }
    
    return format(date, formatString);
  };

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const res = await blogAPI.getBlog(id!);
      const raw = res.data.blog || res.data; // Handle both nested and direct response
      
      // Normalize the data structure from snake_case to camelCase
      return {
        id: raw.id,
        title: raw.title,
        content: raw.content,
        author: raw.author || raw.author_name || 'Unknown Author',
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        excerpt: raw.excerpt
      };
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-24 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  console.log('Blog data:', blog); // Debug log to see the actual data structure

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <CardTitle className="text-3xl md:text-4xl mb-4">
                  {blog.title}
                </CardTitle>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(blog.createdAt, 'MMMM d, yyyy')}</span>
                  </div>
                  {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                    <div className="text-sm">
                      Updated: {formatDate(blog.updatedAt)}
                    </div>
                  )}
                </div>
              </div>
              
              {isAdmin && (
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/admin/blog/edit/${blog.id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {blog.content && blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogDetails;