# Design Guidelines: Rock-Paper-Scissors Monster Battle Game

## Design Approach
**Selected Approach**: Reference-Based (Gaming Experience)  
**Primary References**: Modern web-based games like Wordle, 2048, and casual gaming interfaces  
**Justification**: This is an entertainment-focused application where visual appeal and emotional engagement drive user retention. The gaming context calls for playful, vibrant design elements that create excitement around each battle round.

## Core Design Elements

### A. Color Palette
**Primary Colors (Dark Mode)**:
- Background: 220 25% 12% (deep navy)
- Surface: 220 20% 18% (elevated dark blue)
- Primary Action: 350 85% 60% (vibrant red for battle actions)

**Primary Colors (Light Mode)**:
- Background: 45 25% 96% (warm cream)
- Surface: 0 0% 100% (pure white)
- Primary Action: 350 75% 50% (strong red)

**Accent Colors**:
- Health (Good): 145 65% 45% (forest green)
- Health (Critical): 15 85% 55% (orange-red warning)
- Score/Victory: 260 60% 65% (purple for achievements)

### B. Typography
**Fonts**: Google Fonts CDN
- Primary: 'Inter' (clean, readable for UI text)
- Display: 'Fredoka One' (playful, game-like for headings and monster names)
- Monospace: 'JetBrains Mono' (for score/health counters)

**Hierarchy**:
- H1: 2.5rem, Fredoka One, bold (game title)
- H2: 1.75rem, Fredoka One, medium (section headers)
- Body: 1rem, Inter, regular (game text)
- UI Elements: 0.875rem, Inter, medium (buttons, labels)

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 8, 12, 16
- Micro spacing: p-2, m-2 (8px)
- Component spacing: p-4, m-4 (16px) 
- Section spacing: p-8, m-8 (32px)
- Large gaps: gap-12, p-16 (48px, 64px)

**Grid Structure**: Single-column centered layout with max-width constraints for optimal readability on all devices.

### D. Component Library

**Core Game Components**:
- **Battle Arena**: Central card-based interface with monster vs player visualization
- **Action Buttons**: Large, prominent rock/paper/scissors buttons with emoji icons
- **Status Display**: Health bar with color-coded segments, score counter with achievement styling
- **Game Messages**: Prominent result announcements with appropriate color coding
- **Monster Character**: Stylized representation with name and current "mood"

**Navigation**: Minimal - restart button and settings toggle for sound/theme

**Forms**: Simple input for player name only

**Overlays**: Game over modal with final score and restart option

### E. Visual Treatments

**Gaming Aesthetics**:
- Subtle card shadows and rounded corners (rounded-xl)
- Gentle pulse animations on interactive elements
- Color-coded feedback for wins/losses/draws
- Progress bar styling for health visualization

**Monster Design**: 
- Text-based monster with ASCII art or emoji representation
- Dynamic expressions based on game state
- Randomized monster names for personality

**Interaction Feedback**:
- Button press states with slight scale transform
- Color transitions for health changes
- Shake animation for damage taken
- Celebration effects for victories

## Images
No large hero image required. The game focuses on immediate playability with icon-based elements (rock/paper/scissors emojis) and text-based monster characters. Consider small decorative battle-themed icons in the header area only.

**Key Design Principles**:
1. **Immediate Clarity**: Game state always visible and unambiguous
2. **Emotional Engagement**: Color and animation create excitement around each battle
3. **Progressive Disclosure**: Simple start with complexity revealed through play
4. **Accessibility**: High contrast ratios, large touch targets, clear typography