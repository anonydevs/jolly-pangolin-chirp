"use client";

import { MapPin, Bed, Bath, Square, Heart, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "react-router-dom";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  images: string[];
  isVerified: boolean;
  isFeatured: boolean;
  rating?: number;
  reviewCount?: number;
  latitude?: number;
  longitude?: number;
}

interface PropertyCardProps {
  property: Property;
  variant?: "default" | "compact" | "featured";
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

const PropertyCard = ({ property, variant = "default", onFavorite, isFavorite = false }: PropertyCardProps) => {
  const primaryImage = property.images[0] || "/placeholder.svg";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (variant === "compact") {
    return (
      <Link
        to={`/properties/${property.id}`}
        className="group flex gap-4 p-3 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-200"
      >
        <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={primaryImage}
            alt={property.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {property.isVerified && (
            <div className="absolute top-1.5 left-1.5 flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-0.5 backdrop-blur-sm">
              <CheckCircle className="h-3 w-3 text-emerald-600" aria-hidden="true" />
              <span className="text-[10px] font-medium text-emerald-700">Verified</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
              {property.title}
            </h3>
            <p className="mt-0.5 text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {property.location}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">{formatPrice(property.price)}/mo</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFavorite?.(property.id);
              }}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                isFavorite
                  ? "text-red-500 bg-red-50"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              )}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <article className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={primaryImage}
            alt={property.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
            {property.isVerified && (
              <Badge className="gap-1 bg-white/90 text-emerald-700 backdrop-blur-sm">
                <CheckCircle className="h-3 w-3" aria-hidden="true" />
                Verified
              </Badge>
            )}
            {property.isFeatured && (
              <Badge className="gap-1 bg-amber-500 text-white">
                <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                Featured
              </Badge>
            )}
            {property.rating && (
              <Badge className="gap-1 bg-white/90 text-gray-700 backdrop-blur-sm">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                {property.rating.toFixed(1)} ({property.reviewCount || 0})
              </Badge>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFavorite?.(property.id);
            }}
            className={cn(
              "absolute top-4 right-4 p-2 rounded-full transition-all",
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 backdrop-blur-sm"
            )}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} aria-hidden="true" />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {property.location}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
                {property.title}
              </h3>
            </div>
            <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
              {formatPrice(property.price)}<span className="text-base font-normal text-gray-500">/mo</span>
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" aria-hidden="true" />
              {property.bedrooms} Bed
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" aria-hidden="true" />
              {property.bathrooms} Bath
            </span>
            <span className="flex items-center gap-1.5">
              <Square className="h-4 w-4" aria-hidden="true" />
              {property.area.toLocaleString()} sqft
            </span>
            <Badge variant="outline" className="text-xs">
              {property.propertyType}
            </Badge>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      <Link to={`/properties/${property.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={primaryImage}
            alt={property.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
            {property.isVerified && (
              <Badge className="gap-1 bg-white/90 text-emerald-700 backdrop-blur-sm">
                <CheckCircle className="h-3 w-3" aria-hidden="true" />
                Verified
              </Badge>
            )}
            {property.isFeatured && (
              <Badge className="gap-1 bg-amber-500 text-white">
                <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                Featured
              </Badge>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFavorite?.(property.id);
            }}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full transition-all",
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 backdrop-blur-sm"
            )}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} aria-hidden="true" />
          </button>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {property.location}
            </p>
            <Link to={`/properties/${property.id}`}>
              <h3 className="mt-1 text-lg font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
                {property.title}
              </h3>
            </Link>
          </div>
          <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
            {formatPrice(property.price)}<span className="text-base font-normal text-gray-500">/mo</span>
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4" aria-hidden="true" />
            {property.bedrooms} Bed
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" aria-hidden="true" />
            {property.bathrooms} Bath
          </span>
          <span className="flex items-center gap-1.5">
            <Square className="h-4 w-4" aria-hidden="true" />
            {property.area.toLocaleString()} sqft
          </span>
          <Badge variant="outline" className="text-xs">
            {property.propertyType}
          </Badge>
        </div>
        {property.rating && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="font-medium text-gray-900">{property.rating.toFixed(1)}</span>
            <span className="text-gray-500">({property.reviewCount || 0} reviews)</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default PropertyCard;