// TypeScript types voor Woningwaardering

export interface Ruimte {
  id: string;
  naam: string;
  soort: { code: 'VTK' | 'OVR' };
  detailSoort?: { code: string };
  oppervlakte: number;
  verwarmd?: boolean;
}

export interface Energieprestatie {
  label?: string;
  soort?: { code: string };
  status?: { code: string };
  begindatum?: string;
  einddatum?: string;
}

export interface WOZEenheid {
  vastgesteldeWaarde: number;
  waardepeildatum: string;
}

export interface EenhedenEenheid {
  id: string;
  bouwjaar?: number;
  ruimten?: Ruimte[];
  energieprestaties?: Energieprestatie[];
  wozEenheden?: WOZEenheid[];
}

export interface WoningwaarderingResultaat {
  stelsel?: { code: string; naam: string };
  groepen?: Array<{
    criteriumGroep?: {
      stelselgroep?: { code: string; naam: string };
    };
    punten?: number;
    woningwaarderingen?: Array<{
      aantal?: number;
      punten?: number;
      criterium?: { naam: string };
    }>;
  }>;
  punten?: number;
  maximale_huur?: number;
  maximale_huur_inclusief_opslag?: number;
}
