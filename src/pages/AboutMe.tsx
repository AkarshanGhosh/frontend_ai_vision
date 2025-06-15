import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

const AboutMe = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground">
            Passionate developer exploring the intersection of AI and web technologies
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Background</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Hi, my name is Akarshan Ghosh. I am currently pursuing a Bachelor's degree in Electronics and Telecommunication Engineering. I am deeply passionate about both hardware and software development, and have completed numerous projects in the fields of IoT, robotics, machine learning, and full-stack web development.
                </p>
                <p className="text-muted-foreground">
                  This project represents my exploration into modern web development practices and AI integration. With a strong focus on clean code, user experience, and cutting-edge technology, I enjoy building applications that are both functional and visually engaging. My goal is to bridge the gap between complex AI systems and intuitive user interfaces.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-3">
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="mailto:akarshanghosh28@gmail.com">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="https://www.linkedin.com/in/akarshan-ghosh/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="https://github.com/AkarshanGhosh" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Technical Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Frontend Development</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Framer Motion</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Backend Development</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">Flask</Badge>
                  <Badge variant="secondary">FastAPI</Badge>
                  <Badge variant="secondary">Mongo DB</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">AI & Machine Learning</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">TensorFlow</Badge>
                  <Badge variant="secondary">PyTorch</Badge>
                  <Badge variant="secondary">OpenCV</Badge>
                  <Badge variant="secondary">Computer Vision</Badge>
                  <Badge variant="secondary">Neural Networks</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                The AI Vision project serves as a unified platform to showcase the functionality of multiple AI models in one place while delivering an optimal user experience.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Integration of multiple open-source AI models</li>
                <li>A user-friendly and responsive interface</li>
                <li>Robust content management capabilities</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutMe;
