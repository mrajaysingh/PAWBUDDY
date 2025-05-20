'use client';

import { ThemeProvider } from '@/components/layout/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { ImpactStories } from '@/components/home/impact-stories';
import { PetAdoptionCarousel } from '@/components/home/pet-adoption-carousel';
import { VolunteerSection } from '@/components/sections/volunteer-section';
import { Chatbot } from '@/components/home/chatbot';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
  return (
    <ThemeProvider>
      <Toaster />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <div className="bg-gradient-to-b from-background to-muted">
            <VolunteerSection />
            <ImpactStories />
            <PetAdoptionCarousel />
          </div>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </ThemeProvider>
  );
}