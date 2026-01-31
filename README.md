<div align="center">
  <img src="public/logo.svg" alt="ComponentHub Logo" width="80" height="80" />
  
  # ComponentHub
  
  **Premium React Native Components You Own**
  
  Beautiful, performant, and fully customizable UI components. No package bloat. Just clean, copy-pasteable code.

  [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

  [Live Demo](https://componenthub.dev) · [Documentation](https://componenthub.dev/docs) · [Components](https://componenthub.dev/components)

</div>

---

## ✨ Features

- 🎨 **Premium Design** — Beautiful, modern components with smooth animations
- 📱 **Mobile Optimized** — 60fps animations built for React Native
- 🔧 **Fully Customizable** — Easy theming with CSS variables
- 📦 **Zero Dependencies** — No runtime packages to worry about
- 🌙 **Dark Mode** — Built-in light/dark theme support
- 📝 **TypeScript First** — Full type definitions included
- ♿ **Accessible** — ARIA labels and semantic HTML
- 📄 **Copy & Paste** — Own your code, no npm install needed

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/mukeshprajapati/componenthub.git

# Navigate to directory
cd componenthub

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
componenthub/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog page
│   ├── components/        # Components showcase
│   ├── docs/              # Documentation pages
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── docs/              # Documentation components
│   ├── home/              # Home page sections
│   ├── layout/            # Layout components (Navbar, Footer)
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities & constants
│   ├── constants.ts       # Site configuration
│   └── utils.ts           # Helper functions
├── providers/             # Context providers
│   └── ThemeProvider.tsx  # Dark/light mode
└── public/                # Static assets
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React Framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type Safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide Icons](https://lucide.dev/) | Icon Library |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme Management |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🎨 Customization

### Theme Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

### Adding Components

1. Create component in `components/ui/`
2. Add to `lib/constants.ts` component list
3. Create documentation in `app/docs/components/`

---

## 📱 Responsive Design

Built mobile-first with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mukesh Prajapati**

React Native Developer from India 🇮🇳

[![GitHub](https://img.shields.io/badge/GitHub-mukeshprajapati-181717?style=flat-square&logo=github)](https://github.com/mukeshprajapati)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mukeshprajapati-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/mukeshprajapati)
[![Twitter](https://img.shields.io/badge/Twitter-mukeshprajapati-1DA1F2?style=flat-square&logo=twitter)](https://twitter.com/mukeshprajapati)

---

<div align="center">
  
  **Built with ❤️ for React Native developers**
  
  ⭐ Star this repo if you find it helpful!

</div>
