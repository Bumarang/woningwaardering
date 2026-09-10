# 🏠 Woningwaardering Backend - DEMO

## ✅ Wat is gemaakt

Ik heb een **FastAPI backend** gemaakt voor de woningwaardering calculator:

### Backend Structuur
```
backend/
├── app/
│   ├── __init__.py
│   └── main.py          # FastAPI applicatie met endpoints
├── requirements.txt     # Dependencies
└── venv/               # Virtual environment (klaar)
```

### API Endpoints

1. **GET /** - Health check
2. **GET /api/health** - Uitgebreide health check
3. **POST /api/bereken** - Bereken WWS punten en maximale huur
4. **GET /api/referentiedata/energielabels** - Beschikbare energielabels

## 🚀 Server Starten

### Optie 1: Direct starten (aanbevolen voor nu)

```bash
cd /home/user/woningwaardering/backend
source venv/bin/activate
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Dan in je browser:
- 📚 **API Docs**: http://localhost:8000/docs
- 🔍 **ReDoc**: http://localhost:8000/redoc  
- ✅ **Health**: http://localhost:8000/api/health

### Optie 2: Met test script

```bash
cd /home/user/woningwaardering
source backend/venv/bin/activate
python test_api.py
```

## 📝 API Gebruiken

### Test via command line:

```bash
# Health check
curl http://localhost:8000/api/health

# Energielabels ophalen
curl http://localhost:8000/api/referentiedata/energielabels
```

### Test via Swagger UI:

1. Open http://localhost:8000/docs
2. Klik op `/api/bereken` POST endpoint
3. Klik "Try it out"
4. Gebruik dit als test data:

```json
{
  "id": "WONING-001",
  "ruimten": [
    {
      "id": "R1",
      "naam": "Woonkamer",
      "soort": {"code": "VTK"},
      "oppervlakte": 25.5,
      "verwarmd": true
    }
  ]
}
```

5. Klik "Execute"

## 🎯 Volgende Stappen

1. ✅ Backend API is klaar
2. ⏳ Frontend (React + TypeScript) kan gebouwd worden
3. ⏳ Template systeem voor voorbeeldwoningen

## 💡 Tips

- De backend werkt met de bestaande woningwaardering Python library
- Alle berekeningen gebruiken de officiële WWS logica
- CORS is geconfigureerd voor lokale development
- API documentatie wordt automatisch gegenereerd

## 🐛 Troubleshooting

Als de server niet start:
```bash
# Check of poort 8000 vrij is
lsof -i:8000

# Kill eventueel draaiende processen
pkill -f uvicorn

# Herinstalleer dependencies
cd backend
pip install -r requirements.txt
pip install -e ..
```

---

**Status**: Backend is klaar en getest! 🎉
De server kan gestart worden en de API endpoints zijn beschikbaar.
