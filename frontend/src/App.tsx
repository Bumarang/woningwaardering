import { useState } from 'react';
import { EenhedenEenheid, Ruimte, WoningwaarderingResultaat } from './types';
import { woningwaarderingApi } from './api';

function App() {
  const [formData, setFormData] = useState<EenhedenEenheid>({
    id: `WONING-${Date.now()}`,
    ruimten: [],
  });
  const [resultaat, setResultaat] = useState<WoningwaarderingResultaat | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addRuimte = () => {
    const newRuimte: Ruimte = {
      id: `R${(formData.ruimten?.length || 0) + 1}`,
      naam: '',
      soort: { code: 'VTK' },
      oppervlakte: 0,
      verwarmd: true,
    };
    setFormData({
      ...formData,
      ruimten: [...(formData.ruimten || []), newRuimte],
    });
  };

  const updateRuimte = (index: number, updates: Partial<Ruimte>) => {
    const updatedRuimten = [...(formData.ruimten || [])];
    updatedRuimten[index] = { ...updatedRuimten[index], ...updates };
    setFormData({ ...formData, ruimten: updatedRuimten });
  };

  const deleteRuimte = (index: number) => {
    setFormData({
      ...formData,
      ruimten: formData.ruimten?.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await woningwaarderingApi.bereken(formData);
      setResultaat(result);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Er is een fout opgetreden');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFormData({ id: `WONING-${Date.now()}`, ruimten: [] });
    setResultaat(null);
    setError(null);
  };

  if (resultaat) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              🏠 Woningwaardering Resultaat
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-4xl font-bold text-blue-600">
                  {resultaat.punten || 0}
                </div>
                <div className="text-gray-600 mt-2">WWS Punten</div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-4xl font-bold text-green-600">
                  € {(resultaat.maximale_huur || 0).toFixed(2)}
                </div>
                <div className="text-gray-600 mt-2">Maximale Huur</div>
              </div>

              {resultaat.maximale_huur_inclusief_opslag && (
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-4xl font-bold text-green-700">
                    € {resultaat.maximale_huur_inclusief_opslag.toFixed(2)}
                  </div>
                  <div className="text-gray-600 mt-2">Incl. Opslag</div>
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold mb-4">Details per Stelselgroep</h2>
            <div className="space-y-3 mb-6">
              {resultaat.groepen?.map((groep, idx) => (
                <div key={idx} className="border border-gray-300 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {groep.criteriumGroep?.stelselgroep?.naam || 'Onbekend'}
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      {groep.punten?.toFixed(2) || 0} punten
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={reset}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Nieuwe Berekening
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🏠 Woningwaardering Calculator
          </h1>
          <p className="text-gray-600 mb-6">
            Bereken de WWS punten en maximale huurprijs voor een woning
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Woning ID
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bouwjaar (optioneel)
              </label>
              <input
                type="number"
                value={formData.bouwjaar || ''}
                onChange={(e) =>
                  setFormData({ ...formData, bouwjaar: parseInt(e.target.value) || undefined })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-800">Ruimtes</h2>
                <button
                  type="button"
                  onClick={addRuimte}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  + Ruimte Toevoegen
                </button>
              </div>

              <div className="space-y-4">
                {formData.ruimten?.map((ruimte, idx) => (
                  <div key={ruimte.id} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-medium">Ruimte {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => deleteRuimte(idx)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️ Verwijder
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Naam (bijv. Woonkamer)"
                        value={ruimte.naam}
                        onChange={(e) => updateRuimte(idx, { naam: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      />

                      <input
                        type="number"
                        placeholder="Oppervlakte (m²)"
                        value={ruimte.oppervlakte || ''}
                        onChange={(e) =>
                          updateRuimte(idx, { oppervlakte: parseFloat(e.target.value) || 0 })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                        step="0.1"
                        min="0"
                        required
                      />

                      <select
                        value={ruimte.soort.code}
                        onChange={(e) =>
                          updateRuimte(idx, { soort: { code: e.target.value as 'VTK' | 'OVR' } })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="VTK">Vertrek (1.0 punt/m²)</option>
                        <option value="OVR">Overige ruimte (0.75 punt/m²)</option>
                      </select>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={ruimte.verwarmd || false}
                          onChange={(e) => updateRuimte(idx, { verwarmd: e.target.checked })}
                          className="mr-2"
                        />
                        <span className="text-sm">Verwarmd (2 punten)</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>Fout:</strong> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !formData.ruimten?.length}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
            >
              {loading ? 'Berekenen...' : '🔢 Bereken Woningwaardering'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
