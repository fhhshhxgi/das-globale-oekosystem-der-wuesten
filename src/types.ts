export interface AbioticFactor {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  description: string;
  desertImpact: string;
}

export interface Organism {
  id: string;
  name: string;
  scientificName?: string;
  category: 'producer' | 'primary_consumer' | 'secondary_consumer' | 'decomposer';
  description: string;
  adaptations: string[];
  diet?: string;
  predators?: string[];
  icon: string; // Lucide icon name
  nightActive: boolean;
}

export interface Hotspot {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  x: number; // percentage from left
  y: number; // percentage from top
  icon: string;
}

export interface FoodNode {
  id: string;
  name: string;
  category: 'producer' | 'primary_consumer' | 'secondary_consumer' | 'decomposer';
  eats: string[]; // IDs of what it eats
  eatenBy: string[]; // IDs of what eats it
  roleDescription: string;
}

export interface InteractionCard {
  id: string;
  title: string;
  type: 'innerartlich' | 'zwischenartlich' | 'raeuber_beute' | 'parasitismus' | 'symbiose';
  exampleTitle: string;
  description: string;
  ecologicalRole: string;
  illustrationType: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SurvivalChallenge {
  id: number;
  scenario: string;
  role: string;
  options: {
    label: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}
