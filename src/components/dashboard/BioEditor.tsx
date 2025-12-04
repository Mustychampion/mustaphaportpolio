import { useState, useEffect, useCallback } from "react";
import { Save, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function BioEditor() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [bio, setBio] = useState(`As the CEO of ValorTrust Solution & Consultant Nig. Ltd, I bring a unique blend of entrepreneurial vision and technical expertise in Quantity Surveying. Currently pursuing my professional education, I am committed to delivering exceptional value in cost management, project consulting, and construction economics.

My journey combines academic rigor with practical business leadership, enabling me to understand both the technical and strategic aspects of project delivery. I believe in precision, integrity, and innovative solutions that create lasting value for clients and stakeholders.`);

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    setAutoSaveStatus("saving");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setAutoSaveStatus("saved");
    setTimeout(() => setAutoSaveStatus("idle"), 2000);
  }, []);

  // Debounced auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      if (bio.trim()) {
        autoSave();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [bio, autoSave]);

  const handleManualSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Bio Saved",
      description: "Your professional statement has been updated.",
    });
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-card rounded-2xl p-6 lg:p-8 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-semibold text-xl text-foreground">
              CEO Statement / Bio
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Write your professional summary that appears on your portfolio
            </p>
          </div>
          {autoSaveStatus !== "idle" && (
            <div className="flex items-center gap-2 text-sm">
              {autoSaveStatus === "saving" && (
                <>
                  <Loader2 size={14} className="animate-spin text-muted-foreground" />
                  <span className="text-muted-foreground">Saving...</span>
                </>
              )}
              {autoSaveStatus === "saved" && (
                <>
                  <Check size={14} className="text-primary" />
                  <span className="text-primary">Auto-saved</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write your professional summary here..."
            rows={12}
            className="resize-none text-base leading-relaxed"
          />
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{bio.length} characters</span>
            <span>Changes auto-save after 2 seconds</span>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
          <h4 className="font-medium text-foreground text-sm mb-2">Writing Tips</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Keep it professional and concise (2-3 paragraphs ideal)</li>
            <li>• Highlight your unique value proposition</li>
            <li>• Mention key achievements and expertise areas</li>
            <li>• Include your professional goals and vision</li>
          </ul>
        </div>

        {/* Manual Save */}
        <div className="mt-8 pt-6 border-t border-border flex justify-end">
          <Button onClick={handleManualSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Now
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
