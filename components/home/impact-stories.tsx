'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, MapPin, PawPrint, Quote } from 'lucide-react';

// Sample success stories data
const successStories = [
  {
    id: 1,
    title: "Central Park's Pet-Friendly Makeover",
    description: "How we transformed the city's largest park into a pet paradise with dedicated zones, water stations, and waste management systems.",
    location: "New York City, NY",
    category: "Infrastructure",
    quote: "Our city has never been more welcoming to pets. The transformation of Central Park has created a model for urban pet spaces nationwide.",
    author: "Mayor Thompson",
    image: "https://images.pexels.com/photos/1612846/pexels-photo-1612846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 2,
    title: "Paws on Public Transit",
    description: "Our successful campaign that led to pet-friendly policies on all public transportation, making travel with pets easy and stress-free.",
    location: "Portland, OR",
    category: "Policy Change",
    quote: "Being able to take my dog on the light rail has completely changed how we explore the city together. This initiative has made a real difference.",
    author: "Jamie Chen, Dog Owner",
    image: "https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    title: "Dining with Dogs",
    description: "How we partnered with 50+ restaurants to create pet-friendly outdoor dining spaces, boosting both business and community satisfaction.",
    location: "Austin, TX",
    category: "Business Partnership",
    quote: "Welcoming pets to our patio has increased our weekend traffic by 30%. It's been fantastic for business and creates such a joyful atmosphere.",
    author: "Carlos Rodriguez, Restaurant Owner",
    image: "https://images.pexels.com/photos/1933464/pexels-photo-1933464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 4,
    title: "Annual Pet Festival Success",
    description: "Our city-wide pet celebration that drew over 10,000 attendees and raised $50,000 for local animal shelters.",
    location: "Chicago, IL",
    category: "Community Event",
    quote: "The festival brought our diverse community together through our shared love of animals. I've never seen so many happy pets and people in one place!",
    author: "Aisha Johnson, Event Coordinator",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

export function ImpactStories() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('impact-stories-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % successStories.length);
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + successStories.length) % successStories.length);
  };
  
  const activeStory = successStories[activeSlide];
  
  return (
    <section id="impact-stories-section" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">Success Stories</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Making Cities Better for Pets & People</h2>
          <p className="text-muted-foreground text-lg">
            Real stories from cities that have transformed their communities into pet-friendly havens.
          </p>
        </div>
        
        <div className={cn(
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div 
              className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
              style={{
                backgroundImage: `url('${activeStory.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 0.5s ease-in-out'
              }}
            >
              <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent p-8 flex flex-col justify-end">
                <Badge className="w-fit mb-2">{activeStory.category}</Badge>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{activeStory.title}</h3>
                <div className="flex items-center text-white/80">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{activeStory.location}</span>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{activeStory.title}</CardTitle>
                <CardDescription className="flex items-center text-sm">
                  <PawPrint className="h-4 w-4 mr-1" />
                  {activeStory.category}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{activeStory.description}</p>
                <div className="bg-muted p-6 rounded-lg mb-4 relative">
                  <Quote className="h-8 w-8 text-primary/20 absolute -top-4 -left-2" />
                  <p className="italic text-muted-foreground">{activeStory.quote}</p>
                  <p className="text-right font-medium mt-2">— {activeStory.author}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="icon" onClick={prevSlide}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-1">
                  {successStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === activeSlide ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <Button variant="outline" size="icon" onClick={nextSlide}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}