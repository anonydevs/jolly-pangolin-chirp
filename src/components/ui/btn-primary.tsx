"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const btnPrimary = (className?: string) => 
  cn(
    "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events disabled:opacity-50",
    className
  );

export const btnSecondary = (className?: string) =>
  cn(
    "inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events disabled:opacity-50",
    className
  );

export const btnGhost = (className?: string) =>
  cn(
    "inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events disabled:opacity-50",
    className
  );

export const btnOutline = (className?: string) =>
  cn(
    "inline-flex items-center justify-center rounded-xl border border-gray-300 bg-transparent px-6 py-3 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events disabled:opacity-50",
    className
  );