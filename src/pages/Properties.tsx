"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X, Grid, List, MapPin, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchForm } from "@/components/ui/search-form";
import PropertyCard from "@/components/ui/property-card";
import { cn } from "@/lib/utils";

const propertyTypes = [
  { value: "", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "bedsitter", label: "Bedsitter" },
  { value: "townhouse", label: "Townhouse" },
  { value: "commercial", label: "Commercial" },
];

const bedroomsOptions = [
  { value: "", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

const bathroomsOptions = [
  { value: "", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "area-desc", label: "Largest First" },
  { value: "rating", label: "Highest Rated" },
];

const amenities = [
  "Parking", "Security", "Generator", "Water Tank", "Gym", 
  "Pool", "Balcony", "Garden", "Lift", "Internet", "AC", "Furnished"
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
    amenities: ["Parking", "Security", "Generator", "Water Tank", "Gym", "Pool"],
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
    amenities: ["Parking", "Security", "Garden", "Water Tank"],
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
    amenities: ["Parking", "Security", "Generator", "Water Tank", "Gym", "Pool", "Garden"],
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
    amenities: ["Security", "Water Tank", "Internet"],
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
    amenities: ["Parking", "Security", "Generator", "Water Tank", "Gym", "Lift"],
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
    amenities: ["Parking", "Security", "Pool", "Water Tank"],
  },
  {
    id: "7",
    title: "Family 3BR House in Eldoret",
    location: "Eldoret, Uasin Gishu",
    price: 55000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    propertyType: "House",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"],
    isVerified: true,
    isFeatured: false,
    rating: 4.3,
    reviewCount: 6,
    amenities: ["Parking", "Security", "Garden", "Water Tank"],
  },
  {
    id: "8",
    title: "Modern Studio in Kisumu",
    location: "Kisumu, Milimani",
    price: 35000,
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    propertyType: "Bedsitter",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"],
    isVerified: false,
    isFeatured: false,
    rating: 4.2,
    reviewCount: 4,
    amenities: ["Security", "Water Tank", "Internet"],
  },
  {
    id: "9",
    title: "Luxury 2BR in Nakuru",
    location: "Nakuru, Milimani",
    price: 75000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    propertyType: "Apartment",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"],
    isVerified: true,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 11,
    amenities: ["Parking", "Security", "Generator", "Gym", "Pool"],
  },
];

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const initialFormValues = {
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("propertyType") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    bathrooms: searchParams.get("bathrooms") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  };

  useEffect(() => {
    setProperties(mockProperties);
    applyFilters();
  }, [searchParams]);

  const applyFilters = () => {
    setIsLoading(true);
    setTimeout(() => {
      let result = [...properties];

      if (initialFormValues.location) {
        result = result.filter((p) =>
          p.location.toLowerCase().includes(initialFormValues.location.toLowerCase())
        );
      }
      if (initialFormValues.propertyType) {
        result = result.filter((p) => p.propertyType.toLowerCase() === initialFormValues.propertyType.toLowerCase());
      }
      if (initialFormValues.bedrooms) {
        result = result.filter((p) => p.bedrooms >= parseInt(initialFormValues.bedrooms));
      }
      if (initialFormValues.bathrooms) {
        result = result.filter((p) => p.bathrooms >= parseInt(initialFormValues.bathrooms));
      }
      if (initialFormValues.minPrice) {
        result = result.filter((p) => p.price >= parseInt(initialFormValues.minPrice));
      }
      if (initialFormValues.maxPrice) {
        result = result.filter((p) => p.price <= parseInt(initialFormValues.maxPrice));
      }
      if (selectedAmenities.length > 0) {
        result = result.filter((p) => selectedAmenities.every((a) => p.amenities.includes(a)));
      }

      switch (sortBy) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "area-desc":
          result.sort((a, b) => b.area - a.area);
          break;
        case "rating":
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        default:
          break;
      }

      setFilteredProperties(result);
      setIsLoading(false);
    }, 300);
  };

  const handleSearch = (values: Record<string, string>) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const clearAllFilters = () => {
    setSelectedAmenities([]);
    setSearchParams({});
  };

  const hasActiveFilters = 
    Object.values(initialFormValues).some((v) => v !== "") ||
    selectedAmenities.length > 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rental Properties</h1>
              <p className="mt-1 text-gray-600">
                {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found
                {hasActiveFilters && " (filtered)"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                <Filter className="h-4 w-4" aria-hidden="true" />
                Filters
              </Button>
              <div className="hidden sm:flex items-center gap-2 border border-gray-200 rounded-xl p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Search Form */}
          <div className="mt-6 md:hidden">
            <SearchForm variant="page" initialValues={initialFormValues} onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={cn("w-72 flex-shrink-0", showFilters ? "block" : "hidden lg:block")}>
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-600 hover:text-gray-900">
                    <X className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                    Clear all
                  </Button>
                )}
              </div>

              <SearchForm 
                variant="sidebar" 
                initialValues={initialFormValues} 
                onSearch={handleSearch} 
              />

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {amenities.map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            {/* Desktop Search Bar */}
            <div className="hidden lg:block mb-6">
              <SearchForm variant="page" initialValues={initialFormValues} onSearch={handleSearch} />
            </div>

            {/* Sort & Results Count */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort" className="w-[200px]">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Properties Grid/List */}
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="pt-0">
                      <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                      <div className="h-8 bg-gray-200 rounded w-1/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-16">
                <MapPin className="mx-auto h-16 w-16 text-gray-300" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">No properties found</h3>
                <p className="mt-2 text-gray-600">Try adjusting your filters or search in a different area</p>
                <Button variant="outline" onClick={clearAllFilters} className="mt-6">
                  <X className="mr-2 h-4 w-4" aria-hidden="true" />
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onFavorite={toggleFavorite}
                        isFavorite={favorites.includes(property.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        variant="compact"
                        onFavorite={toggleFavorite}
                        isFavorite={favorites.includes(property.id)}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="mt-10 flex items-center justify-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronDown className="h-4 w-4 rotate-90" aria-hidden="true" />
                  </Button>
                  <Button variant="default" className="w-10">1</Button>
                  <Button variant="outline" className="w-10">2</Button>
                  <Button variant="outline" className="w-10">3</Button>
                  <Button variant="outline" size="icon">
                    <ChevronDown className="h-4 w-4 -rotate-90" aria-hidden="true" />
                  </Button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Properties;