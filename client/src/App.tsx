import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./components/HomePage";
import QuestionDetailPage from "./components/QuestionDetailPage";
import ProfilePage from "./components/ProfilePage";
import AuthForm from "./components/AuthForm";

const mockQuestions = [
  {
    id: "1",
    title: "What are the best foods to boost immune system naturally?",
    description: "I've been getting sick frequently and want to know which foods can help strengthen my immune system without relying on supplements.",
    author: "HealthSeeker23",
    timestamp: "2h ago",
    replyCount: 12,
    isNew: true,
  },
  {
    id: "2",
    title: "How much water should I drink daily for optimal health?",
    description: "I keep hearing different recommendations about daily water intake. What does the science actually say?",
    author: "Anonymous",
    isAnonymous: true,
    timestamp: "5h ago",
    replyCount: 8,
  },
  {
    id: "3",
    title: "Benefits of intermittent fasting for diabetes management",
    description: "As a healthcare professional, I'd like to share insights on how intermittent fasting can help manage type 2 diabetes when done correctly under medical supervision.",
    author: "Dr. Sarah Mitchell",
    isExpert: true,
    timestamp: "1d ago",
    replyCount: 24,
  },
  {
    id: "4",
    title: "Can stress really cause physical health problems?",
    description: "I've been experiencing headaches and digestive issues during a stressful period at work. Is there a real connection between stress and physical symptoms?",
    author: "WorkLifeBalance",
    timestamp: "1d ago",
    replyCount: 15,
  },
  {
    id: "5",
    title: "Best exercises for lower back pain relief?",
    description: "I have chronic lower back pain from sitting at a desk all day. What exercises are safe and effective for relief?",
    author: "DeskWarrior",
    timestamp: "2d ago",
    replyCount: 19,
  },
];

const mockReplies = [
  {
    id: "1",
    content: "The immune system is complex, but diet plays a crucial role. Focus on foods rich in vitamin C (citrus fruits, bell peppers), vitamin D (fatty fish, fortified dairy), and zinc (nuts, legumes). Probiotics from yogurt also help gut health, which is closely linked to immunity. A balanced diet with plenty of colorful fruits and vegetables will give you the broad spectrum of nutrients your immune system needs.",
    author: "Dr. Emily Chen",
    isExpert: true,
    timestamp: "1h ago",
    upvotes: 24,
    replies: [
      {
        id: "1-1",
        content: "Thank you so much! Should I take supplements or is food enough?",
        author: "HealthSeeker23",
        timestamp: "45m ago",
        upvotes: 3,
        replies: [
          {
            id: "1-1-1",
            content: "Food sources are generally preferred as they provide better nutrient absorption. Supplements should only be used if you have a confirmed deficiency. Always consult with your doctor before starting any supplement regimen.",
            author: "Dr. Emily Chen",
            isExpert: true,
            timestamp: "30m ago",
            upvotes: 12,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    content: "I've found that adding garlic and ginger to my daily meals has really helped. Both have natural antimicrobial properties.",
    author: "Anonymous",
    isAnonymous: true,
    timestamp: "2h ago",
    upvotes: 8,
  },
  {
    id: "3",
    content: "Don't forget about adequate sleep and stress management! Chronic stress can significantly weaken your immune system.",
    author: "WellnessJourney",
    timestamp: "1h ago",
    upvotes: 15,
  },
];

const mockUserProfile = {
  username: "Dr. Sarah Mitchell",
  email: "sarah.mitchell@healthmail.com",
  isExpert: true,
  joinDate: "January 2024",
  bio: "Board-certified physician specializing in internal medicine and preventive care. Passionate about patient education and evidence-based health information.",
};

const mockUserStats = {
  questionsAsked: 5,
  answersGiven: 47,
  helpfulVotes: 312,
};

const mockUserQuestions = [
  {
    id: "3",
    title: "Benefits of intermittent fasting for diabetes management",
    description: "As a healthcare professional, I'd like to share insights on how intermittent fasting can help manage type 2 diabetes.",
    author: "Dr. Sarah Mitchell",
    isExpert: true,
    timestamp: "1d ago",
    replyCount: 24,
  },
];

const mockUserAnswers = [
  {
    id: "a1",
    questionTitle: "What are the best foods to boost immune system?",
    content: "The immune system benefits greatly from a balanced diet rich in vitamins C and D, zinc, and probiotics. Focus on citrus fruits, leafy greens, fatty fish, nuts, and fermented foods.",
    timestamp: "1 day ago",
    upvotes: 42,
  },
];

function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  return (
    <Switch>
      <Route path="/" component={() => (
        <HomePage
          isLoggedIn={isLoggedIn}
          username="JohnDoe"
          questions={mockQuestions}
          onQuestionClick={(id) => window.location.href = `/question/${id}`}
        />
      )} />
      
      <Route path="/question/:id" component={() => (
        <QuestionDetailPage
          question={mockQuestions[0]}
          replies={mockReplies}
          isLoggedIn={isLoggedIn}
          onBack={() => window.location.href = '/'}
        />
      )} />
      
      <Route path="/profile" component={() => (
        <ProfilePage
          user={mockUserProfile}
          stats={mockUserStats}
          questions={mockUserQuestions}
          answers={mockUserAnswers}
        />
      )} />
      
      <Route path="/auth" component={() => (
        <AuthForm
          mode={authMode}
          onToggleMode={() => setAuthMode(authMode === "login" ? "register" : "login")}
          onSubmit={(data) => {
            console.log("Auth submitted:", data);
            setIsLoggedIn(true);
            window.location.href = '/';
          }}
        />
      )} />
      
      <Route component={() => (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="text-primary hover:underline"
            >
              Go back home
            </button>
          </div>
        </div>
      )} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
