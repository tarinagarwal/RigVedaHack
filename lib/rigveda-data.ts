import { RigvedaVerse } from "@/types/rigveda";

let cachedVerses: RigvedaVerse[] | null = null;

export async function loadAllVerses(): Promise<RigvedaVerse[]> {
  if (cachedVerses) return cachedVerses;

  const verses: RigvedaVerse[] = [];

  for (let i = 1; i <= 10; i++) {
    const response = await fetch(`/data/rigveda_mandala_${i}.json`);
    const data = await response.json();
    verses.push(...data);
  }

  cachedVerses = verses;
  return verses;
}

export function searchVerses(
  verses: RigvedaVerse[],
  query: string
): RigvedaVerse[] {
  const lowerQuery = query.toLowerCase();
  return verses.filter(
    (verse) =>
      verse.text.toLowerCase().includes(lowerQuery) ||
      verse.mandala.toString().includes(lowerQuery) ||
      verse.sukta.toString().includes(lowerQuery)
  );
}

export function getRandomVerses(
  verses: RigvedaVerse[],
  count: number
): RigvedaVerse[] {
  const shuffled = [...verses].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getVersesByMandala(
  verses: RigvedaVerse[],
  mandala: number
): RigvedaVerse[] {
  return verses.filter((v) => v.mandala === mandala);
}

export function getVersesBySukta(
  verses: RigvedaVerse[],
  mandala: number,
  sukta: number
): RigvedaVerse[] {
  return verses.filter((v) => v.mandala === mandala && v.sukta === sukta);
}
