import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Facebook, Instagram, MessageSquare, Slack } from "lucide-react";

export const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "emmanuelmbuli7@gmail.com",
      href: "mailto:emmanuelmbuli7@gmail.com",
      color: "text-red-400"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+255746283053",
      href: "tel:+255746283053",
      color: "text-green-400"
    }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "#",
      color: "text-blue-400"
    },
    {
      icon: Instagram,
      label: "Instagram", 
      href: "#",
      color: "text-pink-400"
    },
    {
      icon: MessageSquare,
      label: "Discord",
      href: "#",
      color: "text-indigo-400"
    },
    {
      icon: Slack,
      label: "Slack",
      href: "#",
      color: "text-purple-400"
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on exciting projects? Let's connect and create something amazing together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 fade-in-up">
            {contactInfo.map((contact, index) => (
              <Card 
                key={index}
                className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-royal hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                        {contact.label}
                      </h3>
                      <a 
                        href={contact.href}
                        className="text-muted-foreground hover:text-accent transition-colors text-lg"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social Media */}
          <div className="text-center fade-in-up">
            <h3 className="text-2xl font-semibold mb-8">Connect With Me</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className="border-primary/30 hover:bg-primary/10 hover:scale-110 transition-all duration-300 group"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {social.label}
                  </a>
                </Button>
              ))}
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Let's Build Something Great Together</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Whether you have a project in mind, need consultation, or just want to connect, 
                  I'm always excited to discuss new opportunities and creative challenges.
                </p>
                <Button className="btn-hero" asChild>
                  <a href="mailto:emmanuelmbuli7@gmail.com">
                    Start a Conversation
                    <Mail className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};