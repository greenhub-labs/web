"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";

// UI Components
import { Button } from "@/contexts/shared/presentation/components/ui/button";
import {
  Card,
  CardContent,
} from "@/contexts/shared/presentation/components/ui/card";
import { Separator } from "@/contexts/shared/presentation/components/ui/separator";

// Atomic Design Components
import { StatCard } from "@/contexts/shared/presentation/components/atoms/StatCard";

// Icons
import {
  Home,
  ArrowLeft,
  Search,
  MessageCircle,
  Zap,
  Leaf,
  Sprout,
} from "lucide-react";

const NotFoundPage: React.FC = () => {
  const t = useTranslations("pages.notFound");
  const router = useRouter();

  // Fun animated counter for "time wasted"
  const [timeWasted, setTimeWasted] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    // Animate the "time wasted" counter
    const interval = setInterval(() => {
      setTimeWasted((prev) => prev + 1);
    }, 1000);

    // Rotate through fun facts
    const factInterval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % 4);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(factInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header with animated plants */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="animate-bounce delay-0">
              <Sprout className="h-12 w-12 text-green-500" />
            </div>
            <div className="animate-bounce delay-150">
              <Leaf className="h-16 w-16 text-emerald-600" />
            </div>
            <div className="animate-bounce delay-300">
              <Sprout className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-green-800">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-green-600 font-medium">
            {t("subtitle")}
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("message")}</p>
        </div>

        {/* Fun Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t("stats.errorCode")}
            value="404"
            icon="🚫"
            className="border-red-200 bg-red-50"
          />
          <StatCard
            title={t("stats.timeWasted")}
            value={formatTime(timeWasted)}
            icon="⏰"
            className="border-orange-200 bg-orange-50"
          />
          <StatCard
            title={t("stats.pagesAvailable")}
            value="42+"
            icon="📄"
            className="border-blue-200 bg-blue-50"
          />
          <StatCard
            title={t("stats.systemStatus")}
            value="Online"
            icon="🟢"
            className="border-green-200 bg-green-50"
          />
        </div>

        {/* Main Content Area */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Suggestions */}
          <Card className="border-green-200 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <Search className="h-5 w-5 mr-2" />
                {t("suggestions.title")}
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {t("suggestions.checkUrl")}
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {t("suggestions.navigation")}
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {t("suggestions.search")}
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {t("suggestions.home")}
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Right: Fun Facts */}
          <Card className="border-emerald-200 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                {t("funFacts.title")}
              </h3>
              <div className="h-20 flex items-center">
                <div className="transition-all duration-500 ease-in-out">
                  <p className="text-gray-700 flex items-start">
                    <span className="text-emerald-500 mr-2">🌱</span>
                    {t(`funFacts.facts.${currentFactIndex}`)}
                  </p>
                </div>
              </div>
              <div className="flex justify-center mt-4 space-x-1">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                      index === currentFactIndex
                        ? "bg-emerald-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
            >
              <Home className="h-4 w-4 mr-2" />
              {t("actions.goHome")}
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            onClick={() => router.back()}
            className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("actions.goBack")}
          </Button>

          <Link href="/garden">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              <Leaf className="h-4 w-4 mr-2" />
              {t("actions.explore")}
            </Button>
          </Link>
        </div>

        <Separator className="my-8" />

        {/* Footer */}
        <div className="text-center text-gray-500 space-y-2">
          <p className="text-sm">
            Lost in the digital garden? Our AI assistant is here to help! 🤖
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {t("actions.contact")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
