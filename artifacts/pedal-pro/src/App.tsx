import React, { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Menu, X, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

const PRODUCTS = [
  {
    id: 1,
    name: "Mountain Explorer Pro",
    price: "Rp 5.000.000",
    description: "High-performance full-suspension mountain bike built for technical trails",
    image: "/images/product-1.png",
  },
  {
    id: 2,
    name: "City Cruiser Elite",
    price: "Rp 3.500.000",
    description: "Sleek urban commuter with integrated lights and ergonomic design",
    image: "/images/product-2.png",
  },
  {
    id: 3,
    name: "Road Racer X1",
    price: "Rp 7.200.000",
    description: "Lightweight carbon fiber road bike for competitive cyclists",
    image: "/images/product-3.png",
  },
  {
    id: 4,
    name: "Trail Blazer 29er",
    price: "Rp 4.800.000",
    description: "Versatile hardtail with 29-inch wheels for all-terrain adventures",
    image: "/images/product-4.png",
  },
  {
    id: 5,
    name: "Hybrid Commuter Plus",
    price: "Rp 2.900.000",
    description: "The perfect blend of road efficiency and trail capability",
    image: "/images/product-5.png",
  },
  {
    id: 6,
    name: "Kids Adventure Bike",
    price: "Rp 1.500.000",
    description: "Durable and safe bicycle designed for young adventurers aged 6-12",
    image: "/images/product-6.png",
  },
];

const CATEGORIES = [
  {
    id: 1,
    name: "Mountain Bikes",
    description: "for off-road adventures",
    image: "/images/category-mountain.png",
  },
  {
    id: 2,
    name: "Road Bikes",
    description: "speed and performance",
    image: "/images/category-road.png",
  },
  {
    id: 3,
    name: "Hybrid Bikes",
    description: "versatile everyday riding",
    image: "/images/category-hybrid.png",
  },
  {
    id: 4,
    name: "Kids Bikes",
    description: "safe and fun for children",
    image: "/images/category-kids.png",
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const;

function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans w-full overflow-x-hidden">
      {/* Sticky Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-3" : "bg-white py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div 
            className="text-2xl font-bold cursor-pointer tracking-tight"
            onClick={() => scrollToSection("home")}
          >
            <span style={{ color: "#2563eb" }}>PEDAL</span>{" "}
            <span style={{ color: "#d4a017" }}>UNLIMITED</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("home")} className="text-foreground hover:text-accent transition-colors font-medium">Home</button>
            <button onClick={() => scrollToSection("products")} className="text-foreground hover:text-accent transition-colors font-medium">Products</button>
            <button onClick={() => scrollToSection("categories")} className="text-foreground hover:text-accent transition-colors font-medium">Categories</button>
            <button onClick={() => scrollToSection("footer")} className="text-foreground hover:text-accent transition-colors font-medium">Contact</button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer hover:text-accent transition-colors">
              <ShoppingCart className="w-6 h-6 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            <button 
              className="md:hidden text-foreground p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden bg-white border-t shadow-lg absolute w-full overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col p-4 space-y-4">
            <button onClick={() => scrollToSection("home")} className="text-left text-lg font-medium text-foreground p-2 hover:bg-muted rounded">Home</button>
            <button onClick={() => scrollToSection("products")} className="text-left text-lg font-medium text-foreground p-2 hover:bg-muted rounded">Products</button>
            <button onClick={() => scrollToSection("categories")} className="text-left text-lg font-medium text-foreground p-2 hover:bg-muted rounded">Categories</button>
            <button onClick={() => scrollToSection("footer")} className="text-left text-lg font-medium text-foreground p-2 hover:bg-muted rounded">Contact</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative w-full min-h-[90vh] flex items-center justify-center mt-[70px]">
        {/* Background Image / Fallback */}
        <div className="absolute inset-0 w-full h-full bg-primary overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('/images/hero-bg.png')",
              backgroundPosition: "center 40%" 
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center md:text-left flex flex-col items-center md:items-start pt-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
              Premium Bicycles <br className="hidden md:block"/> for Every Rider
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl drop-shadow-md">
              Discover our curated collection of performance bikes for every terrain and rider. 
              Engineered for speed, built for endurance.
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white font-semibold text-lg px-10 py-6 rounded-full shadow-xl transition-all hover:scale-105"
              onClick={() => scrollToSection("products")}
            >
              Shop Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Products</h2>
            <div className="h-1.5 w-24 bg-accent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square bg-muted/30 overflow-hidden flex items-center justify-center p-6">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/600x600/e2e8f0/1e3a8a?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-foreground leading-tight">{product.name}</h3>
                  </div>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-2xl font-extrabold text-primary mb-3">{product.price}</p>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">{product.description}</p>
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-6 rounded-xl"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Shop by Category</h2>
            <div className="h-1.5 w-24 bg-accent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-[400px] md:h-[500px]"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/600x800/1e3a8a/ffffff?text=${encodeURIComponent(category.name)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-white">
                  <h3 className="text-2xl font-bold mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{category.name}</h3>
                  <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    {category.description}
                  </p>
                  <Button variant="outline" className="bg-white/10 hover:bg-white text-white hover:text-primary border-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150">
                    View Collection
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-primary pt-20 pb-8 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-start">
              <h3 className="text-2xl font-bold mb-6 tracking-tight">
                <span style={{ color: "#2563eb" }}>PEDAL</span>{" "}
                <span style={{ color: "#d4a017" }}>UNLIMITED</span>
              </h3>
              <p className="text-white/80 mb-8 max-w-sm">
                Premium bicycles for serious cyclists and everyday riders alike. Quality, performance, and trust in every ride.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection("home")} className="text-white/80 hover:text-accent transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection("products")} className="text-white/80 hover:text-accent transition-colors">Products</button></li>
                <li><button onClick={() => scrollToSection("categories")} className="text-white/80 hover:text-accent transition-colors">Categories</button></li>
                <li><button onClick={() => scrollToSection("footer")} className="text-white/80 hover:text-accent transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6">Contact Info</h4>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="font-semibold mr-2 block w-20">Address:</span>
                  <span>Sudirman Central Business District,<br/>Jakarta, Indonesia</span>
                </li>
                <li className="flex items-center">
                  <span className="font-semibold mr-2 block w-20">Email:</span>
                  <a href="mailto:hello@pedalpro.com" className="hover:text-accent transition-colors">hello@pedalpro.com</a>
                </li>
                <li className="flex items-center">
                  <span className="font-semibold mr-2 block w-20">Phone:</span>
                  <a href="tel:+62215550123" className="hover:text-accent transition-colors">+62 21 555 0123</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 PEDAL UNLIMITED. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;