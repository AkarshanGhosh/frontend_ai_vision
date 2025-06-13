
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Eye, Zap } from 'lucide-react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Vision
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Cutting-edge artificial intelligence meets computer vision to revolutionize how we see and understand the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6">
                Explore Models
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful AI Vision Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of computer vision with our advanced AI models
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Brain className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-semibold mb-4">Neural Networks</h3>
              <p className="text-muted-foreground">
                Advanced deep learning models trained on massive datasets for superior accuracy
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Eye className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-2xl font-semibold mb-4">Computer Vision</h3>
              <p className="text-muted-foreground">
                Real-time image and video analysis with state-of-the-art precision
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Zap className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-2xl font-semibold mb-4">Fast Processing</h3>
              <p className="text-muted-foreground">
                Lightning-fast inference with optimized models for production use
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Dive into our collection of AI models and discover what's possible with modern computer vision
          </p>
          <Button size="lg" className="text-lg px-8 py-6">
            Explore Our Models
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
