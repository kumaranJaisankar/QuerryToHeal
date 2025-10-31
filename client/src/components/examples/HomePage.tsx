import HomePage from '../HomePage';

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

export default function HomePageExample() {
  return (
    <HomePage
      isLoggedIn={true}
      username="JohnDoe"
      questions={mockQuestions}
      onQuestionClick={(id) => console.log('Question clicked:', id)}
    />
  );
}
