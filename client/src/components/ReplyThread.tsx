import { useState } from "react";
import { ThumbsUp, MessageCircle, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import defaultAvatar from "@assets/generated_images/Default_user_avatar_8c4a1d9d.png";

interface Reply {
  id: string;
  content: string;
  author: string;
  authorAvatar?: string;
  isAnonymous?: boolean;
  isExpert?: boolean;
  timestamp: string;
  upvotes: number;
  replies?: Reply[];
}

interface ReplyThreadProps {
  reply: Reply;
  depth?: number;
  onReply?: (replyId: string, content: string) => void;
}

function ReplyItem({ reply, depth = 0, onReply }: ReplyThreadProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [upvoted, setUpvoted] = useState(false);

  const maxDepth = 3;
  const canReply = depth < maxDepth;

  const handleSubmitReply = () => {
    if (replyContent.trim() && onReply) {
      onReply(reply.id, replyContent);
      setReplyContent("");
      setShowReplyForm(false);
    }
  };

  return (
    <div className={`${depth > 0 ? "ml-8 border-l-4 border-muted pl-4" : ""}`} data-testid={`reply-${reply.id}`}>
      <div className="py-4 space-y-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={reply.isAnonymous ? defaultAvatar : reply.authorAvatar} />
            <AvatarFallback>{reply.author.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium" data-testid="text-reply-author">
                {reply.isAnonymous ? "Anonymous User" : reply.author}
              </span>
              {reply.isExpert && !reply.isAnonymous && (
                <Badge variant="outline" className="text-xs border-primary text-primary" data-testid="badge-expert">
                  ✓ Expert
                </Badge>
              )}
              <span className="text-xs text-muted-foreground" data-testid="text-reply-timestamp">
                {reply.timestamp}
              </span>
            </div>
            
            <p className="text-sm leading-relaxed" data-testid="text-reply-content">
              {reply.content}
            </p>
            
            <div className="flex items-center gap-2 pt-1">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 gap-1 ${upvoted ? "text-primary" : ""}`}
                onClick={() => setUpvoted(!upvoted)}
                data-testid="button-upvote"
              >
                <ThumbsUp className="h-3 w-3" />
                <span className="text-xs">{reply.upvotes + (upvoted ? 1 : 0)}</span>
              </Button>
              
              {canReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  data-testid="button-reply"
                >
                  <MessageCircle className="h-3 w-3" />
                  <span className="text-xs">Reply</span>
                </Button>
              )}
              
              <Button variant="ghost" size="sm" className="h-8" data-testid="button-more">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
            
            {showReplyForm && (
              <div className="space-y-2 pt-2">
                <Textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-20 text-sm"
                  data-testid="input-reply"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSubmitReply} data-testid="button-submit-reply">
                    Submit
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowReplyForm(false)} data-testid="button-cancel-reply">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {reply.replies && reply.replies.length > 0 && (
        <div className="space-y-0">
          {reply.replies.map((childReply) => (
            <ReplyItem
              key={childReply.id}
              reply={childReply}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReplyThread({ reply, depth = 0, onReply }: ReplyThreadProps) {
  return <ReplyItem reply={reply} depth={depth} onReply={onReply} />;
}
