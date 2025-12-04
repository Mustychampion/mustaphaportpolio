import { useState } from "react";
import { Camera, Save, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function ProfileManager() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "Mustapha Sani Jibril",
    roles: "CEO, ValorTrust Solution & Consultant Nig. Ltd",
    tagline: "Building excellence through precision cost management",
    location: "Nigeria",
    phone: "+234 XXX XXX XXXX",
    email: "contact@mustaphasani.com",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate save - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-card rounded-2xl p-6 lg:p-8 card-shadow">
        <h2 className="font-display font-semibold text-xl text-foreground mb-6">
          Profile Information
        </h2>

        {/* Profile Photo */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-muted overflow-hidden flex items-center justify-center">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={32} className="text-muted-foreground" />
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
              <Camera size={14} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Profile Photo</h3>
            <p className="text-sm text-muted-foreground">
              Upload a professional photo (max 5MB)
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Roles / Titles
            </label>
            <Input
              name="roles"
              value={formData.roles}
              onChange={handleChange}
              placeholder="e.g., CEO, Quantity Surveyor"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Separate multiple roles with commas
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tagline
            </label>
            <Input
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="A short professional tagline"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 XXX XXX XXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-border flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
