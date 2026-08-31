"use client";

import { useState } from "react";
import Link from "react-router-dom";
import { 
  Search, MapPin, Shield, Heart, Star, ArrowRight, 
  Building2, Users, CheckCircle, TrendingUp, 
  Zap, Globe, Lock, Home, Map 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchForm } from "@/components/ui/search-form";
import PropertyCard from "@/components/ui/property-card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Search,
    title: "Smart Property Search",
    description: "Find your perfect home with advanced filters, location-based search, and intelligent recommendations.",
  },
  {
    icon: MapPin,
    title: "GPS-Powered Discovery",
    description: "Discover properties near you or explore neighborhoods with our interactive map search experience.",
  },
  {
    icon: Shield,
    title: "Verified Listings",
    description: "Every property is verified by our team. Rent with confidence knowing listings are authentic and up-to-date.",
  },
  {
    icon: Heart,
    title: "Save & Compare",
    description: "Save your favorite properties, compare options side-by-side, and never miss a great deal.",
  },
  {
    icon: Users,
    title: "Direct Connections",
    description: "Connect directly with verified landlords and agents. Schedule viewings and ask questions instantly.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Access rental trends, neighborhood analytics, and price history to make informed decisions.",
  },
];

const stats = [
  { value: "12,500+", label: "Active Listings" },
  { value: "8,200+", label: "Verified Properties" },
  { value: "45,000+", label: "Happy Tenants" },
  { value: "3,100+", label: "Trusted Landlords" },
];

const mockProperties = [
  {
    id: "1",
    title: "Modern 3BR Apartment in Kilimani",
    location: "Kilimani, Nairobi",
    price: 85000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    propertyType: "Apartment",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"],
    isVerified: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: "2",
    title: "Spacious 2BR Townhouse in Karen",
    location: "Karen, Nairobi",
    price: 120000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    propertyType: "Townhouse",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"],
    isVerified: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 18,
  },
  {
    id: "3",
    title: "Luxury 4BR Villa in Runda",
    location: "Runda, Nairobi",
    price: 280000,
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    propertyType: "House",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"],
    isVerified: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 12,
  },
  {
    id: "4",
    title: "Cozy 1BR Bedsitter in Westlands",
    location: "Westlands, Nairobi",
    price: 28000,
    bedrooms: 1,
    bathrooms: 1,
    area: 450,
    propertyType: "Bedsitter",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"],
    isVerified: true,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 31,
  },
  {
    id: "5",
    title: "Executive 3BR in Lavington",
    location: "Lavington, Nairobi",
    price: 150000,
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    propertyType: "Apartment",
    images: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"],
    isVerified: true,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 15,
  },
  {
    id: "6",
    title: "Modern 2BR Apartment in Mombasa",
    location: "Nyali, Mombasa",
    price: 65000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    propertyType: "Apartment",
    images: ["https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80"],
    isVerified: true,
    isFeatured: false,
    rating: 4.4,
    reviewCount: 8,
  },
];

const Index = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-teal-50 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%2310b981\" fill-opacity=\"0.03\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" aria-hidden="true" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border-emerald-100 px-4 py-2 text-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span>Kenya's #1 Rental Marketplace</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
              Find Your Perfect
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Home in Kenya
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover verified rental properties across Kenya. From cozy bedsitters to luxury villas, 
              connect directly with trusted landlords and agents.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto">
            <SearchForm variant="hero" />
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Everything You Need to
              <br />
              <span className="text-emerald-600">Rent with Confidence</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful tools and trusted features to make your property search seamless.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="h-full border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Featured Properties
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Handpicked verified listings from top neighborhoods
              </p>
            </div>
            <Link to="/properties?featured=true">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockProperties.slice(0, 6).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                variant="featured"
                onFavorite={toggleFavorite}
                isFavorite={favorites.includes(property.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Find your next home in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Search,
                title: "Search & Discover",
                description: "Browse thousands of verified listings with smart filters, map search, and personalized recommendations.",
              },
              {
                step: "02",
                icon: Heart,
                title: "Save & Connect",
                description: "Save favorites, compare properties, and connect directly with verified landlords and agents.",
              },
              {
                step: "03",
                icon: CheckCircle,
                title: "View & Rent",
                description: "Schedule viewings, submit applications, and move into your new home with confidence.",
              },
            ].map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-2xl font-bold text-emerald-600">
                  {step.step}
                </div>
                <div className="pt-16">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mx-auto mb-6">
                    <step.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-3 text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/properties">
              <Button className="gap-2 text-lg px-8 py-4">
                Start Your Search
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" aria-hidden="true" />
            
            <div className="relative max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Ready to Find Your New Home?
              </h2>
              <p className="mt-4 text-lg sm:text-xl text-emerald-100">
                Join thousands of tenants who found their perfect rental on PataNyumba. 
                Start your search today — it's free!
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <Button className="bg-white text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-4 gap-2">
                    Create Free Account
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </Link>
                <Link to="/properties">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                    Browse Properties
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { icon: Shield, title: "Verified Listings", desc: "Every property verified by our team" },
              { icon: Lock, title: "Secure Platform", desc: "Your data protected with bank-grade security" },
              { icon: Zap, title: "Instant Alerts", desc: "Get notified of new matches instantly" },
              { icon: Globe, title: "Nationwide Coverage", desc: "Properties across all 47 counties" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mx-auto">
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;