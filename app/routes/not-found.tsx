import type { Route } from "./+types/not-found";
import { Link } from "react-router";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/Button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 - Page Not Found - Anikii" },
    { name: "description", content: "The page you're looking for doesn't exist." },
  ];
}

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold" style={{ color: 'var(--color-primary)' }}>404</h1>
            <h2 className="text-3xl font-semibold mt-4 mb-2" style={{ color: 'var(--color-base-content)' }}>Page Not Found</h2>
            <p className="text-lg max-w-md" style={{ color: 'var(--color-base-content)/70' }}>
              Oops! The page you're looking for seems to have vanished into the animeverse. 
              Don't worry, we'll help you find your way back.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              to="/"
              className="shadow-xl"
            >
              Return Home
            </Button>
            
            <div className="mt-8">
              <p className="text-sm mb-4" style={{ color: 'var(--color-base-content)/60' }}>
                Looking for something specific?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg">
                  Browse Anime
                </Button>
                <Button variant="outline" size="lg">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        {/* Enhanced Alert Section */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-info)]/20 to-[var(--color-primary)]/20 rounded-2xl blur-xl"></div>
          <div 
            className="relative rounded-2xl border backdrop-blur-xl shadow-lg p-6"
            style={{ 
              backgroundColor: 'var(--color-base-100)/80',
              borderColor: 'var(--color-info)/30'
            }}
          >
            <div className="flex items-start space-x-4">
              <div 
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-info)' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  style={{ color: 'var(--color-info-content)' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-base-content)' }}>
                  Need Help?
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-base-content)/80' }}>
                  If you believe this is an error, please check the URL or try searching for what you need. 
                  Our support team is here to help you navigate back to your favorite anime content.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Contact Support
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Browse Help Center
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}