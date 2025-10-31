import { useState } from "react";
import { Calendar, MessageCircle, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionCard from "./QuestionCard";
import defaultAvatar from "@assets/generated_images/Default_user_avatar_8c4a1d9d.png";

interface ProfilePageProps {
  user: {
    username: string;
    email: string;
    avatar?: string;
    isExpert: boolean;
    joinDate: string;
    bio?: string;
  };
  stats: {
    questionsAsked: number;
    answersGiven: number;
    helpfulVotes: number;
  };
  questions?: any[];
  answers?: any[];
}

export default function ProfilePage({ user, stats, questions = [], answers = [] }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("questions");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || defaultAvatar} />
                <AvatarFallback className="text-2xl">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl font-bold" data-testid="text-username">
                      {user.username}
                    </h1>
                    {user.isExpert && (
                      <Badge variant="outline" className="border-primary text-primary" data-testid="badge-expert">
                        ✓ Verified Expert
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1" data-testid="text-email">
                    {user.email}
                  </p>
                </div>

                {user.bio && (
                  <p className="text-foreground leading-relaxed" data-testid="text-bio">
                    {user.bio}
                  </p>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span data-testid="text-join-date">Joined {user.joinDate}</span>
                </div>

                <div className="flex gap-6 flex-wrap">
                  <div className="text-center" data-testid="stat-questions">
                    <div className="text-2xl font-bold text-primary">{stats.questionsAsked}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center" data-testid="stat-answers">
                    <div className="text-2xl font-bold text-primary">{stats.answersGiven}</div>
                    <div className="text-sm text-muted-foreground">Answers</div>
                  </div>
                  <div className="text-center" data-testid="stat-votes">
                    <div className="text-2xl font-bold text-primary">{stats.helpfulVotes}</div>
                    <div className="text-sm text-muted-foreground">Helpful Votes</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="questions" data-testid="tab-questions">
              <MessageCircle className="h-4 w-4 mr-2" />
              Questions ({questions.length})
            </TabsTrigger>
            <TabsTrigger value="answers" data-testid="tab-answers">
              <Award className="h-4 w-4 mr-2" />
              Answers ({answers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            {questions.length > 0 ? (
              questions.map((question) => (
                <QuestionCard key={question.id} {...question} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No questions asked yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="answers" className="space-y-4">
            {answers.length > 0 ? (
              answers.map((answer) => (
                <Card key={answer.id} className="hover-elevate active-elevate-2 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-base font-normal text-muted-foreground">
                      Answered on: {answer.questionTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">{answer.content}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <span>{answer.timestamp}</span>
                      <span>{answer.upvotes} upvotes</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No answers given yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
