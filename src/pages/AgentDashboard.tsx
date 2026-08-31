"use client";

import { useState } from "react";
import Link from "react-router-dom";
import { User, Building2, MessageCircle, Calendar, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const AgentDashboard = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState([]);
  const [showAddClient, setShowAddClient] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 shadow-2xl transform transition-transform md:translate-x-0 lg:translate-x-0">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <User className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            </div>
            <span className="font-semibold text-gray-900">PataNyumba</span>
          </div>
          <div className="mt-8 space-y-2">
            <Button
              variant="ghost"
              onClick={() => window.location.href = "/agent-dashboard"}
              className="w-full flex items-center justify-start gap-3 px-4 py-3 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.location.href = "/properties"}
              className="w-full flex items-center justify-start gap-3 px-4 py-3 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Properties
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.location.href = "/settings"}
              className="w-full flex items-center justify-start gap-3 px-4 py-3 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              Settings
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-2">
          <Button
            onClick={() => setShowAddClient(true)}
            className="w-full flex items-center justify-start gap-3 px-4 py-3 text-left text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          >
            <UserPlus className="h-4 w-4 mr-2" aria-hidden="true" />
            Add Client
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.location.href = "/login"}
            className="w-full flex items-center justify-start gap-3 px-4 py-3 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
            <p className="text-gray-500">Manage your clients and properties</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-500">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>12</span>
            </div>
            <span className="text-gray-500">Active Clients</span>
          </div>
        </header>

        {/* Clients Section */}
        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Clients</h2>
            {clients.length === 0 ? (
              <p className="text-gray-500">No clients yet. Add your first client to get started!</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((id) => (
                  <Card key={id} className="border-gray-100 hover:border-emerald-200 transition-colors">
                    <CardHeader className="p-4 border-b border-gray-100">
                      <h3 className="font-medium text-gray-900">Client {id}</h3>
                      <p className="text-sm text-gray-500">Property seeker</p>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-600">Looking for 2BR apartment</p>
                      <div className="mt-3">
                        <Button variant="ghost" className="text-emerald-600 text-sm">
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <p className="text-sm text-gray-600">3 property viewings scheduled this week</p>
              <div className="mt-4">
                <Button variant="ghost" className="text-emerald-600 text-sm">
                  View Activity
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <Button
            onClick={() => setShowAddClient(true)}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:from-emerald-700 hover:to-teal-700 transition-colors"
          >
            <UserPlus className="mr-2 h-4 w-4" aria-hidden="true" />
            Add New Client
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = "/settings"}
            className="w-full py-3 text-gray-700 hover:text-gray-900"
          >
            Settings
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;