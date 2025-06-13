
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DownloadModal from "./components/DownloadModal";
import Home from "./pages/Home";
import AboutProject from "./pages/AboutProject";
import AboutMe from "./pages/AboutMe";
import Models from "./pages/Models";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-background text-foreground">
              <Navbar />
              <DownloadModal />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about-project" element={<AboutProject />} />
                  <Route path="/about-me" element={<AboutMe />} />
                  <Route path="/models" element={<Models />} />
                  <Route path="/blog" element={<BlogList />} />
                  <Route path="/blog/:id" element={<BlogDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/blog/add"
                    element={
                      <ProtectedRoute>
                        <AddBlog />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/blog/edit/:id"
                    element={
                      <ProtectedRoute>
                        <EditBlog />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </AuthProvider>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
