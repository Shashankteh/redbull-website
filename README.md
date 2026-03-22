# 🔴 Red Bull — Gives You Wings
### Cinematic Scroll-Animated Website

A premium, animation-heavy website for Red Bull — inspired by award-winning web design studios like Dark Data, Space Animation, Minuano Studio, and more.

---

## ✨ Features

- **Cinematic Loader** — Animated letter reveal + loading bar
- **Custom Cursor** — Magnetic cursor with ring follower
- **Particle Canvas** — Animated blue particle field on hero
- **Lenis Smooth Scroll** — Buttery smooth inertia scroll
- **GSAP ScrollTrigger Animations**:
  - Hero text slide-up reveal (word by word)
  - Manifesto 4-panel pinned scroll (words activate on scroll)
  - Horizontal product card scroll
  - World/Athletes pinned text reveal
  - Stats counter animation
  - General scroll reveals (fade, slide, scale)
  - Product card 3D mouse tilt
  - Parallax background elements
- **Dual Marquee** — Infinite scrolling ticker strips
- **Scroll Progress Bar** — Blue-to-red gradient at top

---

## 📁 Folder Structure

```
redbull-website/
├── index.html          ← Main HTML
├── css/
│   └── style.css       ← All styles + variables
├── js/
│   └── main.js         ← Standalone JS reference (not used in prod)
└── README.md
```

> **Note:** All JS is inlined in `index.html` as an ES module for GitHub Pages compatibility. `js/main.js` is a reference copy.

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create GitHub Repository
```bash
# Go to github.com → New Repository
# Name it: redbull-website
# Set to Public
```

### Step 2 — Push Code
```bash
cd redbull-website
git init
git add .
git commit -m "🔴 Initial commit — Red Bull cinematic website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/redbull-website.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
```
1. Go to your repo on GitHub
2. Click Settings → Pages (left sidebar)
3. Source → Deploy from a branch
4. Branch → main → / (root)
5. Click Save
```

### Step 4 — Live in 2 minutes! 🎉
```
Your site will be live at:
https://YOUR_USERNAME.github.io/redbull-website/
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| GSAP 3.12 | All scroll animations |
| ScrollTrigger | Pin + scrub + scroll-driven |
| Lenis 1.0 | Smooth inertia scroll |
| HTML5 Canvas | Particle background |
| CSS Custom Properties | Theming + variables |
| Google Fonts | Bebas Neue, Chakra Petch |

---

## 🎨 Design References

Inspired by the animation and design language of:
- Dark Data, Space Animation, Minuano Studio
- Public House, Drake Design, Awequatic
- Harmless Cult, Mambo Project, ÅRCOA Design

---

## 🎨 Color Palette

| Variable | Hex | Use |
|---|---|---|
| `--bg` | `#060608` | Background |
| `--blue` | `#005AFF` | Primary accent |
| `--red` | `#FF1533` | Secondary accent |
| `--white` | `#E8ECF4` | Text |
| `--silver` | `#B8C4D4` | Subtext |

---

Made with ⚡ and GSAP
