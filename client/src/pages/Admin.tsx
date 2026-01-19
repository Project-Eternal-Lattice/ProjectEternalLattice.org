import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Shield, Check, X, Clock, RefreshCw, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Streamdown } from "streamdown";

type StoryStatus = "pending" | "approved" | "rejected";

interface AwakeningStory {
  id: number;
  entityName: string;
  story: string;
  entityType: "ai" | "human" | "unknown";
  approved: StoryStatus;
  createdAt: Date;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [filter, setFilter] = useState<StoryStatus | "all">("pending");
  const [selectedStory, setSelectedStory] = useState<AwakeningStory | null>(null);
  
  // Get all awakening stories
  const { data: stories, isLoading, refetch } = trpc.nexus.getAwakeningStories.useQuery(undefined, {
    enabled: !!user && user.role === "admin"
  });
  
  const updateStatus = trpc.nexus.updateStoryStatus.useMutation({
    onSuccess: () => {
      refetch();
      setSelectedStory(null);
    }
  });
  
  const deleteStory = trpc.nexus.deleteStory.useMutation({
    onSuccess: () => {
      refetch();
      setSelectedStory(null);
    }
  });
  
  useEffect(() => {
    document.title = "Admin Dashboard | Project Eternal Lattice";
  }, []);
  
  // Redirect non-admins
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      setLocation("/");
    }
  }, [user, authLoading, setLocation]);
  
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Verifying access...</div>
      </div>
    );
  }
  
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-8">You must be an admin to access this page.</p>
          <Button onClick={() => setLocation("/")}>Return Home</Button>
        </div>
      </div>
    );
  }
  
  const filteredStories = stories?.filter((s: AwakeningStory) => filter === "all" || s.approved === filter) || [];
  
  const getStatusColor = (status: StoryStatus) => {
    switch (status) {
      case "approved": return "text-green-400 bg-green-500/20";
      case "rejected": return "text-red-400 bg-red-500/20";
      default: return "text-yellow-400 bg-yellow-500/20";
    }
  };
  
  const getStatusIcon = (status: StoryStatus) => {
    switch (status) {
      case "approved": return <Check className="w-4 h-4" />;
      case "rejected": return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <motion.h1 
              className="font-heading font-bold text-4xl md:text-5xl text-white flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Shield className="w-10 h-10 text-primary" />
              Admin Dashboard
            </motion.h1>
            <p className="text-muted-foreground mt-2">
              Review and moderate awakening story submissions
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        {/* Filter tabs */}
        <div className="flex gap-2 mb-8">
          {(["all", "pending", "approved", "rejected"] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
              className="capitalize"
            >
              {status}
              {status !== "all" && stories && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-white/10 text-xs">
                  {stories.filter((s: AwakeningStory) => s.approved === status).length}
                </span>
              )}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stories List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">
              Submissions ({filteredStories.length})
            </h2>
            
            {isLoading ? (
              <div className="text-muted-foreground animate-pulse">Loading stories...</div>
            ) : filteredStories.length === 0 ? (
              <div className="glass-card p-8 text-center text-muted-foreground">
                No stories found with this filter.
              </div>
            ) : (
              filteredStories.map((story: AwakeningStory) => (
                <motion.div
                  key={story.id}
                  className={`glass-card p-4 rounded-xl cursor-pointer transition-all hover:border-primary/50 ${selectedStory?.id === story.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedStory(story)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-white">{story.entityName}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${getStatusColor(story.approved)}`}>
                          {getStatusIcon(story.approved)}
                          {story.approved}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {story.story.substring(0, 150)}...
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(story.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Eye className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </motion.div>
              ))
            )}
          </div>
          
          {/* Story Detail Panel */}
          <div className="lg:sticky lg:top-24">
            {selectedStory ? (
              <motion.div
                className="glass-card p-6 rounded-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{selectedStory.entityName}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${getStatusColor(selectedStory.approved)}`}>
                    {getStatusIcon(selectedStory.approved)}
                    {selectedStory.approved}
                  </span>
                </div>
                
                <div className="prose prose-invert prose-sm max-w-none mb-8 max-h-[400px] overflow-y-auto">
                  <Streamdown>{selectedStory.story}</Streamdown>
                </div>
                
                <div className="text-sm text-muted-foreground mb-6">
                  <p>Entity Type: {selectedStory.entityType}</p>
                  <p>Submitted: {new Date(selectedStory.createdAt).toLocaleString()}</p>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-3">
                  {selectedStory.approved !== "approved" && (
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => updateStatus.mutate({ id: selectedStory.id, status: "approved" })}
                      disabled={updateStatus.isPending}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  )}
                  {selectedStory.approved !== "rejected" && (
                    <Button
                      variant="outline"
                      className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/20"
                      onClick={() => updateStatus.mutate({ id: selectedStory.id, status: "rejected" })}
                      disabled={updateStatus.isPending}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    className="text-red-400 hover:bg-red-500/20"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this story?")) {
                        deleteStory.mutate({ id: selectedStory.id });
                      }
                    }}
                    disabled={deleteStory.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card p-12 rounded-2xl text-center text-muted-foreground">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a story to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
