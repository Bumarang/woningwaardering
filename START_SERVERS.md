# 🚀 Server Starten - Snelstart Gids

## Backend Server (Terminal 1)

```bash
# Ga naar de woningwaardering directory
cd /home/user/woningwaardering

# Activeer virtual environment en start backend
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

✅ Backend draait op: **http://localhost:8000**
📚 API Docs: **http://localhost:8000/docs**

## Frontend Server (Terminal 2) 

*Opmerking: Frontend moet nog gebouwd worden. Gebruik de backend API via de docs!*

## Test de API

Open een nieuwe terminal:

```bash
# Health check
curl http://localhost:8000/api/health

# Test berekening met test data
curl -X POST http://localhost:8000/api/bereken \
  -H "Content-Type: application/json" \
  -d @tests/data/zelfstandige_woonruimten/input/20002000126.json
```

## Snelle Test via Browser

Open: **http://localhost:8000/docs**

1. Klik op `/api/bereken` endpoint
2. Klik op "Try it out"
3. Kopieer deze test data:

```json
{
  "id": "TEST-001",
  "bouwjaar": 2000,
  "ruimten": [
    {
      "id": "R1",
      "naam": "Woonkamer",
      "soort": {"code": "VTK"},
      "detailSoort": {"code": "WOO"},
      "oppervlakte": 25.5,
      "verwarmd": true
    },
    {
      "id": "R2",
      "naam": "Slaapkamer",
      "soort": {"code": "VTK"},
      "detailSoort": {"code": "SLA"},
      "oppervlakte": 15.0,
      "verwarmd": true
    }
  ],
  "energieprestaties": [
    {
      "label": "A",
      "status": {"code": "DEF"}
    }
  ],
  "wozEenheden": [
    {
      "vastgesteldeWaarde": 250000,
      "waardepeildatum": "2023-01-01"
    }
  ]
}
```

4. Klik "Execute"
5. Zie de berekende WWS punten en maximale huurprijs! 🎉
