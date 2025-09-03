import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Code, Lightbulb, Target } from "lucide-react";

export const AboutSection = () => {
  const qualities = [
    { icon: Code, title: "Descriptive", description: "Clear communication and detailed documentation" },
    { icon: Lightbulb, title: "Creative", description: "Innovative solutions to complex problems" },
    { icon: Target, title: "Challenge-Ready", description: "Always eager to tackle new obstacles" },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 fade-in-up">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-royal transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold">Education</h3>
                </div>
                <p className="text-muted-foreground mb-2">
                  <strong className="text-foreground">Graduate from Institute of Finance Management (IFM)</strong>
                </p>
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  Bachelor of Science in Information Technology
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-royal transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I am a passionate IT professional who brings creativity and precision to every project. 
                  My approach combines technical expertise with innovative thinking, always ready to embrace 
                  new challenges and deliver exceptional results.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Qualities Grid */}
          <div className="space-y-6 fade-in-up">
            {qualities.map((quality, index) => (
              <Card 
                key={index} 
                className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-royal hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <quality.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {quality.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {quality.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};