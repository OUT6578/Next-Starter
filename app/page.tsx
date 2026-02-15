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
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Heart,
  Sparkles,
  Globe
} from "lucide-react";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

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
                CVR Guest Management
              </span>
            </Link>

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
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-purple-600 animate-spin-slow" />
              <span className="text-purple-600 font-semibold">FEATURES</span>
              <Sparkles className="w-6 h-6 text-purple-600 animate-spin-slow" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CVR?</span>
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
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and security protocols to protect your sensitive guest data",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Process hundreds of guests in minutes with our optimized performance",
                color: "from-indigo-500 to-indigo-600"
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Comprehensive dashboards and insights to track visitor patterns and trends",
                color: "from-blue-500 to-indigo-600"
              },
              {
                icon: Bell,
                title: "Instant Notifications",
                description: "Stay informed with real-time alerts for guest arrivals and important events",
                color: "from-purple-500 to-pink-600"
              },
              {
                icon: Calendar,
                title: "Event Management",
                description: "Plan and manage events seamlessly with integrated scheduling tools",
                color: "from-indigo-500 to-purple-600"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className="group p-8 border-2 hover:border-purple-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer animate-fade-in-up bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
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
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Attention Students!</h2>
            <p className="text-xl text-blue-100">Level up your Guest Management journey with CVR</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8 animate-fade-in-left hover:bg-white/20 transition-all duration-300">
              <div className="text-white space-y-4">
                <p className="text-lg leading-relaxed">
                  Join a national movement that celebrates you — the future of Guest Management! CVR empowers students with leadership opportunities, mentorship, and scholarship rewards up to <span className="text-2xl font-bold text-yellow-300">₹4,000</span>
                </p>
                <ul className="space-y-3">
                  {[
                    "Leadership development programs",
                    "Networking with industry professionals",
                    "Scholarship opportunities",
                    "Career advancement resources"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <div className="space-y-6 animate-fade-in-right">
              <Card className="bg-white p-8 text-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-4 animate-bounce-slow">
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

          <Card className="overflow-hidden shadow-2xl border-0 animate-scale-in hover:shadow-3xl transition-all duration-500">
            <div className="grid lg:grid-cols-2">
              <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-6 animate-float shadow-2xl">
                    <Users className="w-24 h-24 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Featured Member</h3>
                  <p className="text-gray-600 mt-2">Excellence in Guest Management</p>
                </div>
              </div>
              <div className="p-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white flex flex-col justify-center">
                <Award className="w-16 h-16 mb-6 text-yellow-300 animate-bounce-slow" />
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
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 animate-bounce-slow">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                  Join thousands of professionals already using CVR to manage their guests efficiently
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    asChild
                    className="text-blue-600 font-bold hover:bg-blue-50 transform hover:scale-105 transition-all shadow-xl"
                  >
                     <Link href="/register">Create Account</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Newsletter Section */}
        <div className="relative border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-6 h-6 text-blue-400 animate-bounce-slow" />
                  <h3 className="text-2xl font-bold">Stay Updated</h3>
                </div>
                <p className="text-blue-200">Subscribe to our newsletter for the latest updates and exclusive offers</p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20 transition-all"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur group-hover:blur-md transition-all" />
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold">CVR</span>
              </Link>
              <p className="text-blue-200 leading-relaxed">
                Empowering organizations with professional guest management solutions nationwide.
              </p>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400 animate-pulse" />
                <span className="text-sm text-blue-200">Made with love in India</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {["About Us", "Features", "Membership", "Events", "Resources", "Blog"].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={`#${link.toLowerCase().replace(" ", "-")}`}
                      className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                Services
              </h4>
              <ul className="space-y-3">
                {["Guest Registration", "Event Management", "Analytics & Reports", "Security Solutions", "Mobile App", "API Access"].map((service, index) => (
                  <li key={index}>
                    <Link 
                      href="#"
                      className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-400" />
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <span className="text-blue-200">
                    CVR College of Engineering<br />
                    Hyderabad, India
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                  <a href="tel:+911234567890" className="text-blue-200 hover:text-white transition-colors">
                    +91 123 456 7890
                  </a>
                </li>
                <li className="flex items-center gap-3 group">
                  <Mail className="w-5 h-5 text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="mailto:info@cvr.ac.in" className="text-blue-200 hover:text-white transition-colors">
                    info@cvr.ac.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {[
                  { icon: Facebook, color: "hover:text-blue-400" },
                  { icon: Twitter, color: "hover:text-sky-400" },
                  { icon: Instagram, color: "hover:text-pink-400" },
                  { icon: Linkedin, color: "hover:text-blue-500" },
                  { icon: Youtube, color: "hover:text-red-500" }
                ].map((social, index) => (
                  <Link 
                    key={index}
                    href="#"
                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center ${social.color} transition-all hover:scale-110 hover:bg-white/20`}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right">
                <p className="text-blue-200 text-sm">
                  © 2026 CVR Guest Management. All rights reserved.
                </p>
                <div className="flex items-center justify-center md:justify-end gap-4 mt-2">
                  <Link href="#" className="text-blue-300 hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </Link>
                  <span className="text-blue-400">•</span>
                  <Link href="#" className="text-blue-300 hover:text-white text-sm transition-colors">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Scroll to Top Button */}
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-xl hover:shadow-2xl transition-all hover:scale-110 z-50"
        >
          <ChevronRight className="w-6 h-6 rotate-[-90deg]" />
        </Button>
      </footer>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-fade-in-left { animation: fade-in-left 0.6s ease-out; }
        .animate-fade-in-right { animation: fade-in-right 0.6s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        .animate-scale-in { animation: scale-in 0.6s ease-out; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-800 { animation-delay: 800ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}