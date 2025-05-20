import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { VolunteerForm } from '@/components/home/volunteer-form';
import { Calendar, Clock, HeartHandshake, Users } from 'lucide-react';

export function VolunteerSection() {
  return (
    <section id="volunteer" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">Join Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Become a Pet-Friendly Champion</h2>
          <p className="text-muted-foreground text-lg">
            Help us transform our cities into welcoming spaces for all pets. Volunteer your time and skills to make a difference.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <Tabs defaultValue="opportunities" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                <TabsTrigger value="impact">Your Impact</TabsTrigger>
              </TabsList>
              <TabsContent value="opportunities" className="bg-card rounded-lg shadow-sm p-6 border mt-6">
                <ScrollArea className="h-[400px] md:h-[500px] pr-4">
                  <div className="space-y-6">
                    <VolunteerRole
                      icon={<Users className="h-8 w-8 text-chart-1" />}
                      title="Event Organizer"
                      description="Plan and execute pet-friendly community events, from small meetups to large festivals."
                      commitment="5-10 hours per month"
                      skills={["Event Planning", "Communication", "Organization"]}
                    />
                    
                    <VolunteerRole
                      icon={<HeartHandshake className="h-8 w-8 text-chart-2" />}
                      title="Shelter Helper"
                      description="Assist local animal shelters with walking dogs, socializing cats, and helping with day-to-day operations."
                      commitment="4-8 hours per week"
                      skills={["Animal Handling", "Compassion", "Reliability"]}
                    />
                    
                    <VolunteerRole
                      icon={<Calendar className="h-8 w-8 text-chart-4" />}
                      title="Community Advocate"
                      description="Attend city council meetings and advocate for pet-friendly policies and infrastructure improvements."
                      commitment="3-6 hours per month"
                      skills={["Public Speaking", "Research", "Advocacy"]}
                    />
                    
                    <VolunteerRole
                      icon={<Clock className="h-8 w-8 text-chart-5" />}
                      title="Social Media Ambassador"
                      description="Create and share content about pet-friendly initiatives, events, and success stories on social media."
                      commitment="2-5 hours per week"
                      skills={["Content Creation", "Social Media Management", "Photography"]}
                    />
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="impact" className="bg-card rounded-lg shadow-sm p-6 border mt-6">
                <ScrollArea className="h-[400px] md:h-[500px] pr-4">
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3">Making Real Change</h3>
                      <p className="text-muted-foreground">
                        Our volunteers have helped create tangible improvements in pet-friendly infrastructure and community engagement:
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <ImpactStat 
                        number="50+" 
                        text="New pet waste stations installed in parks and urban areas" 
                      />
                      <ImpactStat 
                        number="15" 
                        text="Restaurants that adopted pet-friendly outdoor seating policies" 
                      />
                      <ImpactStat 
                        number="1,200+" 
                        text="Community members educated about responsible pet ownership" 
                      />
                      <ImpactStat 
                        number="$25,000" 
                        text="Raised for animal shelter improvements and pet-friendly park upgrades" 
                      />
                      <ImpactStat 
                        number="8" 
                        text="New off-leash areas created within existing city parks" 
                      />
                      <ImpactStat 
                        number="3" 
                        text="Pet-friendly policy changes adopted by city council" 
                      />
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <h3 className="text-xl font-semibold mb-3">Volunteer Testimonial</h3>
                      <blockquote className="italic text-muted-foreground">
                        "Volunteering with the Pet-Friendly City initiative has been incredibly rewarding. Seeing the direct impact of our work in creating more inclusive spaces for pets and their owners makes every hour worthwhile. I've made great friends and helped shape a more compassionate community."
                      </blockquote>
                      <p className="text-right font-medium mt-2">— Alex Martinez, Volunteer since 2023</p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Sign Up to Volunteer</h3>
            <VolunteerForm />
          </div>
        </div>
      </div>
    </section>
  );
}

interface VolunteerRoleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  commitment: string;
  skills: string[];
}

function VolunteerRole({ icon, title, description, commitment, skills }: VolunteerRoleProps) {
  return (
    <div className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="mb-3">
            <span className="text-sm font-medium">Time commitment: </span>
            <span className="text-sm text-muted-foreground">{commitment}</span>
          </div>
          <div>
            <span className="text-sm font-medium">Key skills: </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ImpactStatProps {
  number: string;
  text: string;
}

function ImpactStat({ number, text }: ImpactStatProps) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-border">
      <div className="text-xl font-bold text-primary shrink-0 w-24">{number}</div>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}