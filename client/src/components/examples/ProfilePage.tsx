import ProfilePage from '../ProfilePage';

const mockUser = {
  username: "Dr. Sarah Mitchell",
  email: "sarah.mitchell@healthmail.com",
  isExpert: true,
  joinDate: "January 2024",
  bio: "Board-certified physician specializing in internal medicine and preventive care. Passionate about patient education and evidence-based health information.",
};

const mockStats = {
  questionsAsked: 5,
  answersGiven: 47,
  helpfulVotes: 312,
};

const mockQuestions = [
  {
    id: "1",
    title: "What are the latest guidelines for blood pressure management?",
    description: "Looking for updated recommendations on hypertension treatment thresholds.",
    author: "Dr. Sarah Mitchell",
    isExpert: true,
    timestamp: "2 days ago",
    replyCount: 8,
  },
];

const mockAnswers = [
  {
    id: "1",
    questionTitle: "What are the best foods to boost immune system?",
    content: "The immune system benefits greatly from a balanced diet rich in vitamins C and D, zinc, and probiotics. Focus on citrus fruits, leafy greens, fatty fish, nuts, and fermented foods. Regular consumption of these foods, combined with adequate sleep and exercise, provides the best natural immune support.",
    timestamp: "1 day ago",
    upvotes: 42,
  },
  {
    id: "2",
    questionTitle: "How much exercise is needed for heart health?",
    content: "Current guidelines recommend at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity per week, plus muscle-strengthening activities twice weekly. Even small amounts of physical activity are beneficial if you're just starting.",
    timestamp: "3 days ago",
    upvotes: 28,
  },
];

export default function ProfilePageExample() {
  return (
    <ProfilePage
      user={mockUser}
      stats={mockStats}
      questions={mockQuestions}
      answers={mockAnswers}
    />
  );
}
