// VedaWeb API integration for translations

export interface VedaWebDocument {
  id: string;
  book: number;
  hymn: number;
  stanza: number;
  hymnAddressee?: string;
  hymnGroup?: string;
  strata?: string;
  versions?: Version[];
  location?: string;
}

export interface Version {
  id: string;
  source: string;
  language: string;
  form: string | string[];
  type: "version" | "translation";
}

// Fetch document by Rigveda location (e.g., "1.1.1" or "0100101")
export async function fetchDocumentById(
  id: string
): Promise<VedaWebDocument | null> {
  try {
    // Convert "1.1.1" format to "0100101" format if needed
    const formattedId = formatLocationId(id);

    // Use our API proxy to avoid CORS issues
    const response = await fetch(`/api/vedaweb?id=${formattedId}`);

    if (!response.ok) {
      console.error("API response not OK:", response.status);
      return null;
    }

    const data = await response.json();

    if (data.error) {
      console.error("API returned error:", data.error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching document by ID:", error);
    return null;
  }
}

// Format location ID to proper format
function formatLocationId(id: string): string {
  // If already in format "0100101", return as is
  if (/^\d{7}$/.test(id)) {
    return id;
  }

  // If in format "1.1.1", convert to "0100101"
  const parts = id.split(/[.\-_]/).filter((p) => p);
  if (parts.length === 3) {
    const book = parts[0].padStart(2, "0");
    const hymn = parts[1].padStart(3, "0");
    const stanza = parts[2].padStart(2, "0");
    return `${book}${hymn}${stanza}`;
  }

  return id;
}

// Parse location ID to readable format
export function parseLocationId(
  id: string
): { book: number; hymn: number; stanza: number } | null {
  if (id.length === 7) {
    return {
      book: parseInt(id.substring(0, 2)),
      hymn: parseInt(id.substring(2, 5)),
      stanza: parseInt(id.substring(5, 7)),
    };
  }
  return null;
}

// Format location for display
export function formatLocation(
  book: number,
  hymn: number,
  stanza: number
): string {
  return `${book}.${hymn}.${stanza}`;
}

// Get translations from versions array
export function getTranslations(versions: Version[]): Version[] {
  return versions.filter((v) => v.type === "translation");
}

// Get original text versions
export function getOriginalVersions(versions: Version[]): Version[] {
  return versions.filter((v) => v.type === "version");
}
