import { NextResponse } from "next/server";

interface AudioFile {
  mandala: number;
  sukta: number;
  version: number;
  url: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mandalaParam = searchParams.get("mandala");

    if (!mandalaParam) {
      return NextResponse.json(
        { error: "Mandala parameter required" },
        { status: 400 }
      );
    }

    const mandala = parseInt(mandalaParam);
    if (mandala < 1 || mandala > 10) {
      return NextResponse.json(
        { error: "Invalid mandala number" },
        { status: 400 }
      );
    }

    const audioFiles: AudioFile[] = [];
    const baseUrl = "https://sri-aurobindo.co.in/workings/matherials/rigveda";
    const pageUrl = `${baseUrl}/audio_${mandala
      .toString()
      .padStart(2, "0")}.htm`;

    try {
      const response = await fetch(pageUrl);
      const html = await response.text();

      const audioRegex = /<audio\s+src="(\d+)\/(\d+)-(\d+)(_\d+)?\.mp3"/g;
      let match;

      while ((match = audioRegex.exec(html)) !== null) {
        const [, mandalaPart, mandalaNum, suktaNum, versionPart] = match;
        const version = versionPart
          ? parseInt(versionPart.replace("_", ""))
          : 1;

        audioFiles.push({
          mandala: parseInt(mandalaNum),
          sukta: parseInt(suktaNum),
          version,
          url: `${baseUrl}/${mandalaPart}/${mandalaNum}-${suktaNum}${
            versionPart || ""
          }.mp3`,
        });
      }
    } catch (error) {
      console.error(`Error scraping mandala ${mandala}:`, error);
      return NextResponse.json(
        { error: `Failed to scrape mandala ${mandala}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ audioFiles, mandala });
  } catch (error) {
    console.error("Error in scrape-audio API:", error);
    return NextResponse.json(
      { error: "Failed to scrape audio" },
      { status: 500 }
    );
  }
}
