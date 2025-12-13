# TradePiGloball V12

> Premium B2B Marketplace Showroom Platform - Static Landing Site

## Overview

TradePiGloball is a modern, mobile-first B2B marketplace platform designed for manufacturers and buyers. V12 is a complete redesign focusing on premium user experience, performance, and accessibility.

## ✨ Features

- **🎨 Premium Design**: Light, minimal design with soft blue/teal accent colors
- **📱 Mobile-First**: Responsive layout optimized for all devices
- **⚡ Performance**: Pure HTML/CSS/vanilla JS - no frameworks, ultra-fast loading
- **♿ Accessible**: ARIA labels, keyboard navigation, focus management
- **🌐 i18n Ready**: Turkish language support with easy localization
- **💎 Modern UI**: Smooth animations, modal system, category scroller
- **💱 Live Rates**: Real-time TL/USD/Pi exchange rates
- **🔐 Auth Pages**: Ready-to-use login and signup pages

## 📁 Project Structure

```
/
├── index.html                 # Main landing page
├── pages/
│   ├── login.html            # Login page
│   ├── signup.html           # Registration page
│   └── memberships.html      # Detailed pricing & plans
├── assets/
│   ├── css/
│   │   ├── styles.css        # Main stylesheet
│   │   └── components.css    # Modal & component styles
│   ├── js/
│   │   ├── main.js           # Main interactions
│   │   └── rates.js          # Live rates widget
│   ├── img/                  # Images (optional)
│   └── icons/                # Icons (optional)
├── src/                      # Backend (for API/webhooks)
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Static Hosting (Recommended)

This is a **pure static site** - no server or build process needed!

#### Deploy to GitHub Pages:
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch (e.g., `main`) and root folder
4. Site will be live at `https://yourusername.github.io/TradePiGloball`

#### Deploy to Other Static Hosts:
- **Netlify**: Drag & drop the root folder
- **Vercel**: Connect GitHub repo, deploy instantly
- **Cloudflare Pages**: Connect repo, auto-deploy

#### Local Development:
```bash
# Simple HTTP server (Python 3)
python3 -m http.server 8000

# Or use Node's http-server
npx http-server -p 8000

# Then open: http://localhost:8000
```

### Backend (Optional)

The `src/` directory contains an Express.js backend for webhooks and API endpoints. **This is optional** - the frontend works perfectly as a standalone static site.

```bash
# Only needed if you want to run the backend
npm install
npm start
```

## 🎯 Key Sections

### Homepage (`index.html`)
- **Header**: Sticky navigation with live rates widget
- **Hero**: Main value proposition with CTA buttons
- **Memberships**: 3 tier cards (Basic/Pro/Kurumsal)
- **Categories**: Horizontal scrollable category chips (12 items)
- **How It Works**: 3-step process
- **CTA Section**: Final conversion push
- **Footer**: Links and copyright

### Membership Details (`pages/memberships.html`)
- Full pricing breakdown
- Feature comparison table
- FAQ section
- Pi Network integration notice

### Authentication
- **Login** (`pages/login.html`): Email/password form
- **Signup** (`pages/signup.html`): Multi-step registration with plan selection

## 💱 Live Rates Widget

The rates widget updates every 15 seconds with:
- **TL**: USD/TRY exchange rate
- **USD**: TRY/USD exchange rate  
- **Pi**: Placeholder for future Pi Network integration

Uses free API: `exchangerate-api.com` with graceful fallback.

## 🎨 Design System

### Colors
```css
--bg: #fafbfc          /* Page background */
--card: #ffffff        /* Card background */
--text: #1a202c        /* Primary text */
--muted: #64748b       /* Secondary text */
--accent: #0ea5e9      /* Primary accent (soft blue) */
--border: #e2e8f0      /* Borders */
```

### Typography
- Font: System fonts (optimized for performance)
- Headers: 700–800 weight
- Body: 400–600 weight
- Scale: 0.85rem–3.5rem

### Spacing
- Container: 1180px max-width
- Padding: 20px default, 40px+ sections
- Gap: 12px–48px based on context

## 🌐 Customization

### Change Colors
Edit `assets/css/styles.css`:
```css
:root {
  --accent: #0ea5e9;  /* Change to your brand color */
}
```

### Add Language
1. Duplicate `index.html` as `index.en.html`
2. Translate content
3. Add language switcher in header

### Modify Packages
Edit membership cards in:
- `index.html` (cards + modals)
- `pages/memberships.html` (full details)

## 📱 Mobile Responsiveness

- **Breakpoint**: 968px
- **Mobile nav**: Hamburger menu
- **Categories**: Touch-friendly horizontal scroll
- **Cards**: Stack vertically
- **Forms**: Full-width inputs

## ♿ Accessibility

- Semantic HTML5
- ARIA labels and roles
- Keyboard navigation support
- Focus trap in modals
- Color contrast (WCAG AA)
- Screen reader friendly

## 🔒 Security Notes

- No sensitive data in frontend
- Form validation (client-side)
- HTTPS required for production
- API keys should be in backend only

## 🚧 Future Enhancements

- [ ] Pi Network authentication integration
- [ ] Multi-language support (EN/TR/RU/AR)
- [ ] Backend API implementation
- [ ] Real-time chat system
- [ ] Product showcase galleries
- [ ] Advanced search and filters

## 📄 License

© 2024 TradePiGloball — All rights reserved

## 🤝 Contributing

This is a client project. For contributions or issues, contact the project maintainers.

---

**Built with ❤️ for the B2B marketplace community**
