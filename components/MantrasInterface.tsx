"use client";

import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface AudioFile {
  mandala: number;
  sukta: number;
  version: number;
  url: string;
}

export default function MantrasInterface() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMandala, setSelectedMandala] = useState<string>("");
  const [selectedSukta, setSelectedSukta] = useState<string>("all");
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [availableSuktas, setAvailableSuktas] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Cache to store fetched mandalas
  const cacheRef = useRef<Map<number, AudioFile[]>>(new Map());

  const mandalas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (selectedMandala && selectedMandala !== "") {
      fetchMandalaAudio(parseInt(selectedMandala));
    } else {
      setAudioFiles([]);
      setAvailableSuktas([]);
    }
    setSelectedSukta("all");
  }, [selectedMandala]);

  useEffect(() => {
    if (audioFiles.length > 0) {
      const suktas = audioFiles
        .map((a) => a.sukta)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort((a, b) => a - b);
      setAvailableSuktas(suktas);
    }
  }, [audioFiles]);

  const fetchMandalaAudio = async (mandala: number) => {
    // Check cache first
    if (cacheRef.current.has(mandala)) {
      setAudioFiles(cacheRef.current.get(mandala)!);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/scrape-audio?mandala=${mandala}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setAudioFiles([]);
      } else {
        // Cache the result
        cacheRef.current.set(mandala, data.audioFiles);
        setAudioFiles(data.audioFiles);
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
      setError("Failed to load audio files. Please try again.");
      setAudioFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAudio = audioFiles.filter((audio) => {
    if (
      selectedMandala !== "all" &&
      audio.mandala !== parseInt(selectedMandala)
    )
      return false;
    if (selectedSukta !== "all" && audio.sukta !== parseInt(selectedSukta))
      return false;
    return true;
  });

  const groupedAudio = filteredAudio.reduce((acc, audio) => {
    const key = `${audio.mandala}-${audio.sukta}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(audio);
    return acc;
  }, {} as Record<string, AudioFile[]>);

  const getReciterName = (version: number) => {
    if (version === 1) {
      return "South Indian Brahmins";
    } else {
      return "Sri Shyama Sundara Sharma & Sri Satya Krishna Bhatta";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Filter Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-coral-200/50 mb-6">
        <h2 className="text-xl md:text-2xl font-bold gradient-text mb-6 text-center">
          Filter Mantras
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-semibold text-coral-900 mb-2">
              📖 Mandala
            </label>
            <Select value={selectedMandala} onValueChange={setSelectedMandala}>
              <SelectTrigger className="h-12 rounded-xl border-2 border-coral-200 focus:border-coral-400 focus:ring-2 focus:ring-coral-300 bg-white text-gray-900">
                <SelectValue placeholder="Select a Mandala..." />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-coral-200 rounded-xl shadow-2xl">
                {mandalas.map((m) => (
                  <SelectItem
                    key={m}
                    value={m.toString()}
                    className="cursor-pointer hover:bg-coral-50 focus:bg-coral-100 rounded-lg my-1"
                  >
                    Mandala {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-coral-900 mb-2">
              ✨ Sukta
              {selectedMandala &&
                availableSuktas.length > 0 &&
                ` (${availableSuktas.length} available)`}
            </label>
            <Select
              value={selectedSukta}
              onValueChange={setSelectedSukta}
              disabled={!selectedMandala || loading}
            >
              <SelectTrigger className="h-12 rounded-xl border-2 border-coral-200 focus:border-coral-400 focus:ring-2 focus:ring-coral-300 bg-white text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                <SelectValue placeholder="All Suktas" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-coral-200 rounded-xl shadow-2xl max-h-[300px]">
                <SelectItem
                  value="all"
                  className="cursor-pointer hover:bg-coral-50 focus:bg-coral-100 rounded-lg my-1"
                >
                  All Suktas
                </SelectItem>
                {availableSuktas.map((s) => (
                  <SelectItem
                    key={s}
                    value={s.toString()}
                    className="cursor-pointer hover:bg-coral-50 focus:bg-coral-100 rounded-lg my-1"
                  >
                    Sukta {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedMandala && !loading && !error && (
          <div className="mt-4 md:mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-900 flex items-center gap-2">
              <span className="text-lg">📊</span>
              <span>
                Showing <strong>{filteredAudio.length}</strong> audio files from
                Mandala {selectedMandala}
              </span>
            </p>
          </div>
        )}

        {!selectedMandala && (
          <div className="mt-4 md:mt-6 p-4 bg-gradient-to-r from-coral-50 to-coral-50 rounded-xl border border-coral-200">
            <p className="text-sm text-coral-900 flex items-center gap-2">
              <span className="text-lg">💡</span>
              <span>
                <strong>Select a Mandala</strong> to load and listen to mantras
              </span>
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 md:mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
            <p className="text-sm text-red-900 flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </p>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-coral-200 border-t-coral-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🕉️</span>
            </div>
          </div>
          <p className="mt-6 text-lg text-coral-800/70 animate-pulse">
            Loading Mandala {selectedMandala} mantras...
          </p>
        </div>
      )}

      {/* Audio Files Section */}
      {!loading && audioFiles.length > 0 && (
        <div className="space-y-4 md:space-y-6">
          {Object.entries(groupedAudio).map(([key, audios]) => (
            <div
              key={key}
              className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6 border border-coral-200/50 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-coral-900 flex items-center gap-2">
                  <span className="text-lg md:text-xl">🕉️</span>
                  <span>
                    Mandala {audios[0].mandala} - Sukta {audios[0].sukta}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-coral-100 text-coral-900 border-coral-300">
                    📖 M{audios[0].mandala}
                  </Badge>
                  <Badge className="bg-coral-100 text-coral-900 border-coral-300">
                    ✨ S{audios[0].sukta}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {audios.map((audio, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-coral-50/50 to-coral-50/50 border-2 border-coral-200/50 rounded-xl md:rounded-2xl p-4 md:p-5 hover:border-coral-300 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base md:text-lg">🎵</span>
                          <span className="text-sm md:text-base font-bold text-coral-900">
                            {getReciterName(audio.version)}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-coral-300 text-coral-800 bg-white text-xs"
                        >
                          Version {audio.version}
                        </Badge>
                      </div>
                      <button
                        onClick={() => setCurrentAudio(audio.url)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                          currentAudio === audio.url
                            ? "bg-coral-600 text-coral-50 shadow-md"
                            : "bg-coral-100 text-coral-700 hover:bg-coral-200"
                        }`}
                      >
                        {currentAudio === audio.url ? "▶ Playing" : "▶ Play"}
                      </button>
                    </div>
                    <audio
                      controls
                      src={audio.url}
                      className="w-full rounded-lg"
                      onPlay={() => setCurrentAudio(audio.url)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !selectedMandala && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 md:p-16 text-center shadow-2xl border border-coral-200/50">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center text-4xl md:text-5xl animate-float">
            🎵
          </div>
          <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-4">
            Select a Mandala to Begin
          </h3>
          <p className="text-base md:text-lg text-coral-800/70 mb-6">
            Choose a Mandala from the dropdown above to load and listen to
            authentic Vedic chanting
          </p>
        </div>
      )}
    </div>
  );
}
