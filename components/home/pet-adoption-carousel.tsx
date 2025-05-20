'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Heart, ChevronRight, ChevronLeft, MapPin, Info } from 'lucide-react';

// Sample Pet Data - In a real app, this would come from an API
const pets = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    description: "Buddy is a friendly, energetic dog who loves long walks and playing fetch.",
    location: "Central Pet Shelter",
    distance: "2.5 miles away",
    image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    compatibility: ["Families", "Active Lifestyle", "Other Pets"]
  },
  {
    id: 2,
    name: "Whiskers",
    type: "Cat",
    breed: "Maine Coon",
    age: "3 years",
    description: "Whiskers is a gentle giant who enjoys lounging in sunny spots and gentle pets.",
    location: "Feline Friends Rescue",
    distance: "4.1 miles away",
    image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    compatibility: ["Quiet Home", "Indoor Living", "Experienced Owners"]
  },
  {
    id: 3,
    name: "Rocky",
    type: "Dog",
    breed: "Bulldog",
    age: "5 years",
    description: "Rocky is a laid-back dog who loves cuddles and short walks around the block.",
    location: "Second Chance Shelter",
    distance: "1.8 miles away",
    image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    compatibility: ["Apartment Living", "Seniors", "First-time Owners"]
  },
  {
    id: 4,
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: "1 year",
    description: "Luna is a playful and vocal cat who will keep you entertained with her antics.",
    location: "Happy Paws Rescue",
    distance: "5.2 miles away",
    image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    compatibility: ["Active Household", "Families", "Multi-pet Homes"]
  },
  {
    id: 5,
    name: "Max",
    type: "Dog",
    breed: "Beagle",
    age: "4 years",
    description: "Max is a curious explorer with a great nose. He loves scent games and treats.",
    location: "Paws & Claws Shelter",
    distance: "3.3 miles away",
    image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    compatibility: ["Outdoor Enthusiasts", "Active Lifestyle", "Experienced Owners"]
  }
];

export function PetAdoptionCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
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
    
    const element = document.getElementById('pet-adoption-section');
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
    setActiveIndex((prevIndex) => (prevIndex + 1) % pets.length);
  };
  
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + pets.length) % pets.length);
  };
  
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };
  
  return (
    <section id="pet-adoption-section" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">Adoption</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Find Your Perfect Companion</h2>
          <p className="text-muted-foreground text-lg">
            AI-powered suggestions to match you with pets that fit your lifestyle.
          </p>
        </div>
        
        <div className={cn(
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <div className="flex items-center justify-center mb-10">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevSlide}
              className="mr-4"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              {[-1, 0, 1].map((offset) => {
                const index = (activeIndex + offset + pets.length) % pets.length;
                return (
                  <div
                    key={pets[index].id}
                    className={cn(
                      "transition-all duration-500",
                      offset === 0 ? "z-10 scale-105 opacity-100" : "scale-90 opacity-70",
                      offset === -1 ? "translate-x-4 md:translate-x-0" : "",
                      offset === 1 ? "-translate-x-4 md:translate-x-0" : "",
                      offset !== 0 && "hidden md:block"
                    )}
                  >
                    <Card className="overflow-hidden h-full">
                      <div className="relative aspect-[4/3]">
                        <img 
                          src={pets[index].image} 
                          alt={pets[index].name} 
                          className="object-cover w-full h-full"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                          onClick={() => toggleFavorite(pets[index].id)}
                          aria-label={favorites.includes(pets[index].id) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart 
                            className={cn(
                              "h-5 w-5 transition-colors",
                              favorites.includes(pets[index].id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                            )} 
                          />
                        </Button>
                        <Badge className="absolute bottom-2 left-2">
                          {pets[index].type}
                        </Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>{pets[index].name}</CardTitle>
                          <span className="text-sm text-muted-foreground">{pets[index].age}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{pets[index].breed}</p>
                      </CardHeader>
                      {offset === 0 && (
                        <CardContent className="pb-2">
                          <p className="text-sm mb-3">{pets[index].description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {pets[index].compatibility.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            <span>{pets[index].location}</span>
                            <span className="mx-1">•</span>
                            <span>{pets[index].distance}</span>
                          </div>
                        </CardContent>
                      )}
                      {offset === 0 && (
                        <CardFooter>
                          <Button className="w-full">Meet {pets[index].name}</Button>
                        </CardFooter>
                      )}
                    </Card>
                  </div>
                );
              })}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextSlide}
              className="ml-4"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-center gap-1">
            {pets.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="mt-10 bg-muted p-4 rounded-lg max-w-xl mx-auto flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              This is a demo showcasing AI-suggested pet profiles. In a real implementation, 
              AI would analyze your preferences and lifestyle to recommend pets that are most compatible with your home environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}