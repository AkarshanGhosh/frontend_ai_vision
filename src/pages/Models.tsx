
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Eye, Image, Video, Camera, Zap } from 'lucide-react';

const Models = () => {
  const models = [
    {
      id: 1,
      name: "Object Detection",
      description: "Real-time object detection and classification in images and video streams.",
      icon: Eye,
      status: "Available",
      accuracy: "95.2%",
      tags: ["Computer Vision", "Real-time", "YOLO"],
      features: ["Multi-object detection", "Bounding box prediction", "Real-time processing"]
    },
    {
      id: 2,
      name: "Image Classification",
      description: "Advanced image classification with support for thousands of object categories.",
      icon: Image,
      status: "Available",
      accuracy: "97.8%",
      tags: ["Classification", "Deep Learning", "ResNet"],
      features: ["1000+ categories", "Transfer learning", "Batch processing"]
    },
    {
      id: 3,
      name: "Facial Recognition",
      description: "Accurate facial detection and recognition system with privacy protection.",
      icon: Camera,
      status: "Coming Soon",
      accuracy: "99.1%",
      tags: ["Biometrics", "Security", "Privacy"],
      features: ["Face detection", "Identity verification", "Privacy compliant"]
    },
    {
      id: 4,
      name: "Video Analysis",
      description: "Comprehensive video content analysis including action recognition and tracking.",
      icon: Video,
      status: "Beta",
      accuracy: "92.5%",
      tags: ["Video", "Temporal", "Action Recognition"],
      features: ["Motion tracking", "Action classification", "Scene analysis"]
    },
    {
      id: 5,
      name: "Optical Character Recognition",
      description: "Extract and digitize text from images with high accuracy and multiple language support.",
      icon: Brain,
      status: "Available",
      accuracy: "98.5%",
      tags: ["OCR", "Text", "Multi-language"],
      features: ["Multi-language support", "Handwriting recognition", "Document processing"]
    },
    {
      id: 6,
      name: "Edge AI Optimization",
      description: "Optimized models for edge deployment with minimal latency and resource usage.",
      icon: Zap,
      status: "Coming Soon",
      accuracy: "94.0%",
      tags: ["Edge Computing", "Optimization", "Mobile"],
      features: ["Low latency", "Mobile optimized", "Efficient inference"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Beta":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Coming Soon":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Models
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our collection of state-of-the-art AI vision models, each optimized for specific use cases
          and designed to deliver exceptional performance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => {
          const IconComponent = model.icon;
          return (
            <Card key={model.id} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                  <Badge className={getStatusColor(model.status)}>
                    {model.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{model.name}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Accuracy: <span className="font-semibold text-green-600">{model.accuracy}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{model.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {model.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {model.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full" 
                    disabled={model.status === "Coming Soon"}
                    variant={model.status === "Available" ? "default" : "secondary"}
                  >
                    {model.status === "Available" ? "Try Model" : 
                     model.status === "Beta" ? "Join Beta" : "Notify Me"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Custom Model Development</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Need a specialized AI model for your specific use case? We offer custom model development
              and training services tailored to your requirements.
            </p>
            <Button size="lg">
              Contact Us for Custom Solutions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Models;
