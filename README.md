# 🐉 Draconic Wordle - D&D Campaign Game

A Wordle-style word guessing game themed around Dungeons & Dragons draconic lore. Players enter their character name to access a unique word puzzle with 6 attempts to guess ancient draconic words.

## ✨ Features

- **Character Name Validation**: Players must enter a valid name from the campaign roster
- **Unique Word Assignment**: Each character gets a different draconic word to guess
- **Classic Wordle Gameplay**: 6 attempts with visual feedback for letter positions
- **Draconic Theme**: Beautiful red and black color scheme with minimalist design
- **Player Management**: Used names are removed after each game completion
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🎨 Visual Design

- **Color Palette**: Deep red (#DC2626) and black (#000000) primary colors
- **Accent Colors**: Gold (#F59E0B) for highlights and success states
- **Typography**: Cinzel for headings (dragon-inspired), Inter for body text
- **Layout**: Minimalist design with subtle dragon motifs and sharp, angular elements

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/velo-carmesi.git
   cd velo-carmesi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production
```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
velo-carmesi/
├── src/
│   ├── components/          # React components
│   ├── data/               # Game data (names, words)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main app component
│   └── main.jsx            # App entry point
├── public/                 # Static assets
├── .github/workflows/      # GitHub Actions deployment
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build configuration
```

## 🎮 Game Mechanics

1. **Landing Page**: Player enters their character name
2. **Name Validation**: System checks if name exists in campaign roster
3. **Word Assignment**: Unique draconic word assigned to the character
4. **Gameplay**: 6 attempts to guess the word with visual feedback
5. **Results**: Success/failure message displayed
6. **Cleanup**: Character name removed from available roster
7. **Return**: Back to landing page for next player

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages:

- **Automatic**: Push to main branch triggers deployment
- **Manual**: Run `npm run build` and deploy `dist/` folder
- **Base Path**: Configured for repository name `/velo-carmesi/`

## 🛠️ Technology Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Deployment**: GitHub Pages + GitHub Actions
- **State Management**: React Hooks + localStorage

## 🎯 Development Roadmap

### Phase 1: ✅ Project Setup
- [x] React + Vite project initialization
- [x] Tailwind CSS configuration
- [x] GitHub Pages deployment setup

### Phase 2: 🔄 Core Game Logic
- [ ] Name validation system
- [ ] Word assignment logic
- [ ] Wordle game mechanics
- [ ] Name removal system

### Phase 3: 📱 User Interface
- [ ] Landing page design
- [ ] Game interface
- [ ] Results display
- [ ] Navigation flow
- [ ] Draconic visual theme

### Phase 4: 💾 Data Management
- [ ] Game state management
- [ ] Data structure setup
- [ ] Local storage implementation

### Phase 5: 🧪 Testing & Polish
- [ ] Unit testing
- [ ] Responsive design testing
- [ ] Cross-browser compatibility
- [ ] Final deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐉 D&D Lore

This game is designed for D&D campaigns and features:
- Draconic-themed words and terminology
- Character name validation system
- Campaign roster management
- Immersive visual design

---

**Built with ❤️ for D&D enthusiasts everywhere**
