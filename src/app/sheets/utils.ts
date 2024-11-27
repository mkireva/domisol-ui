export function getCategoryFromName(name: string): string {
  const categories = {
    'Meditation': ['meditation', 'mindfulness', 'spiritual'],
    'Ritual': ['ritual', 'ceremony', 'sacred'],
    'Esoteric': ['esoteric', 'occult', 'mystical'],
    'Practice': ['exercise', 'practice', 'study']
  };

  const lowerName = name.toLowerCase();
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category;
    }
  }
  return "Practice";
}

export function getComposerDescription(name: string): string {
  const composerMap: { [key: string]: string } = {
    "Ancient Masters": "Traditional occult music teachings",
    "Mystical Traditions": "Sacred musical knowledge passed down through generations",
    "Esoteric Schools": "Advanced spiritual music practices",
    "Meditation Masters": "Guides for meditative sound practices"
  };

  for (const [composer, description] of Object.entries(composerMap)) {
    if (name.toLowerCase().includes(composer.toLowerCase())) {
      return description;
    }
  }

  return "Occult music exercise for spiritual development";
}

export function getSheetDescription(name: string): string {
  const descriptionMap: { [key: string]: string } = {
    "Meditation Exercise": "A carefully crafted sequence of notes designed to enhance meditation and spiritual awareness.",
    "Sacred Harmonies": "Traditional harmonic patterns used in spiritual ceremonies and rituals.",
    "Mystical Rhythms": "Ancient rhythmic patterns that facilitate altered states of consciousness.",
    "Energy Alignment": "Musical exercises for aligning and balancing spiritual energies.",
    "Sound Healing": "Therapeutic sound sequences based on ancient wisdom.",
    "Spiritual Awakening": "Progressive exercises for spiritual development through sound.",
  };

  for (const [key, description] of Object.entries(descriptionMap)) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      return description;
    }
  }

  return "An occult music exercise designed for spiritual development and practice.";
}
