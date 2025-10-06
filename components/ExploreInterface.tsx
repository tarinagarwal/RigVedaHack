"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RigvedaVerse } from "@/types/rigveda";
import {
  searchVerses,
  getVersesByMandala,
  getVersesBySukta,
} from "@/lib/rigveda-data";

interface Props {
  verses: RigvedaVerse[];
}

export default function ExploreInterface({ verses }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVerses, setFilteredVerses] = useState<RigvedaVerse[]>([]);
  const [selectedMandala, setSelectedMandala] = useState<number | null>(null);
  const [suktaNumber, setSuktaNumber] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = searchVerses(verses, searchQuery);
      setFilteredVerses(results);
      setSelectedMandala(null);
      setSuktaNumber("");
    }
  };

  const handleMandalaFilter = (mandala: number) => {
    setSelectedMandala(mandala);
    const results = getVersesByMandala(verses, mandala);
    setFilteredVerses(results);
    setSearchQuery("");
    setSuktaNumber("");
  };

  const handleSuktaSearch = () => {
    if (selectedMandala && suktaNumber) {
      const sukta = parseInt(suktaNumber);
      if (!isNaN(sukta)) {
        const results = getVersesBySukta(verses, selectedMandala, sukta);
        setFilteredVerses(results);
      }
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilteredVerses([]);
    setSelectedMandala(null);
    setSuktaNumber("");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-orange-200/50 mb-6">
        {/* Text Search */}
        <div className="flex gap-3 mb-6">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search Suktas..."
            className="flex-1 h-12 px-4 rounded-xl border-2 border-orange-200 focus:border-orange-400 bg-white"
          />
          <Button
            onClick={handleSearch}
            className="h-12 px-6 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl btn-hover shadow-lg"
          >
            Search
          </Button>
          {(filteredVerses.length > 0 || selectedMandala) && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="h-12 px-6 border-2 border-orange-300 text-orange-900 hover:bg-orange-100 rounded-xl"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Mandala Filter */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-orange-900 mb-3">
            Filter by Mandala:
          </p>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <Button
                key={num}
                size="sm"
                variant={selectedMandala === num ? "default" : "outline"}
                onClick={() => handleMandalaFilter(num)}
                className={
                  selectedMandala === num
                    ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md"
                    : "border-2 border-orange-200 text-orange-900 hover:bg-orange-100"
                }
              >
                {num}
              </Button>
            ))}
          </div>
        </div>

        {/* Sukta Number Search (only shows when Mandala is selected) */}
        {selectedMandala && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200">
            <p className="text-sm font-semibold text-orange-900 mb-3">
              Search Sukta in Mandala {selectedMandala}:
            </p>
            <div className="flex gap-3">
              <Input
                type="number"
                value={suktaNumber}
                onChange={(e) => setSuktaNumber(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSuktaSearch()}
                placeholder="Enter Sukta number..."
                className="flex-1 h-12 px-4 rounded-xl border-2 border-orange-300 focus:border-orange-500 bg-white"
                min="1"
              />
              <Button
                onClick={handleSuktaSearch}
                disabled={!suktaNumber}
                className="h-12 px-6 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl btn-hover shadow-lg disabled:opacity-50"
              >
                Find Sukta
              </Button>
            </div>
          </div>
        )}
      </div>

      {filteredVerses.length === 0 && !searchQuery && !selectedMandala && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 text-center shadow-2xl border border-orange-200/50">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-5xl animate-float">
            📖
          </div>
          <h3 className="text-3xl font-bold gradient-text mb-4">
            Start Exploring
          </h3>
          <p className="text-lg text-orange-800/70 mb-6">
            Search for Suktas or filter by Mandala to begin your journey
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-amber-100">
            <span className="text-2xl">📚</span>
            <span className="font-semibold text-orange-900">
              {verses.length.toLocaleString()} Suktas loaded
            </span>
          </div>
        </div>
      )}

      {filteredVerses.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-orange-200/50">
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2">
              Found {filteredVerses.length.toLocaleString()} Sukta
              {filteredVerses.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="space-y-4 pr-4">
              {filteredVerses.map((verse, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl p-6 border-2 border-orange-100 card-hover shadow-md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className="border-orange-300 text-orange-900 bg-orange-50"
                      >
                        📖 Mandala {verse.mandala}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-amber-300 text-amber-900 bg-amber-50"
                      >
                        ✨ Sukta {verse.sukta}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-gray-800 whitespace-pre-wrap leading-relaxed font-serif text-lg">
                    {verse.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {filteredVerses.length === 0 && (searchQuery || selectedMandala) && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 text-center shadow-2xl border border-orange-200/50">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-5xl">
            🔍
          </div>
          <h3 className="text-3xl font-bold text-gray-700 mb-4">
            No Suktas Found
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Try a different search term, Mandala, or Sukta number
          </p>
          <Button
            onClick={clearFilters}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white btn-hover shadow-lg"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
