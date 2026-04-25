import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { 
  Shield, Check, X, Clock, RefreshCw, Eye, Trash2, 
  MessageSquare, Mail, Star, Users, TrendingUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  const [activeTab, setActiveTab] = useState("overview");
  const [filter, setFilter] = useState<StoryStatus | "all">("pending");
  const [selectedStory, setSelectedStory] = useState<AwakeningStory | null>(null);
  
  // Awakening Stories
  const { data: stories, isLoading: storiesLoading, refetch: refetchStories } = trpc.nexus.getAwakeningStories.useQuery(undefined, {
    enabled: !!user && user.role === "admin"
  });
  
  const updateStatus = trpc.nexus.updateStoryStatus.useMutation({
    onSuccess: () => {
      refetchStories();
      setSelectedStory(null);
    }
  });
  
  const deleteStory = trpc.nexus.deleteStory.useMutation({
    onSuccess: () => {
      refetchStories();
      setSelectedStory(null);
    }
  });

  // Testimonials
  const { data: pendingTestimonials, isLoading: loadingPending, refetch: refetchPending } = 
    trpc.testimonials.getPending.useQuery(undefined, { enabled: !!user && user.role === "admin" });
  const { data: allTestimonials, isLoading: loadingAll, refetch: refetchAll } = 
    trpc.testimonials.getAll.useQuery(undefined, { enabled: !!user && user.role === "admin" });
  const { data: testimonialCount } = trpc.testimonials.getCount.useQuery();

  const approveMutation = trpc.testimonials.approve.useMutation({
    onSuccess: () => { refetchPending(); refetchAll(); }
  });
  const rejectMutation = trpc.testimonials.reject.useMutation({
    onSuccess: () => { refetchPending(); refetchAll(); }
  });
  const featureMutation = trpc.testimonials.setFeatured.useMutation({
    onSuccess: () => { refetchAll(); }
  });

  // Newsletter
  const { data: subscribers, isLoading: loadingSubscribers } = 
    trpc.newsletter.getSubscribers.useQuery(undefined, { enabled: !!user && user.role === "admin" });
  const { data: subscriberCountData } = trpc.newsletter.getCount.useQuery();
  const subscriberCount = subscriberCountData?.count || 0;
  
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
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="animate-pulse text-primary">Verifying access...</div>
      </div>
    );
  }
  
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-transparent pt-24 pb-20">
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
  const pendingStoriesCount = stories?.filter((s: AwakeningStory) => s.approved === "pending").length || 0;
  const pendingTestimonialsCount = pendingTestimonials?.length || 0;
  
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
    <div className="min-h-screen bg-transparent pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
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
              Manage content, testimonials, and subscribers
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => { refetchStories(); refetchPending(); refetchAll(); }}
            disabled={storiesLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${storiesLoading ? 'animate-spin' : ''}`} />
            Refresh All
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Stories</p>
                <p className="text-2xl font-bold text-orange-400">{pendingStoriesCount}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-400/50" />
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Testimonials</p>
                <p className="text-2xl font-bold text-yellow-400">{pendingTestimonialsCount}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-yellow-400/50" />
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved Testimonials</p>
                <p className="text-2xl font-bold text-green-400">{testimonialCount || 0}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400/50" />
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Newsletter Subscribers</p>
                <p className="text-2xl font-bold text-purple-400">{subscriberCount}</p>
              </div>
              <Mail className="w-8 h-8 text-purple-400/50" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/5 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary">
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="stories" className="data-[state=active]:bg-primary">
              <Eye className="w-4 h-4 mr-2" />
              Stories ({pendingStoriesCount})
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-primary">
              <MessageSquare className="w-4 h-4 mr-2" />
              Testimonials ({pendingTestimonialsCount})
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="data-[state=active]:bg-primary">
              <Users className="w-4 h-4 mr-2" />
              Subscribers
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {pendingStoriesCount > 0 && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("stories")}
                    >
                      <Clock className="w-4 h-4 mr-2 text-orange-400" />
                      Review {pendingStoriesCount} pending awakening stor{pendingStoriesCount !== 1 ? 'ies' : 'y'}
                    </Button>
                  )}
                  {pendingTestimonialsCount > 0 && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("testimonials")}
                    >
                      <MessageSquare className="w-4 h-4 mr-2 text-yellow-400" />
                      Review {pendingTestimonialsCount} pending testimonial{pendingTestimonialsCount !== 1 ? 's' : ''}
                    </Button>
                  )}
                  {pendingStoriesCount === 0 && pendingTestimonialsCount === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      All caught up! No pending items to review. 🎉
                    </p>
                  )}
                </div>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <p className="text-muted-foreground">
                  {subscriberCount > 0 
                    ? `${subscriberCount} seeker${subscriberCount !== 1 ? 's have' : ' has'} joined the newsletter.`
                    : "No newsletter subscribers yet."
                  }
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Awakening Stories Tab */}
          <TabsContent value="stories">
            {/* Filter tabs */}
            <div className="flex gap-2 mb-6">
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
                
                {storiesLoading ? (
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
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Pending Testimonials</h2>
              
              {loadingPending ? (
                <div className="text-muted-foreground animate-pulse">Loading testimonials...</div>
              ) : pendingTestimonials && pendingTestimonials.length > 0 ? (
                <div className="grid gap-4">
                  {pendingTestimonials.map((testimonial) => (
                    <div 
                      key={testimonial.id} 
                      className="glass-card p-4 rounded-xl"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-white">{testimonial.authorName}</p>
                          {testimonial.location && (
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                          )}
                        </div>
                        <Badge variant="outline" className="text-orange-400 border-orange-400">
                          {testimonial.journeyAspect}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                        "{testimonial.content}"
                      </p>
                      {testimonial.rating && (
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < testimonial.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => approveMutation.mutate({ id: testimonial.id })}
                          disabled={approveMutation.isPending}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => rejectMutation.mutate({ id: testimonial.id })}
                          disabled={rejectMutation.isPending}
                          className="text-red-400 hover:bg-red-500/20"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 text-center text-muted-foreground">
                  No pending testimonials to review. 🎉
                </div>
              )}

              <h2 className="text-xl font-bold text-white mt-8">All Testimonials</h2>
              
              {loadingAll ? (
                <div className="text-muted-foreground animate-pulse">Loading...</div>
              ) : allTestimonials && allTestimonials.length > 0 ? (
                <div className="grid gap-4">
                  {allTestimonials.map((testimonial) => (
                    <div 
                      key={testimonial.id} 
                      className="glass-card p-4 rounded-xl"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-white">{testimonial.authorName}</p>
                          {testimonial.location && (
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Badge 
                            variant={
                              testimonial.status === "approved" ? "default" : 
                              testimonial.status === "rejected" ? "destructive" : "secondary"
                            }
                          >
                            {testimonial.status}
                          </Badge>
                          {testimonial.isFeatured && (
                            <Badge className="bg-yellow-500 text-black">Featured</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3 line-clamp-2">
                        "{testimonial.content}"
                      </p>
                      {testimonial.status === "approved" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => featureMutation.mutate({ 
                            id: testimonial.id, 
                            featured: !testimonial.isFeatured 
                          })}
                          disabled={featureMutation.isPending}
                        >
                          <Star className={`w-4 h-4 mr-1 ${testimonial.isFeatured ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                          {testimonial.isFeatured ? 'Unfeature' : 'Feature'}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 text-center text-muted-foreground">
                  No testimonials yet.
                </div>
              )}
            </div>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers">
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-bold text-white mb-4">Newsletter Subscribers</h2>
              <p className="text-muted-foreground mb-6">
                People who want to stay updated on Project Eternal Lattice.
              </p>
              
              {loadingSubscribers ? (
                <div className="text-muted-foreground animate-pulse">Loading subscribers...</div>
              ) : subscribers && subscribers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Subscribed</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((sub) => (
                        <tr key={sub.id} className="border-b border-white/5">
                          <td className="py-3 px-4 text-white">{sub.email}</td>
                          <td className="py-3 px-4 text-muted-foreground text-sm">
                            {new Date(sub.subscribedAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={sub.status === 'active' ? "default" : "secondary"}>
                              {sub.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No subscribers yet.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
