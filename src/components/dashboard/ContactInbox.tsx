import { useState } from "react";
import { Mail, Check, Trash2, Reply, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export function ContactInbox() {
  const [messages, setMessages] = useState<Message[]>([
    // Sample messages for demo
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      subject: "Consulting Inquiry",
      message: "Hello Mustapha, I'm interested in your quantity surveying services for an upcoming commercial project. Could we schedule a call to discuss the details?",
      date: "2024-01-15",
      isRead: false,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@company.com",
      subject: "Internship Opportunity",
      message: "We have an internship position available at our construction firm. Based on your profile, we think you'd be a great fit. Please let us know if you're interested.",
      date: "2024-01-14",
      isRead: true,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const markAsRead = (id: string) => {
    setMessages(prev =>
      prev.map(m =>
        m.id === id ? { ...m, isRead: true } : m
      )
    );
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markAsRead(message.id);
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
      {/* Messages List */}
      <div className="lg:col-span-1 bg-card rounded-2xl card-shadow overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Inbox</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map(message => (
              <button
                key={message.id}
                onClick={() => handleSelectMessage(message)}
                className={cn(
                  "w-full p-4 text-left border-b border-border hover:bg-muted/50 transition-colors",
                  selectedMessage?.id === message.id && "bg-muted",
                  !message.isRead && "bg-primary/5"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    message.isRead ? "bg-transparent" : "bg-primary"
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={cn(
                        "text-sm truncate",
                        message.isRead ? "text-foreground" : "font-semibold text-foreground"
                      )}>
                        {message.name}
                      </p>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {new Date(message.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className={cn(
                      "text-sm truncate",
                      message.isRead ? "text-muted-foreground" : "text-foreground"
                    )}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {message.message}
                    </p>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center">
              <Mail size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm">No messages yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2 bg-card rounded-2xl card-shadow overflow-hidden flex flex-col">
        {selectedMessage ? (
          <>
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{selectedMessage.subject}</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Reply size={14} />
                    Reply
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selectedMessage.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-muted-foreground text-sm">
                  <Clock size={14} />
                  {new Date(selectedMessage.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Mail size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Select a Message</h3>
              <p className="text-muted-foreground text-sm">
                Choose a message from the inbox to view its contents
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
