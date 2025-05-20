'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, PawPrint, Tablet, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const heroSlides = [
  {
    title: "Building Cities Where Every Paw Matters",
    description: "Join our movement to transform urban spaces into havens for pets and their humans. Together, we can create a world where every neighborhood welcomes our furry friends.",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: "Join the Movement",
    stats: [
      { icon: <PawPrint className="h-10 w-10 text-chart-1" />, title: "50+", description: "Pet-Friendly Parks" },
      { icon: <Heart className="h-10 w-10 text-chart-4" />, title: "10,000+", description: "Happy Pet Owners" },
      { icon: <Tablet className="h-10 w-10 text-chart-2" />, title: "25+", description: "City Partnerships" }
    ]
  },
  {
    title: "Creating Safe Spaces for Our Furry Friends",
    description: "We're working with communities to build pet-friendly infrastructure, from parks to public spaces, ensuring every pet has a place to play and thrive.",
    image: "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: "Learn More",
    stats: [
      { icon: <PawPrint className="h-10 w-10 text-chart-2" />, title: "100+", description: "Safe Play Areas" },
      { icon: <Heart className="h-10 w-10 text-chart-1" />, title: "5,000+", description: "Volunteers" },
      { icon: <Tablet className="h-10 w-10 text-chart-4" />, title: "15+", description: "Cities Transformed" }
    ]
  },
  {
    title: "Join Our Pet-Friendly Community",
    description: "Be part of a growing network of pet lovers, volunteers, and advocates working together to make our cities more welcoming for pets and their owners.",
    image: "https://images.pexels.com/photos/1643456/pexels-photo-1643456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: "Get Involved",
    stats: [
      { icon: <PawPrint className="h-10 w-10 text-chart-4" />, title: "200+", description: "Events Yearly" },
      { icon: <Heart className="h-10 w-10 text-chart-2" />, title: "20,000+", description: "Community Members" },
      { icon: <Tablet className="h-10 w-10 text-chart-1" />, title: "30+", description: "Partner Organizations" }
    ]
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [showContent, setShowContent] = useState(true);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const nextSlide = () => {
    if (isTransitioning) return;
    setSlideDirection('right');
    setIsTransitioning(true);
    setShowContent(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setShowContent(true);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 300);
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    setSlideDirection('left');
    setIsTransitioning(true);
    setShowContent(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setShowContent(true);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 300);
  };
  
  const currentHero = heroSlides[currentSlide];
  
  // Animation classes
  const contentAnim = showContent
    ? slideDirection === 'right'
      ? 'animate-fadeInRight'
      : 'animate-fadeInLeft'
    : slideDirection === 'right'
      ? 'animate-fadeOutLeft'
      : 'animate-fadeOutRight';
  
  return (
    <section className="relative min-h-[calc(100vh-6rem)] w-full flex flex-col justify-between items-center overflow-hidden px-2.5 py-4 pt-24">
      <div className="container flex flex-col lg:flex-row items-stretch justify-between gap-y-4 gap-x-8 flex-1 min-h-0 w-full min-w-0 overflow-x-hidden">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start w-full max-w-xl overflow-auto min-h-0 min-h-[500px] min-w-0">
          <div className={cn(
            "transition-all duration-1000 transform w-full min-w-0",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
            contentAnim
          )}>
            <div className="inline-block mb-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-primary">
              Welcome to PetCity Initiative
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight text-center lg:text-left">
              {currentHero.title}
            </h1>
            <p className="text-lg md:text-xl mb-2 text-foreground/80 bg-background/30 backdrop-blur-sm rounded-lg p-4 text-center lg:text-left">
              {currentHero.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-2 justify-center lg:justify-start">
              <Button size="lg" className="group bg-primary hover:bg-primary/90">
                {currentHero.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-background/50 backdrop-blur-sm hover:bg-background/70">
                <a href="#volunteer">
                  Volunteer Now
                  <Heart className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full mt-2 min-w-0 max-w-full overflow-x-hidden box-border">
              {currentHero.stats.map((stat, index) => (
                <StatCard 
                  key={index}
                  icon={stat.icon}
                  title={stat.title}
                  description={stat.description}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Right Image */}
        <div className={cn(
          "flex-1 flex justify-center items-center w-full max-w-xl mt-4 lg:mt-0 min-h-0",
          contentAnim
        )}>
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg min-h-0">
            <div 
              className="absolute inset-0 transition-opacity duration-500"
              style={{ 
                backgroundImage: `url('${currentHero.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>
      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-20 pointer-events-none">
        <Button
          onClick={prevSlide}
          variant="ghost"
          size="icon"
          className="pointer-events-auto bg-background/50 backdrop-blur-sm hover:bg-background/70"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          onClick={nextSlide}
          variant="ghost"
          size="icon"
          className="pointer-events-auto bg-background/50 backdrop-blur-sm hover:bg-background/70"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function StatCard({ icon, title, description }: StatCardProps) {
  return (
    <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center flex flex-col items-center box-border min-w-0 max-w-full">
      <div className="mb-2 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}