import { MessageCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultAvatar from "@assets/generated_images/Default_user_avatar_8c4a1d9d.png";

interface QuestionCardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
  isAnonymous?: boolean;
  isExpert?: boolean;
  timestamp: string;
  replyCount: number;
  isNew?: boolean;
  onClick?: () => void;
}

export default function QuestionCard({
  id,
  title,
  description,
  author,
  authorAvatar,
  isAnonymous = false,
  isExpert = false,
  timestamp,
  replyCount,
  isNew = false,
  onClick,
}: QuestionCardProps) {
  return (
    <Card
      className="p-6 hover-elevate active-elevate-2 cursor-pointer"
      onClick={onClick}
      data-testid={`card-question-${id}`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-semibold" data-testid="text-question-title">
                {title}
              </h3>
              {isNew && (
                <Badge variant="secondary" className="text-xs" data-testid="badge-new">
                  New
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground line-clamp-2" data-testid="text-question-description">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={isAnonymous ? defaultAvatar : authorAvatar} />
              <AvatarFallback>{author.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium" data-testid="text-author">
                {isAnonymous ? "Anonymous" : author}
              </span>
              {isExpert && !isAnonymous && (
                <Badge variant="outline" className="text-xs border-primary text-primary" data-testid="badge-expert">
                  ✓ Expert
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1" data-testid="text-timestamp">
              <Clock className="h-4 w-4" />
              {timestamp}
            </div>
            <div className="flex items-center gap-1" data-testid="text-reply-count">
              <MessageCircle className="h-4 w-4" />
              {replyCount} {replyCount === 1 ? "reply" : "replies"}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
