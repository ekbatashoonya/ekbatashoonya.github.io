import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ModeProvider } from "@/contexts/ModeContext";
import { MainLayout } from "@/components/layout";
import { InterestPopup } from "@/components/InterestPopup";
import { getSavedMode, DEFAULT_MODE } from "@/lib/modes";

// Pages
import { HomePage } from "@/pages/HomePage";
import { CoursesPage } from "@/pages/CoursesPage";
import { CourseOverviewPage } from "@/pages/CourseOverviewPage";
import { LecturePage } from "@/pages/LecturePage";
import { NotesPage } from "@/pages/NotesPage";
import { BlogPage } from "@/pages/BlogPage";
import { BlogPostPage } from "@/pages/BlogPostPage";
import { AboutPage } from "@/pages/AboutPage";
import { NotAvailablePage } from "@/pages/NotAvailablePage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { TermsPage } from "@/pages/TermsPage";
import { ContactPage } from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";
import { RegisterInterestPage } from "@/pages/RegisterInterestPage";

const queryClient = new QueryClient();

// Component to handle root redirect
function RootRedirect() {
  const savedMode = getSavedMode() || DEFAULT_MODE;
  return <Navigate to={`/${savedMode}/`} replace />;
}

// Wrapper component that provides mode-specific routes
function ModeRoutes() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<RootRedirect />} />
      
      {/* Mode-prefixed routes */}
      <Route path="/:mode" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:courseSlug" element={<CourseOverviewPage />} />
        <Route path="courses/:courseSlug/:lectureSlug" element={<LecturePage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="register" element={<RegisterInterestPage />} />
        <Route path="*" element={<NotAvailablePage />} />
      </Route>

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/**
 * Router-agnostic application tree. Must be rendered inside a react-router
 * Router: BrowserRouter in the browser (see App) or StaticRouter at build
 * time (see entry-server.tsx, used to prerender each route to static HTML).
 */
export function AppShell() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ModeProvider>
          <InterestPopup />
          <ModeRoutes />
        </ModeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
