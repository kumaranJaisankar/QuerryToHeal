import ReplyThread from '../ReplyThread';

const mockReplies = [
  {
    id: "1",
    content: "The immune system is complex, but diet plays a crucial role. Focus on foods rich in vitamin C (citrus fruits, bell peppers), vitamin D (fatty fish, fortified dairy), and zinc (nuts, legumes). Probiotics from yogurt also help gut health, which is closely linked to immunity.",
    author: "Dr. Emily Chen",
    isExpert: true,
    timestamp: "1h ago",
    upvotes: 24,
    replies: [
      {
        id: "1-1",
        content: "Thank you! Should I take supplements or is food enough?",
        author: "HealthSeeker23",
        timestamp: "45m ago",
        upvotes: 3,
        replies: [
          {
            id: "1-1-1",
            content: "Food sources are generally preferred as they provide better nutrient absorption. Supplements should only be used if you have a confirmed deficiency, as determined by blood tests. Always consult with your doctor before starting any supplement regimen.",
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
];

export default function ReplyThreadExample() {
  return (
    <div className="space-y-4 p-4">
      {mockReplies.map((reply) => (
        <ReplyThread
          key={reply.id}
          reply={reply}
          onReply={(replyId, content) => console.log(`Reply to ${replyId}:`, content)}
        />
      ))}
    </div>
  );
}
