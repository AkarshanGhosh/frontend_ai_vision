import { useState, useEffect } from 'react';
import { Menu, User, LogOut, Download, Smartphone, X } from 'lucide-react';

const PWANavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showToast, setShowToast] = useState('');
  
  // Mock auth state for demo
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({ email: 'user@example.com' });

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
      console.log('PWA install prompt available');
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      showToastMessage('AI Vision installed successfully!', 'success');
    };

    checkIfInstalled();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Simulate PWA availability after 2 seconds for demo
    setTimeout(() => {
      if (!isInstalled) {
        setIsInstallable(true);
        setDeferredPrompt({ 
          prompt: () => Promise.resolve(),
          userChoice: Promise.resolve({ outcome: 'accepted' })
        });
      }
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const showToastMessage = (message, type = 'info') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(''), 3000);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback for browsers that don't support PWA install
      const userAgent = navigator.userAgent;
      if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        showToastMessage('To install: Tap Share → Add to Home Screen', 'info');
      } else if (userAgent.includes('Android')) {
        showToastMessage('To install: Tap Menu (⋮) → Add to Home Screen', 'info');
      } else {
        showToastMessage('Install option not available in this browser', 'info');
      }
      return;
    }

    try {
      if (deferredPrompt.prompt) {
        await deferredPrompt.prompt();
      }
      
      const result = await deferredPrompt.userChoice;
      
      if (result.outcome === 'accepted') {
        showToastMessage('Installing AI Vision...', 'success');
        // Simulate installation for demo
        setTimeout(() => {
          setIsInstalled(true);
          setIsInstallable(false);
          setDeferredPrompt(null);
        }, 1500);
      } else {
        showToastMessage('Installation cancelled', 'info');
      }
      
    } catch (error) {
      console.error('Installation failed:', error);
      showToastMessage('Installation failed', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    showToastMessage('Logged out successfully', 'success');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    showToastMessage('Logged in successfully', 'success');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Models', path: '/models' },
    { name: 'Blog', path: '/blog' },
    { name: 'About Project', path: '/about-project' },
    { name: 'About Me', path: '/about-me' },
  ];

  const Toast = ({ message, type }) => {
    if (!message) return null;
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    return (
      <div className={`fixed top-20 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300`}>
        {message}
      </div>
    );
  };

  return (
    <>
      <Toast message={showToast.message} type={showToast.type} />
      
      <nav className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Vision
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  className="text-sm font-medium transition-colors hover:text-blue-600 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Install/Download Button */}
              {!isInstalled && (
                <button 
                  onClick={handleInstallClick}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={!isInstallable}
                >
                  <Download className="h-4 w-4" />
                  <span>{isInstallable ? 'Install App' : 'Loading...'}</span>
                </button>
              )}

              {isInstalled && (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Smartphone className="h-4 w-4" />
                  <span>App Installed</span>
                </div>
              )}

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                      Admin
                    </button>
                  )}
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>{user?.email}</span>
                  </div>
                  <button onClick={handleLogout} className="p-1.5 hover:bg-gray-100 rounded">
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleLogin}
                    className="px-3 py-1.5 text-sm hover:bg-gray-100 rounded"
                  >
                    Login
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Register
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-[300px] bg-white shadow-xl">
            <div className="flex flex-col p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold">AI Vision</div>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  className="text-left text-lg font-medium py-3 border-b border-gray-100 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </button>
              ))}

              {/* Mobile Install Button */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                {!isInstalled ? (
                  <button 
                    onClick={() => {
                      handleInstallClick();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 mb-4"
                    disabled={!isInstallable}
                  >
                    <Download className="h-4 w-4" />
                    <span>{isInstallable ? 'Install App' : 'Loading...'}</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-sm text-green-600 mb-4 p-2 bg-green-50 rounded">
                    <Smartphone className="h-4 w-4" />
                    <span>App Installed</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4" />
                      <span>{user?.email}</span>
                    </div>
                    {isAdmin && (
                      <button className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button 
                      onClick={() => {
                        handleLogin();
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      Login
                    </button>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 m-4">
        <h3 className="font-semibold text-blue-900 mb-2">PWA Install Demo</h3>
        <p className="text-blue-800 text-sm mb-2">
          This demo shows how the PWA install feature works. The install button will appear after 2 seconds.
        </p>
        <p className="text-blue-700 text-xs">
          In a real PWA, the install button only appears when the browser detects your app meets PWA requirements and the user hasn't already installed it.
        </p>
      </div>
    </>
  );
};

export default PWANavbar;