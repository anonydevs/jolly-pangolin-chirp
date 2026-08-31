"use client";

import { useState } from "react";
import Link from "react-router-dom";
import { Building2, Users, MapPin, Shield, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const About = () => {
  const [showTeam, setShowTeam] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">About PataNyumba</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Kenya's trusted rental marketplace connecting tenants with verified properties.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become Africa's most trusted property marketplace, simplifying the rental experience 
              for millions of Africans while creating a transparent digital infrastructure for 
              landlords and agents across the continent.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To bridge the gap between tenants and landlords by providing a platform that offers 
              verified listings, transparent pricing, and direct communication channels, making 
              property rental in Kenya stress-free and secure.
            </p>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {[1, 2, 3, 4].map((id) => (
            <Card key={id} className="p-6 text-center border-gray-100">
              <div className="text-4xl font-bold text-emerald-600">{["12K+", "8K+", "45K+", "3K+"][id - 1]}</div>
              <p className="mt-2 text-gray-600">Properties / Tenants / Landlords / Cities</p>
            </Card>
          ))}
        </div>

        {/* Why Choose Us */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose PataNyumba?</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((id) => (
              <div key={id} className="p-6 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                  {id <= 2 ? <Shield /> : id === 3 ? <MapPin /> : <Heart />}
                </div>
                <h4 className="text-lg font-medium text-gray-900">{["Verified Listings", "Nationwide Coverage", "Secure Platform", "Direct Connections"][id - 1]}</h4>
                <p className="mt-2 text-gray-500">{["Every property verified by our team", "Listings across all 47 counties", "Bank-grade security for your data", "Connect directly with landlords and agents"][id - 1]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button onClick={() => window.location.href = "/properties"}>
            Explore Properties
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;