"""
FastAPI backend voor Woningwaardering (WWS Berekening)
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
from typing import Optional
import logging

from woningwaardering.stelsels.zelfstandige_woonruimten.zelfstandige_woonruimten import ZelfstandigeWoonruimten
from woningwaardering.vera.bvg.generated import EenhedenEenheid

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Woningwaardering API",
    description="API voor het berekenen van WWS punten en maximale huurprijs",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "ok",
        "service": "Woningwaardering API",
        "version": "1.0.0"
    }


@app.get("/api/health")
async def health():
    """Uitgebreide health check"""
    return {
        "status": "healthy",
        "timestamp": date.today().isoformat(),
        "stelsels": ["zelfstandige_woonruimten"]
    }


@app.post("/api/bereken")
async def bereken_woningwaardering(
    eenheid: EenhedenEenheid,
    peildatum: Optional[str] = None
):
    """Bereken de WWS punten en maximale huurprijs"""
    try:
        if peildatum:
            peil_datum = date.fromisoformat(peildatum)
        else:
            peil_datum = date.today()

        logger.info(f"Berekening starten voor eenheid {eenheid.id}")

        calculator = ZelfstandigeWoonruimten(peildatum=peil_datum)
        resultaat = calculator.bereken(eenheid)

        logger.info(f"Berekening voltooid: {resultaat.punten} punten")

        return resultaat.model_dump(mode='json', exclude_none=True)

    except ValueError as e:
        logger.error(f"Validatie fout: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Validatie fout: {str(e)}")
    except Exception as e:
        logger.error(f"Berekening fout: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Berekening fout: {str(e)}")


@app.get("/api/referentiedata/energielabels")
async def get_energielabels():
    """Haal lijst van beschikbare energielabels op"""
    return ["A+++++", "A++++", "A+++", "A++", "A+", "A", "B", "C", "D", "E", "F", "G"]


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
