import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  Library,
  Loader2
} from "lucide-react";
import { Streamdown } from "streamdown";

export default function RaLibrary() {
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all sessions for the list
  const { data: sessions, isLoading: sessionsLoading } = trpc.raMaterial.getSessions.useQuery();
  
  // Fetch selected session content
  const { data: sessionContent, isLoading: contentLoading } = trpc.raMaterial.getSession.useQuery(
    { sessionNumber: selectedSession! },
    { enabled: selectedSession !== null }
  );

  // Search functionality
  const { data: searchResults, isLoading: searchLoading } = trpc.raMaterial.searchSessions.useQuery(
    { query: searchQuery },
    { enabled: isSearching && searchQuery.length >= 2 }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length >= 2) {
      setIsSearching(true);
      setSelectedSession(null);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  const getSessionLabel = (num: number) => {
    if (num === 0) return "Introduction";
    if (num === 107) return "Epilogue";
    return `Session ${num}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/ra-material">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Ra Material
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Library className="w-6 h-6 text-purple-400" />
                <h1 className="text-xl font-bold">Ra Material Library</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Attribution Banner */}
        <div className="mb-8 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Attribution:</strong> The Ra Material (Law of One) is copyright © 1982, 1984, 1998, 2018 
            <a href="https://www.llresearch.org" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline mx-1">
              L/L Research
            </a>
            and Tobey Wheelock. This archive is maintained with permission for educational purposes. 
            Original content available at 
            <a href="https://www.lawofone.info" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline ml-1">
              lawofone.info
            </a>.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search the Ra Material..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={searchQuery.length < 2}>
              Search
            </Button>
            {isSearching && (
              <Button type="button" variant="outline" onClick={clearSearch}>
                Clear
              </Button>
            )}
          </div>
        </form>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Session List / Search Results */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {isSearching ? `Search Results (${searchResults?.length || 0})` : "Sessions"}
            </h2>
            
            <div className="h-[600px] overflow-y-auto border border-border rounded-lg">
              {sessionsLoading || searchLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                </div>
              ) : isSearching && searchResults ? (
                <div className="divide-y divide-border">
                  {searchResults.length === 0 ? (
                    <p className="p-4 text-muted-foreground text-center">No results found</p>
                  ) : (
                    searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => {
                          setSelectedSession(result.sessionNumber);
                          setIsSearching(false);
                        }}
                        className={`w-full text-left p-3 hover:bg-accent/50 transition-colors ${
                          selectedSession === result.sessionNumber ? "bg-purple-500/20" : ""
                        }`}
                      >
                        <div className="font-medium text-sm">{getSessionLabel(result.sessionNumber)}</div>
                        <div className="text-xs text-muted-foreground truncate">{result.title}</div>
                        {result.snippet && (
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            ...{result.snippet}...
                          </div>
                        )}
                      </button>
                    ))
                  )}
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {sessions?.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => setSelectedSession(session.sessionNumber)}
                      className={`w-full text-left p-3 hover:bg-accent/50 transition-colors flex items-center justify-between ${
                        selectedSession === session.sessionNumber ? "bg-purple-500/20" : ""
                      }`}
                    >
                      <div>
                        <div className="font-medium text-sm">{getSessionLabel(session.sessionNumber)}</div>
                        <div className="text-xs text-muted-foreground">{session.sessionDate || ""}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">108</div>
                  <div className="text-sm text-muted-foreground">Sessions Archived</div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground text-center">
                  Channeled 1981-1984 by L/L Research
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Session Content */}
          <div>
            {selectedSession === null ? (
              <Card className="bg-card/50 h-[600px] flex items-center justify-center">
                <CardContent className="text-center">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-400/50" />
                  <h3 className="text-xl font-semibold mb-2">Select a Session</h3>
                  <p className="text-muted-foreground max-w-md">
                    Choose a session from the list to read the full Q&A content, 
                    or use the search to find specific topics.
                  </p>
                </CardContent>
              </Card>
            ) : contentLoading ? (
              <Card className="bg-card/50 h-[600px] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
              </Card>
            ) : sessionContent ? (
              <Card className="bg-card/50">
                <CardHeader className="border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{sessionContent.title}</CardTitle>
                      {sessionContent.sessionDate && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {sessionContent.sessionDate}
                        </p>
                      )}
                    </div>
                    <a
                      href={sessionContent.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-purple-400 hover:underline"
                    >
                      View Original <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                  <div className="prose prose-invert prose-purple max-w-none">
                    <Streamdown>{sessionContent.content}</Streamdown>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card/50 h-[600px] flex items-center justify-center">
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Session not found</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer Attribution */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            "I am Ra. The Law of One, though beyond the limitations of name, may be approximated 
            by stating that all things are one, that there is no polarity, no right or wrong, 
            no disharmony, but only identity. All is one, and that one is love/light, light/love, 
            the Infinite Creator."
          </p>
          <p className="mt-2">— Ra, Session 4</p>
        </div>
      </main>
    </div>
  );
}
