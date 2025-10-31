import { useEffect, useState } from "react";
import { Heart, Brain, Activity, Apple, Droplet } from "lucide-react";
import bannerBg from "@assets/generated_images/Health_facts_banner_background_f7e10eb6.png";

const healthFacts = [
  {
    icon: Heart,
    text: "Regular exercise can reduce your risk of heart disease by up to 35%",
  },
  {
    icon: Brain,
    text: "Getting 7-9 hours of sleep improves memory and cognitive function",
  },
  {
    icon: Activity,
    text: "Walking 30 minutes daily can boost your immune system significantly",
  },
  {
    icon: Apple,
    text: "Eating 5 servings of fruits and vegetables daily reduces disease risk",
  },
  {
    icon: Droplet,
    text: "Drinking 8 glasses of water daily helps maintain optimal body function",
  },
];

export default function HealthFactsBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % healthFacts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = healthFacts[currentIndex].icon;

  return (
    <div className="relative h-32 md:h-40 overflow-hidden" data-testid="banner-health-facts">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm" />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-3">
          <CurrentIcon className="h-10 w-10 md:h-12 md:w-12 text-primary" />
        </div>
        <p className="text-lg md:text-2xl font-semibold text-foreground max-w-3xl" data-testid="text-health-fact">
          {healthFacts[currentIndex].text}
        </p>
        
        <div className="flex gap-2 mt-4">
          {healthFacts.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-primary" : "w-2 bg-primary/30"
              }`}
              onClick={() => setCurrentIndex(index)}
              data-testid={`button-indicator-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
