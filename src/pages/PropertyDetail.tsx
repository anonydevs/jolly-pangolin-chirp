"use client";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, Bed, Bath, Square, Heart, Share2, Calendar, 
  Phone, Mail, CheckCircle, Star, ChevronLeft, ChevronRight,
  X, User, Shield, Clock, MapPin as MapPinIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const mockProperty = {
  id: "1",
  title: "Modern 3BR Apartment in Kilimani",
  location: "Kilimani, Nairobi",
  address: "Kilimani Road, Near Yaya Centre",
  price: 85000,
  bedrooms: 3,
  bathrooms: 2,
  area: 1450,
  propertyType: "Apartment",
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
  ],
  isVerified: true,
  isFeatured: true,
  rating: 4.8,
  reviewCount: 24,
  description: "Beautiful modern 3-bedroom apartment in the heart of Kilimani. This spacious unit features an open-plan living and dining area, modern kitchen with built-in appliances, master bedroom with en-suite bathroom, and a private balcony with city views. The apartment is located in a secure gated community with 24/7 security, backup generator, borehole water, gym, and swimming pool. Walking distance to Yaya Centre, The Junction Mall, and major restaurants. Easy access to Ngong Road and Argwings Kodhek Road.",
  amenities: [
    "Parking", "24/7 Security", "Backup Generator", "Borehole Water", 
    "Gym", "Swimming Pool", "Balcony", "High-Speed Internet", 
    "Air Conditioning", "Built-in Wardrobes", "Modern Kitchen", "Lift Access"
  ],
  nearbyPlaces: [
    { name: "Yaya Centre", distance: "0.3 km", type: "Shopping" },
    { name: "The Junction Mall", distance: "0.8 km", type: "Shopping" },
    { name: "Kilimani Primary School", distance: "0.5 km", type: "School" },
    { name: "Aga Khan Hospital", distance: "1.2 km", type: "Hospital" },
    { name: "Ngong Road", distance: "0.2 km", type: "Transport" },
  ],
  landlord: {
    name: "James Mwangi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    phone: "+254 7XX XXX XXX",
    email: "james.mwangi@example.com",
    verified: true,
    responseRate: 95,
    responseTime: "Within 1 hour",
    propertiesCount: 12,
    joinedDate: "Jan 2022",
  },
  coordinates: { lat: -1.2921, lng: 36.7872 },
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const isFavorite = favorites.includes(id || "");

  const property = mockProperty;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  const toggleFavorite = () => {
    setFavorites((prev) => prev.includes(id || "") ? prev.filter((f) => f !== id) : [...prev, id || ""]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <section className="relative">
        <div className="relative h-[500px] lg:h-[600px]">
          <img
            src={property.images[currentImage]}
            alt={`${property.title} - Image ${currentImage + 1} of ${property.images.length}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
          
          {/* Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          )}

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={cn(
                  "h-14 w-20 rounded-lg overflow-hidden border-2 transition-all",
                  index === currentImage
                    ? "border-emerald-500"
                    : "border-white/50 hover:border-white"
                )}
                aria-label={`View image ${index + 1}`}
                aria-current={index === currentImage ? "true" : "false"}
              >
                <img
                  src={property.images[index]}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {property.isVerified && (
              <Badge className="gap-1 bg-white/90 text-emerald-700 backdrop-blur-sm px-3 py-1.5">
                <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Verified
              </Badge>
            )}
            {property.isFeatured && (
              <Badge className="gap-1 bg-amber-500 text-white px-3 py-1.5">
                <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                Featured
              </Badge>
            )}
          </div>

          {/* Favorite & Share */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button
              onClick={toggleFavorite}
              className={cn(
                "p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all",
                isFavorite ? "text-red-500" : "text-gray-900 hover:text-red-500"
              )}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} aria-hidden="true" />
            </button>
            <button
              className="p-2 rounded-full bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm transition-colors"
              aria-label="Share property"
            >
              <Share2 className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-gray-500" aria-hidden="true" />
                <span className="text-gray-600">{property.location}</span>
                {property.rating && (
                  <>
                    <span className="text-gray-300 mx-1">•</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                      {property.rating.toFixed(1)} ({property.reviewCount} reviews)
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{property.title}</h1>
              <p className="mt-2 text-gray-600">{property.address}</p>
            </div>

            {/* Price & Key Features */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 bg-white rounded-2xl border border-gray-100">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">{formatPrice(property.price)}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <div className="flex flex-wrap items-center gap-6 border-t sm:border-t-0 sm:border-l sm:pl-6 pt-6 sm:pt-0">
                <div className="flex items-center gap-2 text-gray-600">
                  <Bed className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">{property.bedrooms} Bed{property.bedrooms > 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Bath className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">{property.bathrooms} Bath{property.bathrooms > 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Square className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">{property.area.toLocaleString()} sqft</span>
                </div>
                <Badge variant="outline" className="text-sm">
                  {property.propertyType}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-gray-900">Description</h2>
              <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-gray-900">Amenities</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" aria-hidden="true" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Places */}
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-gray-900">Nearby Places</h2>
              <div className="mt-4 space-y-3">
                {property.nearbyPlaces.map((place) => (
                  <div key={place.name} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-gray-900">{place.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{place.type}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className="border-t border-gray-100 pt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Location</h2>
                <Button variant="outline" onClick={() => setShowMapModal(true)} className="gap-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  View on Map
                </Button>
              </div>
              <div className="mt-4 aspect-video bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200 relative overflow-hidden">
                <div className="text-center p-8">
                  <MapPin className="mx-auto h-12 w-12 text-gray-300 mb-4" aria-hidden="true" />
                  <p className="text-gray-600">Interactive map would be displayed here</p>
                  <p className="text-sm text-gray-500 mt-1">Coordinates: {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Sidebar - Contact & Landlord */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-24 border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">KES {formatPrice(property.price)}/month</h3>
                    <p className="text-sm text-gray-500">Security deposit: KES {formatPrice(property.price * 2)}</p>
                  </div>
                  {property.isVerified && (
                    <Badge className="gap-1 bg-emerald-50 text-emerald-700">
                      <Shield className="h-3 w-3" aria-hidden="true" />
                      Verified
                    </Badge>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <Button className="w-full gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" onClick={() => setShowContactModal(true)}>
                    <Calendar className="h-5 w-5" aria-hidden="true" />
                    Schedule Viewing
                  </Button>
                  <Button variant="outline" className="w-full gap-2" onClick={() => setShowContactModal(true)}>
                    <Mail className="h-5 w-5" aria-hidden="true" />
                    Send Enquiry
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    Call Landlord
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Heart className="h-5 w-5" aria-hidden="true" />
                    Save Property
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                    <p className="text-xs text-gray-500">Bedrooms</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                    <p className="text-xs text-gray-500">Bathrooms</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">{property.area.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Sq Ft</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Landlord Card */}
            <Card className="border-gray-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Listed by</h3>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={property.landlord.avatar} alt={property.landlord.name} />
                    <AvatarFallback>{property.landlord.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 truncate">{property.landlord.name}</p>
                      {property.landlord.verified && (
                        <Badge className="gap-1 bg-emerald-50 text-emerald-700 text-xs">
                          <CheckCircle className="h-2.5 w-2.5" aria-hidden="true" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{property.landlord.propertiesCount} properties • Member since {property.landlord.joinedDate}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-medium text-gray-900">{property.landlord.responseRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium text-gray-900">{property.landlord.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Properties Listed</span>
                    <span className="font-medium text-gray-900">{property.landlord.propertiesCount}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <Button variant="outline" className="w-full gap-2" onClick={() => setShowContactModal(true)}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Contact Landlord
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Landlord</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+254 7XX XXX XXX" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Hi, I'm interested in this property. When can I schedule a viewing?"
                rows={4}
                required
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowContactModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" type="submit">
                Send Message
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Map Modal */}
      <Dialog open={showMapModal} onOpenChange={setShowMapModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] p-0">
          <div className="relative aspect-video">
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="mx-auto h-12 w-12 text-gray-300 mb-4" aria-hidden="true" />
                <p className="text-gray-600">Interactive map with property location</p>
                <p className="text-sm text-gray-500 mt-1">
                  {property.address}, {property.location}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowMapModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm transition-colors z-10"
              aria-label="Close map"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyDetail;