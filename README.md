# 🕉️ Nirvāṇa

An interactive web application that brings the ancient wisdom of the Rigveda to the modern world through AI-powered exploration, translations, and authentic Vedic chanting.

## ✨ Features

### 📖 Explore Suktas

Browse through all Rigveda Suktas with advanced search and filtering capabilities. Explore the sacred texts organized by Mandala, Sukta, and verse.

### 🌐 Translations

View Rigveda verses with multiple translations from renowned scholars:

- Sanskrit original text (Devanagari and transliteration)
- English translations
- German translations
- French translations
- Russian translations

### 🎵 Vedic Mantras

Listen to authentic Rigveda chanting with audio recordings from:

- **South Indian Brahmins** - Traditional recitation style
- **Sri Shyama Sundara Sharma & Sri Satya Krishna Bhatta** - Scholarly recitation

Features:

- Browse by Mandala (1-10)
- Filter by specific Suktas
- Two versions of chanting for each hymn
- Lazy loading for optimal performance
- Smart caching system

### 💬 AI Chat

Interactive AI assistant to answer questions about the Rigveda and Vedic philosophy.

### 🎯 Quiz

Test your knowledge of Rigveda with interactive quizzes.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd rigvedhacks
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your API keys to `.env.local`:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **AI:** Google Gemini API
- **Data Source:** [VedaWeb API](https://vedaweb.uni-koeln.de/)
- **Audio Source:** [Sri Aurobindo Ashram](https://sri-aurobindo.co.in/)

## 📚 Data Sources & Credits

### Translations & Text

- **VedaWeb** - University of Cologne
  - Provides comprehensive Rigveda text with multiple translations
  - API: https://vedaweb.uni-koeln.de/
  - Includes translations from various scholars in multiple languages

### Audio Recordings

- **Sri Aurobindo Ashram** - Pondicherry, India
  - Source: https://sri-aurobindo.co.in/workings/matherials/rigveda/
  - **South Indian Brahmins** - Traditional Vedic chanting (Version 1)
  - **Sri Shyama Sundara Sharma & Sri Satya Krishna Bhatta** - Scholarly recitation (Version 2)

### Scholars & Translators

The translations available in this application are from renowned Vedic scholars including:

- Ralph T.H. Griffith
- Karl Friedrich Geldner
- Hermann Grassmann
- And other distinguished scholars

## 🏗️ Project Structure

```
rigvedhacks/
├── app/
│   ├── api/              # API routes
│   ├── explore/          # Explore Suktas page
│   ├── translations/     # Translations page
│   ├── mantras/          # Vedic Mantras page
│   ├── chat/             # AI Chat page
│   ├── quiz/             # Quiz page
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── ExploreInterface.tsx
│   ├── TranslationsInterface.tsx
│   ├── MantrasInterface.tsx
│   ├── Navbar.tsx
│   └── Hero.tsx
├── lib/
│   ├── rigveda-data.ts   # Data loading utilities
│   ├── rigveda-structure.ts
│   └── vedaweb-api.ts    # VedaWeb API integration
└── types/
    └── rigveda.ts        # TypeScript types
```

## 🎨 Features in Detail

### Memory Optimization

- **Lazy Loading:** Audio files are loaded per Mandala on-demand
- **Smart Caching:** Previously loaded Mandalas are cached for instant access
- **Efficient State Management:** Minimizes memory footprint for better performance

### Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Accessible UI components

### Performance

- Server-side rendering with Next.js
- Optimized images and assets
- Code splitting and lazy loading
- Fast page transitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **VedaWeb Team** at University of Cologne for providing the comprehensive Rigveda database
- **Sri Aurobindo Ashram** for preserving and sharing authentic Vedic chanting recordings
- **All Vedic scholars and translators** whose work has made this ancient wisdom accessible
- **South Indian Brahmins** for maintaining the oral tradition of Vedic recitation
- **Sri Shyama Sundara Sharma & Sri Satya Krishna Bhatta** for their scholarly contributions

## 📧 Contact

For questions, suggestions, or feedback, please open an issue on GitHub.

---

**Note:** This application is created for educational and research purposes. All content is sourced from publicly available resources with proper attribution.
