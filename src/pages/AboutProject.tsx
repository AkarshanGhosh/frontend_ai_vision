
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';

const AboutProject = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About This Project
          </h1>
          <p className="text-xl text-muted-foreground">
            A modern web application showcasing AI vision capabilities with a full-stack architecture
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                Frontend Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">React Router</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Built with modern React and TypeScript for type safety and developer experience.
                  Styled with Tailwind CSS for rapid UI development.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Backend & API
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Flask</Badge>
                  <Badge variant="secondary">JWT Auth</Badge>
                  <Badge variant="secondary">REST API</Badge>
                  <Badge variant="secondary">SQLite</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  RESTful API built with Flask, featuring JWT authentication and database management
                  for users and blog content.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Authentication System</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• User registration and login</li>
                  <li>• JWT token-based authentication</li>
                  <li>• Protected admin routes</li>
                  <li>• Role-based access control</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Content Management</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Blog creation and editing</li>
                  <li>• User management dashboard</li>
                  <li>• Dynamic content rendering</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Modern Development Practices</h4>
                <p className="text-sm text-muted-foreground">
                  This project demonstrates contemporary web development practices including component-based architecture,
                  state management with React Query, and responsive design principles.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">UI/UX Design</h4>
                <p className="text-sm text-muted-foreground">
                  Clean, modern interface built with shadcn/ui components and Tailwind CSS.
                  Features smooth animations, mobile-first responsive design, and accessible components.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutProject;
