import { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
}

const CATEGORIES = [
  "QS",
  "Digital",
  "Analysis",
  "ICT Leadership",
  "Design",
  "Web",
  "3D",
];

export function SkillsManager() {
  const { toast } = useToast();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const resetForm = () => {
    setFormData({ name: "", description: "", category: "" });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.category) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const newSkill: Skill = {
      id: Date.now().toString(),
      ...formData,
    };

    setSkills(prev => [...prev, newSkill]);
    toast({ title: "Skill Added", description: `${formData.name} has been added.` });
    resetForm();
    setIsLoading(false);
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      description: skill.description,
      category: skill.category,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    setSkills(prev =>
      prev.map(s =>
        s.id === editingId
          ? { ...s, ...formData }
          : s
      )
    );

    toast({ title: "Skill Updated", description: "Changes have been saved." });
    resetForm();
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    toast({ title: "Skill Deleted", description: "The skill has been removed." });
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-card rounded-2xl p-6 card-shadow">
          <h3 className="font-semibold text-foreground mb-4">
            {editingId ? "Edit Skill" : "Add New Skill"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Skill Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Cost Estimation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category *
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of your expertise..."
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={editingId ? handleUpdate : handleAdd}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {editingId ? "Update" : "Add"} Skill
            </Button>
            <Button variant="outline" onClick={resetForm}>
              <X size={16} />
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Add Button */}
      {!isAdding && !editingId && (
        <Button onClick={() => setIsAdding(true)}>
          <Plus size={16} />
          Add New Skill
        </Button>
      )}

      {/* Skills List */}
      {skills.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {category}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map(skill => (
                  <div
                    key={skill.id}
                    className="bg-card rounded-xl p-4 card-shadow group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{skill.name}</h4>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(skill)}
                          className="p-1 text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="p-1 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl p-12 card-shadow text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
            <Plus size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">No Skills Yet</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Add your professional skills and competencies to showcase your expertise.
          </p>
        </div>
      )}
    </div>
  );
}
