import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AskQuestionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: { title: string; description: string; isAnonymous: boolean }) => void;
}

export default function AskQuestionModal({ open, onClose, onSubmit }: AskQuestionModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postAs, setPostAs] = useState<"username" | "anonymous">("username");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit?.({
        title,
        description,
        isAnonymous: postAs === "anonymous",
      });
      setTitle("");
      setDescription("");
      setPostAs("username");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="modal-ask-question">
        <DialogHeader>
          <DialogTitle className="text-2xl">Ask a Health Question</DialogTitle>
          <DialogDescription>
            Share your health-related question with our community of experts and users.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">
              Question Title
            </Label>
            <Input
              id="title"
              placeholder="What would you like to know?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              data-testid="input-question-title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide more details about your question. Include any relevant context that might help others provide better answers."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 text-base resize-none"
              data-testid="input-question-description"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base">Post as</Label>
            <RadioGroup value={postAs} onValueChange={(v) => setPostAs(v as "username" | "anonymous")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="username" id="username" data-testid="radio-username" />
                <Label htmlFor="username" className="font-normal cursor-pointer">
                  Your username (recommended for building credibility)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="anonymous" id="anonymous" data-testid="radio-anonymous" />
                <Label htmlFor="anonymous" className="font-normal cursor-pointer">
                  Anonymous (your identity will be hidden)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-muted/50 rounded-md p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Community Guidelines:</strong> Please be respectful and provide accurate information. 
              Remember that answers here are for educational purposes and should not replace professional medical advice.
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="ghost" onClick={onClose} data-testid="button-cancel">
              Cancel
            </Button>
            <Button type="submit" data-testid="button-submit-question">
              Post Question
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
