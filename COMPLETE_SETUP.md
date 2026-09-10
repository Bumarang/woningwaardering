# 🏠 Woningwaardering - Complete Frontend & Backend Setup

Volledige webapplicatie voor het berekenen van WWS punten en maximale huurprijzen.

## 📦 Wat is er gemaakt?

### Backend (FastAPI)
- REST API endpoints voor WWS berekeningen
- Automatische API documentatie (Swagger UI)
- CORS support voor frontend

### Frontend (React + TypeScript)
- Interactief formulier voor woning data
- Real-time berekeningen via backend API
- Responsive design met Tailwind CSS

## 🚀 Installatie & Start

### 1. Clone de Repository

```bash
git clone https://github.com/Bumarang/woningwaardering.git
cd woningwaardering
git checkout claude/create-frontend-templates-011CUbT3heRDXYVx3haEn9eM
```

### 2. Backend Starten

**Terminal 1:**
```bash
cd backend

# Maak virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Installeer dependencies
pip install -r requirements.txt
pip install -e ..

# Start backend server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

✅ Backend draait op: **http://localhost:8000**
📚 API Docs: **http://localhost:8000/docs**

### 3. Frontend Starten

**Terminal 2:**
```bash
cd frontend

# Installeer dependencies
npm install

# Start development server  
npm run dev
```

✅ Frontend draait op: **http://localhost:5173**

## 🎯 Gebruik

1. Open **http://localhost:5173** in je browser
2. Vul woning gegevens in:
   - Woning ID
   - Bouwjaar (optioneel)
3. Voeg ruimtes toe:
   - Klik "+ Ruimte Toevoegen"
   - Vul naam, oppervlakte, type in
4. Klik "Bereken Woningwaardering"
5. Zie resultaat met:
   - WWS punten
   - Maximale huurprijs
   - Details per stelselgroep

## 📁 Project Structuur

```
woningwaardering/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py          # FastAPI endpoints
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Main component
│   │   ├── main.tsx         # Entry point
│   │   ├── api.ts           # API client
│   │   ├── types.ts         # TypeScript types
│   │   └── index.css        # Tailwind CSS
│   ├── package.json
│   └── vite.config.ts
│
├── woningwaardering/        # Python library
├── tests/                   # Test data
└── docs/                    # Documentatie
```

## 🔧 API Endpoints

- `GET /` - Health check
- `GET /api/health` - Uitgebreide health check
- `POST /api/bereken` - Bereken woningwaardering
- `GET /api/referentiedata/energielabels` - Energielabels

## 🎨 Screenshots

### Formulier
![Formulier met ruimtes toevoegen]

### Resultaat
![Resultaat met WWS punten en maximale huur]

## 🐛 Troubleshooting

### Backend start niet
```bash
# Check Python versie (3.10+)
python --version

# Herinstalleer dependencies
cd backend
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install -e ..
```

### Frontend start niet
```bash
# Check Node.js versie (18+)
node --version

# Herinstalleer dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### CORS errors
Zorg dat:
- Backend draait op poort 8000
- Frontend draait op poort 5173
- CORS is ingesteld in `backend/app/main.py`

### Port already in use
```bash
# Backend (8000)
lsof -i:8000
kill -9 <PID>

# Frontend (5173)
lsof -i:5173  
kill -9 <PID>
```

## 📝 Licentie

Zie LICENSE bestand

## 🙏 Credits

Gebouwd met:
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Woningwaardering Python library

---

**Veel succes met het berekenen van woningwaarderingen!** 🎉
