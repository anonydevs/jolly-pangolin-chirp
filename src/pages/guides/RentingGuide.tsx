"use client";

import { useState } from "react";
import Link from "react-router-dom";
import { User, Home, MapPin, Shield, Calendar, MessageCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const RentingGuide = () => {
  const sections = [
    "Understanding the Kenyan Rental Market",
    "Budgeting for Your Rental",
    "Finding the Right Property",
    "Viewing Properties Checklist",
    "Negotiating Rent and Terms",
    "Signing the Lease Agreement",
    "Moving In Checklist",
    "After Moving In: Utilities and Services",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Rental Guide for Tenants</h2>
          <p className="mt-4 text-lg text-gray-600">
            A comprehensive guide to renting property in Kenya.
          </p>
        </div>

        {/* Table of Contents */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 shadow-2xl transform transition-transform md:translate-x-0 lg:translate-x-0 max-h-screen">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Sections</h3>
          </div>
          <nav className="p-4 space-y-2">
            {sections.map((section, index) => (
              <button
                key={index}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors",
                  index === 0 && "border-b border-gray-100 pb-2"
                )}
              >
                {section}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 p-8">
          <div className="prose max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to the Rental Guide</h1>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding the Kenyan Rental Market</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Kenya's rental market is diverse, ranging from affordable bedsitters in the outskirts 
                to luxury villas in exclusive neighborhoods. Understanding the market helps you make 
                informed decisions and find the best value for your budget.
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600">
                <li>Major rental markets include Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret</li>
                <li>Rental prices vary significantly by neighborhood, with Nairobi's central areas being the most expensive</li>
                <li>Most landlords require 2-4 months' rent as a security deposit</li>
                <li>Lease terms typically range from 6 months to 2 years</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Budgeting for Your Rental</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                When budgeting for a rental property in Kenya, consider these costs:
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <p className="font-medium text-gray-900">Monthly Rent</p>
                  <p className="text-gray-500">KES 20,000 - 500,000+</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <p className="font-medium text-gray-900">Security Deposit</p>
                  <p className="text-gray-500">2-4 months' rent</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <p className="font-medium text-gray-900">Agency Fee</p>
                  <p className="text-gray-500">Half month's rent (if using an agent)</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <p className="font-medium text-gray-900">First Month's Rent</p>
                  <p className="text-gray-500">Payable upfront</p>
                </div>
              </div>
              <p className="text-gray-600">
                <strong>Total upfront cost:</strong> Typically 5-7 months' rent
              </p>
            </section>

            {/* More sections would continue here... */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RentingGuide;