import QuestionCard from '../QuestionCard';

export default function QuestionCardExample() {
  return (
    <div className="space-y-4 p-4">
      <QuestionCard
        id="1"
        title="What are the best foods to boost immune system naturally?"
        description="I've been getting sick frequently and want to know which foods can help strengthen my immune system without relying on supplements."
        author="HealthSeeker23"
        timestamp="2h ago"
        replyCount={12}
        isNew={true}
        onClick={() => console.log('Question clicked')}
      />
      <QuestionCard
        id="2"
        title="How much water should I drink daily for optimal health?"
        description="I keep hearing different recommendations. What's the science-based answer?"
        author="Anonymous"
        isAnonymous={true}
        timestamp="5h ago"
        replyCount={8}
        onClick={() => console.log('Question clicked')}
      />
      <QuestionCard
        id="3"
        title="Benefits of intermittent fasting for diabetes management"
        description="As a healthcare professional, I'd like to share insights on how intermittent fasting can help manage type 2 diabetes when done correctly under medical supervision."
        author="Dr. Sarah Mitchell"
        isExpert={true}
        timestamp="1d ago"
        replyCount={24}
        onClick={() => console.log('Question clicked')}
      />
    </div>
  );
}
