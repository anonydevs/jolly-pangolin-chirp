"use client";

import { useState } from "react";
import Link from "react-router-dom";
import { CheckCircle, Heart, MapPin, Shield, TrendingUp, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const HowItWorks = () => {
  const [step, setStep] = useState(1);

  const steps = [
    {
      number: "01",
      title: "Search & Discover",
      description: "Browse thousands of verified listings with smart filters, map search, and personalized recommendations.",
      icon: Search,
    },
    {
      number: "02",
      title: "Save & Connect",
      description: "Save favorites, compare properties, and connect directly with verified landlords and agents.",
      icon: Heart,
    },
    {
      number: "03",
      title: "View & Apply",
      description: "Schedule viewings, submit applications, and move into your new home with confidence.",
      icon: Calendar,
    },
    {
      number: "04",
      title: "Move In",
      description: "Get settled with our move-in guide and connect with utilities and services in your area.",
      icon: Home,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Finding your perfect home is simple with PataNyumba. Follow these easy steps.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-center mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-medium",
                index <= step - 1 ? "bg-emerald-600 text-white" : ""
              )}>
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div className="w-12 h-2 bg-gray-200 rounded-full">
                  {index <= step - 2 ? "bg-emerald-600" : ""}
                </div>
              )}
              {index < steps.length - 1 && (
                <span className="text-xs text-gray-400 arrow">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Steps Content */}
        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <Card key={index} className="pt-8">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Step-specific content would go here */}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button onClick={() => window.location.href = "/properties"}>
            Start Your Property Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;