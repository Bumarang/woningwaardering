#!/usr/bin/env python3
"""
Test script voor de Woningwaardering API
Start dit script om de backend te testen
"""

import json
import subprocess
import time
import sys
import requests
from datetime import date

def start_backend():
    """Start de backend server"""
    print("🚀 Backend server starten...")
    process = subprocess.Popen(
        ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"],
        cwd="backend",
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True
    )
    return process

def wait_for_backend(max_wait=10):
    """Wacht tot backend beschikbaar is"""
    print("⏳ Wachten tot backend gereed is...")
    for i in range(max_wait):
        try:
            response = requests.get("http://localhost:8000/api/health", timeout=1)
            if response.status_code == 200:
                print("✅ Backend is gereed!")
                return True
        except:
            time.sleep(1)
            print(f"   Poging {i+1}/{max_wait}...")
    return False

def test_api():
    """Test de API met voorbeelddata"""
    print("\n📊 Test berekening uitvoeren...")

    # Voorbeeld woning data
    test_data = {
        "id": "TEST-DEMO-001",
        "bouwjaar": 2000,
        "ruimten": [
            {
                "id": "R1",
                "naam": "Woonkamer",
                "soort": {"code": "VTK"},
                "detailSoort": {"code": "WOO"},
                "oppervlakte": 28.0,
                "verwarmd": True
            },
            {
                "id": "R2",
                "naam": "Slaapkamer",
                "soort": {"code": "VTK"},
                "detailSoort": {"code": "SLA"},
                "oppervlakte": 15.0,
                "verwarmd": True
            },
            {
                "id": "R3",
                "naam": "Keuken",
                "soort": {"code": "VTK"},
                "detailSoort": {"code": "KEU"},
                "oppervlakte": 8.0,
                "verwarmd": True
            },
            {
                "id": "R4",
                "naam": "Badkamer",
                "soort": {"code": "VTK"},
                "detailSoort": {"code": "BAD"},
                "oppervlakte": 5.0,
                "verwarmd": True
            }
        ],
        "energieprestaties": [
            {
                "label": "B",
                "status": {"code": "DEF"}
            }
        ],
        "wozEenheden": [
            {
                "vastgesteldeWaarde": 250000.0,
                "waardepeildatum": "2023-01-01"
            }
        ]
    }

    try:
        response = requests.post(
            "http://localhost:8000/api/bereken",
            json=test_data,
            timeout=10
        )

        if response.status_code == 200:
            result = response.json()

            print("\n" + "="*60)
            print("🏠 WONINGWAARDERING RESULTAAT")
            print("="*60)
            print(f"Woning ID:        {test_data['id']}")
            print(f"Totale punten:    {result.get('punten', 0)} WWS punten")
            print(f"Maximale huur:    € {result.get('maximale_huur', 0):.2f} per maand")

            if result.get('maximale_huur_inclusief_opslag'):
                print(f"Met opslag:       € {result['maximale_huur_inclusief_opslag']:.2f} per maand")

            print("\n📋 Details per stelselgroep:")
            print("-"*60)

            for groep in result.get('groepen', []):
                naam = groep.get('criteriumGroep', {}).get('stelselgroep', {}).get('naam', 'Onbekend')
                punten = groep.get('punten', 0)
                print(f"  • {naam:45} {punten:5.1f} punten")

            print("="*60)
            print("\n✅ Test succesvol!")
            print("\n📚 Bekijk de volledige API documentatie op:")
            print("   👉 http://localhost:8000/docs")
            print("\n💡 De server draait nu. Druk Ctrl+C om te stoppen.\n")

            return True
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)
            return False

    except Exception as e:
        print(f"❌ Fout bij API aanroep: {e}")
        return False

def main():
    """Main functie"""
    # Activeer virtual environment
    activate_script = "backend/venv/bin/activate_this.py"

    print("\n" + "="*60)
    print("  WONINGWAARDERING API TEST")
    print("="*60 + "\n")

    # Start backend
    process = start_backend()

    try:
        # Wacht tot backend gereed is
        if not wait_for_backend():
            print("❌ Backend start niet binnen 10 seconden")
            process.terminate()
            return 1

        # Test de API
        if test_api():
            # Houd server draaiend
            print("⌛ Server draait... (Ctrl+C om te stoppen)")
            process.wait()
        else:
            print("❌ API test mislukt")
            process.terminate()
            return 1

    except KeyboardInterrupt:
        print("\n\n👋 Server wordt gestopt...")
        process.terminate()
        process.wait()
        print("✅ Gestopt!")
        return 0
    except Exception as e:
        print(f"\n❌ Onverwachte fout: {e}")
        process.terminate()
        return 1

if __name__ == "__main__":
    sys.exit(main())
