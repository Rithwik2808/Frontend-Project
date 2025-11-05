import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, FileText, Users, LogOut, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Session {
  id: string;
  title: string;
  datetime: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionDatetime, setSessionDatetime] = useState("");
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const addSession = () => {
    if (!sessionTitle || !sessionDatetime) {
      toast.error("Please fill in all fields");
      return;
    }

    const newSession: Session = {
      id: Date.now().toString(),
      title: sessionTitle,
      datetime: sessionDatetime,
    };

    setSessions([...sessions, newSession]);
    setSessionTitle("");
    setSessionDatetime("");
    toast.success("Session added successfully!");
  };

  const togglePanel = (panel: string) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className="min-h-screen gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-soft sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 gradient-primary rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Manage conference operations</p>
            </div>
          </div>
          <Button variant="destructive" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="shadow-soft border-0 cursor-pointer transition-smooth hover:shadow-medium" onClick={() => togglePanel("sessions")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Manage Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sessions.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active sessions</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 cursor-pointer transition-smooth hover:shadow-medium" onClick={() => togglePanel("papers")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Paper Submissions</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">Pending review</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 cursor-pointer transition-smooth hover:shadow-medium" onClick={() => togglePanel("reviews")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Peer Reviews</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">Reviewers assigned</p>
            </CardContent>
          </Card>
        </div>

        {/* Session Management Panel */}
        {activePanel === "sessions" && (
          <Card className="shadow-medium border-0 animate-fade-in">
            <CardHeader>
              <CardTitle>Manage Sessions</CardTitle>
              <CardDescription>Create and organize conference sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Title</label>
                  <Input
                    placeholder="e.g., AI in Healthcare"
                    value={sessionTitle}
                    onChange={(e) => setSessionTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date & Time</label>
                  <Input
                    type="datetime-local"
                    value={sessionDatetime}
                    onChange={(e) => setSessionDatetime(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={addSession} className="gradient-primary hover:opacity-90 transition-smooth gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Session
              </Button>

              {sessions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium">Active Sessions</h3>
                  <div className="space-y-2">
                    {sessions.map((session) => (
                      <div key={session.id} className="p-4 bg-secondary rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-medium">{session.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(session.datetime).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Paper Submissions Panel */}
        {activePanel === "papers" && (
          <Card className="shadow-medium border-0 animate-fade-in">
            <CardHeader>
              <CardTitle>Paper Submissions</CardTitle>
              <CardDescription>Review and manage submitted papers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Paper Title</label>
                <Input placeholder="Enter paper title" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Paper</label>
                <Input type="file" accept=".pdf,.doc,.docx" />
              </div>
              <Button className="gradient-primary hover:opacity-90 transition-smooth">Upload Paper</Button>
            </CardContent>
          </Card>
        )}

        {/* Peer Reviews Panel */}
        {activePanel === "reviews" && (
          <Card className="shadow-medium border-0 animate-fade-in">
            <CardHeader>
              <CardTitle>Peer Reviews</CardTitle>
              <CardDescription>Assign reviewers to submitted papers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Reviewer Name</label>
                <Input placeholder="Enter reviewer name" />
              </div>
              <Button className="gradient-primary hover:opacity-90 transition-smooth">Assign Reviewer</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
