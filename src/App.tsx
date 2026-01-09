import { useState, useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteSettingsProvider } from "./contexts/SiteSettingsContext";
import { DynamicHead } from "./components/DynamicHead";

// Lazy load all pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const FeaturesPage = lazy(() =>
  import("./components/features/features-page/FeaturesPage").then((m) => ({
    default: m.FeaturesPage,
  }))
);
const BlogPage = lazy(() =>
  import("./components/blogs/BlogPage").then((m) => ({ default: m.BlogPage }))
);
const AboutPage = lazy(() => import("./pages/AboutPage"));
const DebugFeaturesAPI = lazy(() => import("./pages/DebugFeaturesApi"));
const DebugLandingAPI = lazy(() => import("./pages/DebugLandingApi"));
const Maverick = lazy(() => import("./components/salespage/Maverick"));
const ImageGallery = lazy(() => import("./components/gallery/ImageGallery"));
const AffiliateDashboard = lazy(() => import("./components/landingpage/AffiliateDashboard"));
const TeamPage = lazy(() => import("./components/teams/TeamPage"));

// Loading component
const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "var(--color-background)",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "3px solid var(--color-primary)",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function AppContent() {
  const [currentView, setCurrentView] = useState<{
    type:
      | "landing"
      | "features"
      | "blog"
      | "about"
      | "debug-features"
      | "debug-landing"
      | "salespage"
      | "gallery"
      | "affiliate"
      | "team";
    slug?: string;
  }>({ type: "landing" });

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (
        path.includes("/debug-features") ||
        hash.includes("#debug-features")
      ) {
        setCurrentView({ type: "debug-features" });
        return;
      }

      if (path.includes("/debug-landing") || hash.includes("#debug-landing")) {
        setCurrentView({ type: "debug-landing" });
        return;
      }

      if (path.includes("/debug") || hash.includes("#debug")) {
        setCurrentView({ type: "debug-features" });
        return;
      }

      if (path.includes("/blog/") || hash.includes("#blog/")) {
        const slugMatch =
          path.match(/\/blog\/([^\/]+)/) || hash.match(/#blog\/([^\/]+)/);

        if (slugMatch && slugMatch[1]) {
          setCurrentView({ type: "blog", slug: slugMatch[1] });
        } else {
          setCurrentView({ type: "blog" });
        }
        return;
      }

      if (path.includes("/blog") || hash.includes("#blog")) {
        setCurrentView({ type: "blog" });
        return;
      }

      if (path.includes("/about/") || hash.includes("#about/")) {
        const slugMatch =
          path.match(/\/about\/([^\/]+)/) || hash.match(/#about\/([^\/]+)/);
        if (slugMatch && slugMatch[1]) {
          setCurrentView({ type: "about", slug: slugMatch[1] });
        } else {
          setCurrentView({ type: "about" });
        }
        return;
      }

      if (path.includes("/about") || hash.includes("#about")) {
        setCurrentView({ type: "about" });
        return;
      }

      if (path.includes("/salespage") || hash.includes("#salespage")) {
        setCurrentView({ type: "salespage" });
        return;
      }

      if (path.includes("/gallery") || hash.includes("#gallery")) {
        setCurrentView({ type: "gallery" });
        return;
      }

      if (path.includes("/affiliate") || hash.includes("#affiliate")) {
        setCurrentView({ type: "affiliate" });
        return;
      }

      if (path.includes("/team") || hash.includes("#team")) {
        setCurrentView({ type: "team" });
        return;
      }

      if (path.includes("/features/") || hash.includes("#features/")) {
        const slugMatch =
          path.match(/\/features\/([^\/]+)/) ||
          hash.match(/#features\/([^\/]+)/);

        if (slugMatch && slugMatch[1]) {
          setCurrentView({ type: "features", slug: slugMatch[1] });
        } else {
          //localhost:4173/
          http: setCurrentView({ type: "features", slug: "sales-marketing" });
        }
        return;
      }

      setCurrentView({ type: "landing" });
    };

    checkRoute();

    window.addEventListener("hashchange", checkRoute);
    window.addEventListener("popstate", checkRoute);

    return () => {
      window.removeEventListener("hashchange", checkRoute);
      window.removeEventListener("popstate", checkRoute);
    };
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <ThemeProvider>
        {currentView.type === "blog" && <BlogPage slug={currentView.slug} />}
        {currentView.type === "features" && (
          <FeaturesPage slug={currentView.slug} />
        )}
        {currentView.type === "debug-features" && <DebugFeaturesAPI />}
        {currentView.type === "debug-landing" && <DebugLandingAPI />}
        {currentView.type === "about" && <AboutPage slug={currentView.slug} />}
        {currentView.type === "salespage" && <Maverick />}
        {currentView.type === "gallery" && <ImageGallery />}
        {currentView.type === "affiliate" && <AffiliateDashboard />}
        {currentView.type === "team" && <TeamPage />}
        {currentView.type === "landing" && <LandingPage />}
      </ThemeProvider>
    </Suspense>
  );
}

function App() {
  return (
    <SiteSettingsProvider>
      <DynamicHead />
      <AppContent />
    </SiteSettingsProvider>
  );
}

export default App;
