"use client";

import { useState } from "react";
import Link from "react-router-dom";
import { User, Home, Search, Heart, Shield, Calendar, MessageCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const TenantDashboard = () => {
  const { toast } = useToast();
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => prev.includes(propertyId) ? prev.filter((f) => f !== propertyId) : [...prev, propertyId]);
    toast({
      title: favorites.includes("propertyId") ? "Removed from favorites" : "Added to favorites",
      description: "Property saved successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 shadow-2xl transform transition-transform md:translate-x-0 lg:translate-x-0">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <User className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            </div>
            <span className="font-semibold text-gray-900">PataNyumba</span>
          </div>
          <div className="mt-8 space-y-2">
            <Button
              variant="ghost"
              onClick={() => window.location.href = "/"}
              className="w-full flex items-center justify-start gap-3 px-4 py-3 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.location.href = "/properties"}
              className="w-full flex items-center justify-start gap-3 px-4 py-3 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Properties
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-start gap-3 px-4 py-3 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" aria-hidden="true" />
              Filters
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-2">
          <Button
            variant="ghost"
            onClick={() => window.location.href = "/login"}
            className="w-full flex items-center justify-start gap-3 px-4 py-3 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back!</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-500">
              <Heart className="h-4 w-4" aria-hidden="true" />
              <span>3</span>
            </div>
            <span className="text-gray-500">Saved properties</span>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="p-6 border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Heart className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12,500+</p>
                <p className="text-sm text-gray-500">Properties Available</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">8,200+</p>
                <p className="text-sm text-gray-500">Verified Listings</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity & Saved Properties */}
        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Properties</h2>
            {favorites.length === 0 ? (
              <p className="text-gray-500">No saved properties yet. Start browsing to save your favorites!</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((id) => (
                  <PropertyCard
                    key={id}
                    property={mockProperties.find((p) => p.id === id)!}
                    variant="compact"
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.includes(String(id))}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Searches</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((id) => (
                <div key={id} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors">
                  <p className="text-sm text-gray-500">Search for 3BR apartment in Westlands</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <Button
            onClick={() => window.location.href = "/properties"}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium"
          >
            Browse All Properties
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = "/settings"}
            className="w-full py-3 mt-4 text-gray-700 hover:text-gray-900"
          >
            Settings
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TenantDashboard;