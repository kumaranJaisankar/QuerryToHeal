import { useState } from "react";
import { ArrowLeft, Share2, Flag, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReplyThread from "./ReplyThread";
import defaultAvatar from "@assets/generated_images/Default_user_avatar_8c4a1d9d.png";

interface QuestionDetailPageProps {
  question: {
    id: string;
    title: string;
    description: string;
    author: string;
    authorAvatar?: string;
    isAnonymous?: boolean;
    isExpert?: boolean;
    timestamp: string;
    replyCount: number;
  };
  replies?: any[];
  onBack?: () => void;
  onSubmitReply?: (content: string, isAnonymous: boolean) => void;
  isLoggedIn?: boolean;
}

export default function QuestionDetailPage({
  question,
  replies = [],
  onBack,
  onSubmitReply,
  isLoggedIn = false,
}: QuestionDetailPageProps) {
  const [replyContent, setReplyContent] = useState("");
  const [replyAsAnonymous, setReplyAsAnonymous] = useState(false);
  const [sortBy, setSortBy] = useState("best");

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onSubmitReply?.(replyContent, replyAsAnonymous);
      setReplyContent("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6 -ml-2"
          onClick={onBack}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to questions
        </Button>

        <Card className="mb-8">
          <CardContent className="p-8 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4" data-testid="text-question-title">
                {question.title}
              </h1>
              <p className="text-foreground leading-relaxed text-lg" data-testid="text-question-description">
                {question.description}
              </p>
            </div>

            <Separator />

            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={question.isAnonymous ? defaultAvatar : question.authorAvatar} />
                  <AvatarFallback>{question.author.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium" data-testid="text-author">
                      {question.isAnonymous ? "Anonymous" : question.author}
                    </span>
                    {question.isExpert && !question.isAnonymous && (
                      <Badge variant="outline" className="border-primary text-primary" data-testid="badge-expert">
                        ✓ Expert
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground" data-testid="text-timestamp">
                    <Clock className="h-3 w-3" />
                    {question.timestamp}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm" data-testid="button-share">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" data-testid="button-report">
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold" data-testid="text-answers-header">
              {replies.length} {replies.length === 1 ? "Answer" : "Answers"}
            </h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32" data-testid="select-sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best">Best</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoggedIn && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <form onSubmit={handleSubmitReply} className="space-y-4">
                  <Textarea
                    placeholder="Write your answer..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-24"
                    data-testid="input-answer"
                  />
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={replyAsAnonymous}
                        onChange={(e) => setReplyAsAnonymous(e.target.checked)}
                        className="rounded"
                        data-testid="checkbox-anonymous"
                      />
                      <span className="text-sm">Post anonymously</span>
                    </label>
                    <Button type="submit" data-testid="button-submit-answer">
                      Post Answer
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {!isLoggedIn && (
            <Card className="mb-6">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground mb-4">Log in to post an answer</p>
                <Button data-testid="button-login-to-answer">Log In</Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-0 border rounded-lg">
          {replies.length > 0 ? (
            replies.map((reply) => (
              <ReplyThread
                key={reply.id}
                reply={reply}
                onReply={(replyId, content) => console.log(`Reply to ${replyId}:`, content)}
              />
            ))
          ) : (
            <div className="p-12 text-center text-muted-foreground">
              No answers yet. Be the first to help!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
