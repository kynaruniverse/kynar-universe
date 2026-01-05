/* ==========================================================================
   KYNAR VAULT v10.0 (The Asset Database)
   Schema: ID | Title | Type | Specs | Payload | Link
   ========================================================================== */

export const vault = [
  
  /* --- SYSTEM 001: BUSINESS --- */
  {
    id: "sys-001",
    title: "The Founder's Protocol",
    type: "system",   // <--- NEW: Triggers "Stack" styling
    price: "£24.00",
    category: "business",
    image: "assets/images/founder-stack.webp", // Update path
    
    // THE SPEC SHEET (Replaces Description)
    objective: "A complete operating system for solo founders to manage cash flow and strategy.",
    human_note: "Perfect for creatives who hate spreadsheets but need to track money.",
    
    specs: {
      deploy_time: "15 Min Setup",
      format: "Notion + Excel",
      skill_level: "Intermediate"
    },
    
    payload: [
      "1x Master Dashboard (.Notion)",
      "2x Finance Trackers (.XLS)",
      "1x Strategy Guide (.PDF)"
    ],
    
    link: "#" // LemonSqueezy Link
  },

  /* --- TOOL 001: PRODUCTIVITY --- */
  {
    id: "tool-001",
    title: "Daily Focus Sheet",
    type: "tool",    // <--- NEW: Standard styling
    price: "£5.00",
    category: "personal",
    image: "assets/images/focus-sheet.webp",
    
    objective: "A printable analog framework for blocking time and prioritizing deep work.",
    human_note: "Print this out every morning. Pen and paper only.",
    
    specs: {
      deploy_time: "Daily Routine",
      format: "Printable PDF",
      skill_level: "Beginner"
    },
    
    payload: [
      "1x A4 PDF (Print Ready)",
      "1x A5 PDF (Planner Insert)"
    ],
    
    link: "#"
  },

  /* --- TOOL 002: CREATIVE --- */
  {
    id: "tool-002",
    title: "Writer's Block Breaker",
    type: "tool",
    price: "£8.00",
    category: "creative",
    image: "assets/images/writer-deck.webp",
    
    objective: "50 prompts designed to force lateral thinking and unstick narratives.",
    human_note: "Use card 12 when you're stuck in the middle of a chapter.",
    
    specs: {
      deploy_time: "Instant",
      format: "Digital Cards",
      skill_level: "All Levels"
    },
    
    payload: [
      "1x Digital Deck (.PDF)",
      "1x Randomizer Script"
    ],
    
    link: "#"
  }
  
  // ADD MORE PRODUCTS HERE FOLLOWING THIS PATTERN
];
