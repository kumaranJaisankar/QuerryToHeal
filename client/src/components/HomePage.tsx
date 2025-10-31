import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import HealthFactsBanner from "./HealthFactsBanner";
import QuestionCard from "./QuestionCard";
import AskQuestionModal from "./AskQuestionModal";

interface HomePageProps {
  isLoggedIn?: boolean;
  username?: string;
  questions?: any[];
  onQuestionClick?: (questionId: string) => void;
}

export default function HomePage({
  isLoggedIn = false,
  username = "Guest",
  questions = [],
  onQuestionClick,
}: HomePageProps) {
  const [askModalOpen, setAskModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        onAskQuestion={() => setAskModalOpen(true)}
      />

      <HealthFactsBanner />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Recent Questions</h1>
          <Button
            onClick={() => setAskModalOpen(true)}
            className="hidden md:flex"
            data-testid="button-ask-question-desktop"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ask Question
          </Button>
        </div>

        <div className="space-y-4">
          {questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard
                key={question.id}
                {...question}
                onClick={() => onQuestionClick?.(question.id)}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No questions yet. Be the first to ask!
            </div>
          )}
        </div>
      </div>

      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg md:hidden"
        onClick={() => setAskModalOpen(true)}
        data-testid="button-ask-question-mobile"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <AskQuestionModal
        open={askModalOpen}
        onClose={() => setAskModalOpen(false)}
        onSubmit={(data) => {
          console.log("Question submitted:", data);
          setAskModalOpen(false);
        }}
      />
    </div>
  );
}
