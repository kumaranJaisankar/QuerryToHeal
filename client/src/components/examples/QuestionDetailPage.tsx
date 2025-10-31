import QuestionDetailPage from '../QuestionDetailPage';

const mockQuestion = {
  id: "1",
  title: "What are the best foods to boost immune system naturally?",
  description: "I've been getting sick frequently over the past few months and I'm looking for natural ways to strengthen my immune system. I know diet plays a crucial role, but there's so much conflicting information out there. Which foods are actually proven to help boost immunity? Should I focus on specific vitamins and minerals? Any advice would be greatly appreciated!",
  author: "HealthSeeker23",
  timestamp: "2 hours ago",
  replyCount: 5,
};

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
            content: "Food sources are generally preferred as they provide better nutrient absorption and contain beneficial compounds beyond just vitamins. Supplements should only be used if you have a confirmed deficiency, as determined by blood tests. Always consult with your doctor before starting any supplement regimen, as some can interact with medications or cause issues in high doses.",
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
    content: "I've found that adding garlic and ginger to my daily meals has really helped. Both have natural antimicrobial properties and are easy to incorporate into cooking.",
    author: "Anonymous",
    isAnonymous: true,
    timestamp: "2h ago",
    upvotes: 8,
  },
  {
    id: "3",
    content: "Don't forget about adequate sleep and stress management! I learned that chronic stress can significantly weaken your immune system, regardless of diet. Aim for 7-9 hours of quality sleep and consider meditation or yoga.",
    author: "WellnessJourney",
    timestamp: "1h ago",
    upvotes: 15,
  },
];

export default function QuestionDetailPageExample() {
  return (
    <QuestionDetailPage
      question={mockQuestion}
      replies={mockReplies}
      isLoggedIn={true}
      onBack={() => console.log('Back clicked')}
      onSubmitReply={(content, isAnonymous) => console.log('Reply submitted:', { content, isAnonymous })}
    />
  );
}
