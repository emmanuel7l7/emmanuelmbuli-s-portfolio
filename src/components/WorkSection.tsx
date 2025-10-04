import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Folder, Star } from "lucide-react";

export const WorkSection = () => {
  const featuredProject = {
    title: "FarmersSoko Solution",
    description: "My final year project - A comprehensive platform connecting farmers directly with buyers, eliminating middlemen and ensuring fair prices for agricultural products.",
    technologies: ["React", "TypeScript", "Node.js", "Shadcn", "Tailwind"],
    status: "Featured Project",
    link: "#", // To be updated with actual link
  };

  const upcomingProjects = [
    { title: "E-Commerce Platform", status: "In Development" },
    { title: "Mobile Banking App", status: "Planning Phase" },
    { title: "Portfolio Dashboard", status: "Concept" },
  ];

  return (
    <section id="work" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Work</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions and creative projects that demonstrate my technical expertise and problem-solving abilities.
          </p>
        </div>

        {/* Featured Project */}
        <div className="mb-16 fade-in-up">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-royal transition-all duration-500 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <Star className="w-4 h-4 mr-1" />
                  {featuredProject.status}
                </Badge>
                <Folder className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="text-3xl mb-4 group-hover:text-primary transition-colors">
                {featuredProject.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {featuredProject.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredProject.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {tech}
                  </Badge>
                ))}
              </div>

              <Button className="btn-hero group/btn">
                View Project
                <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Projects */}
        <div className="fade-in-up">
          <h3 className="text-2xl font-semibold mb-8 text-center">More Projects Coming Soon</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingProjects.map((project, index) => (
              <Card 
                key={index} 
                className="bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/30 hover:shadow-accent transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <Folder className="w-12 h-12 text-primary/60 mx-auto mb-4 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <Badge variant="outline" className="border-primary/30 text-muted-foreground">
                    {project.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};