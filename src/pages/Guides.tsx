"use client";

import { useState } from "react";
import Link from "react-router-dom";
import { BookOpen, Map, Shield, Calendar, Mail, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Guides = () => {
  const guides = [
    { title: "Rental Guide for Tenants", description: "Everything you need to know about renting in Kenya", icon: BookOpen, href: "/guides/renting" },
    { title: "Neighborhood Guides", description: "Find the best areas to live in Nairobi and other cities", icon: Map, href: "/guides/neighborhoods" },
    { title: "Moving Checklist", description: "Step-by-step guide to moving your home", icon: Calendar, href: "/guides/moving" },
    { title: "Tenant Rights", description: "Understanding your rights as a tenant in Kenya", icon: Shield, href: "/guides/rights" },
    { title: "Landlord Resources", description: "How to list and manage your property effectively", icon: Settings, href: "/guides/landlords" },
    { title: "Property Management", description: "Best practices for managing rental properties", icon: Users, href: "/guides/management" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Guides & Resources</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive guides to help you navigate the Kenyan rental market.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Card key={guide.title} className="p-8 hover:border-emerald-200 transition-colors">
              <div className="h-14 w-14 rounded-xl bg-emerald-50 flex items-center justify-center mb-6">
                <guide.icon className="h-7 w-7 text-emerald-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{guide.title}</h3>
              <p className="text-gray-500 line-clamp-2">{guide.description}</p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Button variant="outline" className="w-full text-left">
                  <Link href={guide.href} className="text-emerald-600 hover:text-emerald-700">
                    Read Guide
                  </Link>
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guides;