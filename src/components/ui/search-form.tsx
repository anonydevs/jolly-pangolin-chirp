"use client";

import { useState } from "react";
import { Search, MapPin, Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "react-router-dom";

const propertyTypes = [
  { value: "", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "bedsitter", label: "Bedsitter" },
  { value: "townhouse", label: "Townhouse" },
  { value: "commercial", label: "Commercial" },
];

const bedroomsOptions = [
  { value: "", label: "Any Beds" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

const bathroomsOptions = [
  { value: "", label: "Any Baths" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

const priceRanges = [
  { value: "", label: "Any Price", min: 0, max: Infinity },
  { value: "0-15000", label: "Under KES 15,000", min: 0, max: 15000 },
  { value: "15000-30000", label: "KES 15,000 - 30,000", min: 15000, max: 30000 },
  { value: "30000-50000", label: "KES 30,000 - 50,000", min: 30000, max: 50000 },
  { value: "50000-100000", label: "KES 50,000 - 100,000", min: 50000, max: 100000 },
  { value: "100000-200000", label: "KES 100,000 - 200,000", min: 100000, max: 200000 },
  { value: "200000+", label: "KES 200,000+", min: 200000, max: Infinity },
];

const popularLocations = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika",
  "Karen", "Westlands", "Kilimani", "Lavington", "Kileleshwa",
  "Parklands", "Ngong Road", "Kiambu Road", "Thika Road",
  "Mombasa Road", "Langata", "Runda", "Muthaiga", "Gigiri"
];

export const SearchForm = ({ 
  initialValues = {}, 
  onSearch, 
  variant = "hero",
  className 
}: { 
  initialValues?: Record<string, string>;
  onSearch?: (values: Record<string, string>) => void;
  variant?: "hero" | "page" | "sidebar";
  className?: string;
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    location: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    minPrice: "",
    maxPrice: "",
    ...initialValues,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });
    onSearch?.(formData);
    if (variant === "hero" || variant === "page") {
      window.location.href = `/properties?${searchParams.toString()}`;
    }
  };

  const handleLocationInput = (value: string) => {
    handleChange("location", value);
    if (value.length > 1) {
      const filtered = popularLocations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectLocation = (location: string) => {
    handleChange("location", location);
    setShowSuggestions(false);
    setLocationSuggestions([]);
  };

  const clearFilters = () => {
    setFormData({
      location: "",
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const hasActiveFilters = Object.values(formData).some((v) => v !== "");

  if (variant === "hero") {
    return (
      <form onSubmit={handleSubmit} className={cn("w-full", className)}>
        <div className="relative rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-gray-100">
          <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <label htmlFor="hero-location" className="sr-only">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <Input
                  id="hero-location"
                  type="text"
                  placeholder="Where do you want to live?"
                  value={formData.location}
                  onChange={(e) => handleLocationInput(e.target.value)}
                  onFocus={() => setFocusedField("location")}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-10 h-12 text-base"
                  autoComplete="off"
                />
                {showSuggestions && locationSuggestions.length > 0 && focusedField === "location" && (
                  <div className="absolute z-10 top-full left-0 right-0 mt-1 rounded-lg bg-white shadow-lg ring-1 ring-gray-200 overflow-hidden">
                    {locationSuggestions.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => selectLocation(loc)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <MapPin className="inline-block mr-2 h-4 w-4 text-gray-400" aria-hidden="true" />
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <label htmlFor="hero-type" className="sr-only">Property Type</label>
              <Select value={formData.propertyType} onValueChange={(v) => handleChange("propertyType", v)}>
                <SelectTrigger id="hero-type" className="h-12">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <label htmlFor="hero-bedrooms" className="sr-only">Bedrooms</label>
              <Select value={formData.bedrooms} onValueChange={(v) => handleChange("bedrooms", v)}>
                <SelectTrigger id="hero-bedrooms" className="h-12">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  {bedroomsOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <label htmlFor="hero-price" className="sr-only">Max Price</label>
              <Select value={formData.maxPrice} onValueChange={(v) => handleChange("maxPrice", v)}>
                <SelectTrigger id="hero-price" className="h-12">
                  <SelectValue placeholder="Max Price" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-base col-span-1 lg:col-span-1">
              <Search className="mr-2 h-5 w-5" aria-hidden="true" />
              Search Properties
            </Button>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600"
            >
              <Filter className={cn("h-4 w-4 transition-transform", showAdvanced && "rotate-180")} aria-hidden="true" />
              <span>Advanced filters</span>
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clear all
              </button>
            )}
          </div>

          {showAdvanced && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 animate-slide-down">
              <div>
                <label htmlFor="hero-bathrooms" className="sr-only">Bathrooms</label>
                <Select value={formData.bathrooms} onValueChange={(v) => handleChange("bathrooms", v)}>
                  <SelectTrigger id="hero-bathrooms" className="h-10">
                    <SelectValue placeholder="Bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {bathroomsOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="hero-min-price" className="sr-only">Min Price</label>
                <Input
                  id="hero-min-price"
                  type="number"
                  placeholder="Min Price (KES)"
                  value={formData.minPrice}
                  onChange={(e) => handleChange("minPrice", e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <label htmlFor="hero-max-price-input" className="sr-only">Max Price</label>
                <Input
                  id="hero-max-price-input"
                  type="number"
                  placeholder="Max Price (KES)"
                  value={formData.maxPrice}
                  onChange={(e) => handleChange("maxPrice", e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-full"
                  onClick={() => window.location.href = "/map-search"}
                >
                  <MapPin className="mr-2 h-4 w-4" aria-hidden="true" />
                  Map Search
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    );
  }

  if (variant === "sidebar") {
    return (
      <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
        <div>
          <label htmlFor="sidebar-location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <Input
              id="sidebar-location"
              type="text"
              placeholder="Search area, landmark..."
              value={formData.location}
              onChange={(e) => handleLocationInput(e.target.value)}
              onFocus={() => setFocusedField("location")}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10"
              autoComplete="off"
            />
            {showSuggestions && locationSuggestions.length > 0 && focusedField === "location" && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 rounded-lg bg-white shadow-lg ring-1 ring-gray-200 overflow-hidden">
                {locationSuggestions.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => selectLocation(loc)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="sidebar-type" className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <Select value={formData.propertyType} onValueChange={(v) => handleChange("propertyType", v)}>
            <SelectTrigger id="sidebar-type" className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          <div>
            <label htmlFor="sidebar-bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms
            </label>
            <Select value={formData.bedrooms} onValueChange={(v) => handleChange("bedrooms", v)}>
              <SelectTrigger id="sidebar-bedrooms" className="w-full">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                {bedroomsOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="sidebar-bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
              Bathrooms
            </label>
            <Select value={formData.bathrooms} onValueChange={(v) => handleChange("bathrooms", v)}>
              <SelectTrigger id="sidebar-bathrooms" className="w-full">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                {bathroomsOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <label htmlFor="sidebar-min-price" className="block text-sm font-medium text-gray-700 mb-2">
              Min Price (KES)
            </label>
            <Input
              id="sidebar-min-price"
              type="number"
              placeholder="0"
              value={formData.minPrice}
              onChange={(e) => handleChange("minPrice", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sidebar-max-price" className="block text-sm font-medium text-gray-700 mb-2">
              Max Price (KES)
            </label>
            <Input
              id="sidebar-max-price"
              type="number"
              placeholder="Any"
              value={formData.maxPrice}
              onChange={(e) => handleChange("maxPrice", e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="flex-1">
            <Search className="mr-2 h-4 w-4" aria-hidden="true" />
            Search
          </Button>
          <Button type="button" variant="outline" onClick={clearFilters} className="flex-1">
            <X className="mr-2 h-4 w-4" aria-hidden="true" />
            Clear
          </Button>
        </div>

        <Link to="/map-search" className="block w-full text-center">
          <Button variant="ghost" className="w-full">
            <MapPin className="mr-2 h-4 w-4" aria-hidden="true" />
            Search on Map
          </Button>
        </Link>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <label htmlFor="page-location" className="sr-only">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <Input
              id="page-location"
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => handleLocationInput(e.target.value)}
              onFocus={() => setFocusedField("location")}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10"
              autoComplete="off"
            />
            {showSuggestions && locationSuggestions.length > 0 && focusedField === "location" && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 rounded-lg bg-white shadow-lg ring-1 ring-gray-200 overflow-hidden">
                {locationSuggestions.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => selectLocation(loc)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="page-type" className="sr-only">Property Type</label>
          <Select value={formData.propertyType} onValueChange={(v) => handleChange("propertyType", v)}>
            <SelectTrigger id="page-type">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="page-bedrooms" className="sr-only">Bedrooms</label>
          <Select value={formData.bedrooms} onValueChange={(v) => handleChange("bedrooms", v)}>
            <SelectTrigger id="page-bedrooms">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              {bedroomsOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="page-price" className="sr-only">Max Price</label>
          <Select value={formData.maxPrice} onValueChange={(v) => handleChange("maxPrice", v)}>
            <SelectTrigger id="page-price">
              <SelectValue placeholder="Max Price" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" className="flex-1 sm:flex-none">
          <Search className="mr-2 h-4 w-4" aria-hidden="true" />
          Search
        </Button>
        {hasActiveFilters && (
          <Button type="button" variant="outline" onClick={clearFilters}>
            <X className="mr-2 h-4 w-4" aria-hidden="true" />
            Clear Filters
          </Button>
        )}
        <Link to="/map-search">
          <Button variant="outline">
            <MapPin className="mr-2 h-4 w-4" aria-hidden="true" />
            Map Search
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default SearchForm;