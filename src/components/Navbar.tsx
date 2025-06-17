import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut, Download, Smartphone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone === true) {
        setIsInstalled(true);
      }
    };

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      toast.success('AI Vision installed successfully!');
    };

    checkIfInstalled();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback for browsers that don't support PWA install
      if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
        toast.info('To install: Tap Share → Add to Home Screen');
      } else if (navigator.userAgent.includes('Android')) {
        toast.info('To install: Tap Menu (⋮) → Add to Home Screen');
      } else {
        toast.info('Install option not available in this browser');
      }
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast.success('Installing AI Vision...');
      } else {
        toast.info('Installation cancelled');
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('Installation failed:', error);
      toast.error('Installation failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Models', path: '/models' },
    { name: 'Blog', path: '/blog' },
    { name: 'About This Project', path: '/about-project' },
    { name: 'About Me', path: '/about-me' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Vision
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Install/Download Button */}
              {!isInstalled && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleInstallClick}
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>{isInstallable ? 'Install' : 'Download'}</span>
                </Button>
              )}

              {isInstalled && (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Smartphone className="h-4 w-4" />
                  <span>Installed</span>
                </div>
              )}

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <Button variant="outline" asChild>
                      <Link to="/admin">Admin</Link>
                    </Button>
                  )}
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>{user?.email}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-6">
                  <Link to="/" className="text-2xl font-bold mb-6">
                    AI Vision
                  </Link>
                  
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-lg font-medium py-2 border-b"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}

                  {/* Mobile Install Button */}
                  <div className="pt-4 border-t">
                    {!isInstalled ? (
                      <Button 
                        onClick={() => {
                          handleInstallClick();
                          setIsOpen(false);
                        }}
                        className="w-full mb-4"
                        variant="outline"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {isInstallable ? 'Install App' : 'Download App'}
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 text-sm text-green-600 mb-4 p-2 bg-green-50 rounded">
                        <Smartphone className="h-4 w-4" />
                        <span>App Installed</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="h-4 w-4" />
                          <span>{user?.email}</span>
                        </div>
                        {isAdmin && (
                          <Button variant="outline" className="w-full" asChild>
                            <Link to="/admin" onClick={() => setIsOpen(false)}>
                              Admin Dashboard
                            </Link>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          className="w-full"
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button variant="ghost" className="w-full" asChild>
                          <Link to="/login" onClick={() => setIsOpen(false)}>
                            Login
                          </Link>
                        </Button>
                        <Button className="w-full" asChild>
                          <Link to="/register" onClick={() => setIsOpen(false)}>
                            Register
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;