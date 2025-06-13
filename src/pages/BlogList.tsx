import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogAPI, Blog } from '../api/blog';
import { format, isValid, parseISO } from 'date-fns';

const BlogList = () => {
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
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogAPI.getBlogs, // ✅ Remove the .then(res => res.data) part
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground mb-8">Unable to load blog posts. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Insights, tutorials, and updates from the world of AI and computer vision
        </p>
      </div>

      {blogs && blogs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog: Blog) => (
            <Card key={blog.id} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {blog.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(blog.createdAt)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
                
                <div className="flex justify-between items-center pt-4">
                  <Badge variant="secondary">AI Vision</Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/blog/${blog.id}`}>
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold mb-4">No blog posts yet</h3>
          <p className="text-muted-foreground">
            Check back soon for insights and updates about AI Vision.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogList;