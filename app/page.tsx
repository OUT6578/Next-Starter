"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Shield, 
  Zap, 
  Calendar, 
  BarChart3, 
  Bell,
  ChevronRight,
  CheckCircle2,
  Star,
  Award,
  TrendingUp
} from "lucide-react";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Header/Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-lg py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur group-hover:blur-md transition-all" />
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                e-अतिथि
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                About Us
              </Link>
              <Link href="#events" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Events
              </Link>
              <Link href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Features
              </Link>
              <Link href="#membership" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Membership
              </Link>
              <Link href="#sponsors" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Sponsors
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                asChild 
                className="hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button 
                asChild 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold animate-bounce-slow">
                  <Award className="w-4 h-4" />
                  National Guest Management Leader
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <span className="block animate-slide-in-left">Elevating</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-slide-in-left animation-delay-200">
                  Excellence
                </span>
                <span className="block animate-slide-in-left animation-delay-400">in Guest Management</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed animate-fade-in animation-delay-600">
                "We are committed to <span className="font-semibold text-blue-600">SERVING</span> and <span className="font-semibold text-purple-600">EDUCATING</span> our communities, <span className="font-semibold text-indigo-600">EMPOWERING</span> our members, and <span className="font-semibold text-blue-600">ADVANCING</span> and <span className="font-semibold text-purple-600">ADVOCATING</span> for the Guest Management profession"
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-800">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  Get Started
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in animation-delay-1000">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-gray-600">Guests Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in-right">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-2xl opacity-20 animate-pulse-slow" />
              <Card className="relative overflow-hidden rounded-3xl shadow-2xl border-0 transform hover:scale-105 transition-all duration-500">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Users className="w-32 h-32 mx-auto text-blue-600 mb-4 animate-float" />
                    <h3 className="text-2xl font-bold text-gray-800">Professional Guest Management</h3>
                    <p className="text-gray-600 mt-2">Empowering organizations nationwide</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="overflow-hidden rounded-3xl shadow-xl border-0 transform hover:scale-105 transition-all duration-500 animate-fade-in-left">
              <div className="aspect-[4/3] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-8">
                <div className="text-white text-center">
                  <Calendar className="w-24 h-24 mx-auto mb-4 animate-bounce-slow" />
                  <h3 className="text-3xl font-bold">Join Us in Delhi!</h3>
                  <p className="text-lg mt-2">Annual Convention 2026</p>
                </div>
              </div>
            </Card>

            <div className="space-y-6 animate-fade-in-right">
              <h2 className="text-4xl font-bold text-gray-900">
                Empowering Guest Management Professionals
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Advancing Guest Management Excellence and Strengthening Communities through innovative solutions, comprehensive training, and unwavering support for professionals nationwide.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">e-अतिथि?</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for professional guest management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Smart Registration",
                description: "Streamline guest check-ins with our intelligent registration system and automated workflows",
                color: "blue",
                delay: "0"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and security protocols to protect your sensitive guest data",
                color: "purple",
                delay: "200"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Process hundreds of guests in minutes with our optimized performance",
                color: "indigo",
                delay: "400"
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Comprehensive dashboards and insights to track visitor patterns and trends",
                color: "blue",
                delay: "600"
              },
              {
                icon: Bell,
                title: "Instant Notifications",
                description: "Stay informed with real-time alerts for guest arrivals and important events",
                color: "purple",
                delay: "800"
              },
              {
                icon: Calendar,
                title: "Event Management",
                description: "Plan and manage events seamlessly with integrated scheduling tools",
                color: "indigo",
                delay: "1000"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className={`group p-8 border-2 hover:border-${feature.color}-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer animate-fade-in-up`}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Attention Students!</h2>
            <p className="text-xl text-blue-100">Level up your Guest Management journey with e-अतिथि</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8 animate-fade-in-left">
              <div className="text-white space-y-4">
                <p className="text-lg leading-relaxed">
                  Join a national movement that celebrates you — the future of Guest Management! e-अतिथि empowers students with leadership opportunities, mentorship, and scholarship rewards up to <span className="text-2xl font-bold text-yellow-300">₹4,000</span>
                </p>
                <ul className="space-y-3">
                  {[
                    "Leadership development programs",
                    "Networking with industry professionals",
                    "Scholarship opportunities",
                    "Career advancement resources"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <div className="space-y-6 animate-fade-in-right">
              <Card className="bg-white p-8 text-gray-900 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-4">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Join Today!</h3>
                  <p className="text-gray-600 mt-2">Start your journey to excellence</p>
                </div>
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="/register">Enroll Now</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Member of the Month
            </h2>
          </div>

          <Card className="overflow-hidden shadow-2xl border-0 animate-scale-in">
            <div className="grid lg:grid-cols-2">
              <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-6">
                    <Users className="w-24 h-24 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Featured Member</h3>
                  <p className="text-gray-600 mt-2">Excellence in Guest Management</p>
                </div>
              </div>
              <div className="p-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white flex flex-col justify-center">
                <Award className="w-16 h-16 mb-6 text-yellow-300" />
                <h3 className="text-3xl font-bold mb-4">Recognition of Excellence</h3>
                <p className="text-lg text-blue-100 leading-relaxed mb-6">
                  Celebrating outstanding professionals who exemplify dedication, innovation, and service excellence in the guest management industry.
                </p>
                <div className="flex items-center gap-4">
                  <TrendingUp className="w-8 h-8 text-green-300" />
                  <span className="text-sm text-blue-100">Making a difference in communities nationwide</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 border-0 shadow-2xl overflow-hidden animate-scale-in">
            <div className="relative p-12 text-center text-white">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-grid-pattern" />
              </div>
              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl sm:text-5xl font-bold">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                  Join thousands of professionals already using e-अतिथि to manage their guests efficiently
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    asChild
                    className="text-blue-600 font-bold hover:bg-blue-50 transform hover:scale-105 transition-all"
                  >
                     <Link href="/register">Create Account</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
