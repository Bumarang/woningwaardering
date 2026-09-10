# Woningwaardering Frontend

React + TypeScript + Tailwind CSS frontend voor de Woningwaardering Calculator.

## 🚀 Installatie

```bash
# Installeer dependencies
npm install
```

## 💻 Development

```bash
# Start development server
npm run dev
```

De applicatie is beschikbaar op: http://localhost:5173

**Let op:** Zorg dat de backend draait op poort 8000!

## 🏗️ Build voor Productie

```bash
# Build
npm run build

# Preview build
npm run preview
```

## 📋 Features

- ✅ Formulier voor woning gegevens invoeren
- ✅ Ruimtes toevoegen met oppervlakte en type
- ✅ Real-time WWS berekening via backend API
- ✅ Gedetailleerde resultaat weergave
- ✅ Responsive design met Tailwind CSS

## 🔧 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## 📡 API Integratie

De frontend communiceert met de backend via `/api` endpoints.
Vite proxy is geconfigureerd om `/api` requests door te sturen naar `http://localhost:8000`.

## 🎨 Gebruik

1. Vul woning ID in
2. Voeg ruimtes toe met "Ruimte Toevoegen" knop
3. Vul voor elke ruimte:
   - Naam (bijv. "Woonkamer")
   - Oppervlakte in m²
   - Type (Vertrek of Overige ruimte)
   - Verwarmd ja/nee
4. Klik "Bereken Woningwaardering"
5. Zie het resultaat met WWS punten en maximale huurprijs!
