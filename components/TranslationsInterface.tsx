"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchDocumentById,
  VedaWebDocument,
  formatLocation,
  getTranslations,
  getOriginalVersions,
} from "@/lib/vedaweb-api";
import {
  getSuktaNumbers,
  getVerseNumbers,
  isValidLocation,
} from "@/lib/rigveda-structure";

export default function TranslationsInterface() {
  const [mandala, setMandala] = useState("");
  const [sukta, setSukta] = useState("");
  const [verse, setVerse] = useState("");
  const [document, setDocument] = useState<VedaWebDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [availableSuktas, setAvailableSuktas] = useState<number[]>([]);
  const [availableVerses, setAvailableVerses] = useState<number[]>([]);

  // Update available Suktas when Mandala changes
  useEffect(() => {
    if (mandala) {
      const suktas = getSuktaNumbers(parseInt(mandala));
      setAvailableSuktas(suktas);
      // Reset Sukta and Verse when Mandala changes
      setSukta("");
      setVerse("");
      setAvailableVerses([]);
    } else {
      setAvailableSuktas([]);
      setSukta("");
      setVerse("");
      setAvailableVerses([]);
    }
  }, [mandala]);

  // Update available verses when Sukta changes
  useEffect(() => {
    if (mandala && sukta) {
      const verses = getVerseNumbers(parseInt(mandala), parseInt(sukta));
      setAvailableVerses(verses);
      // Reset Verse when Sukta changes
      setVerse("");
    } else {
      setAvailableVerses([]);
      setVerse("");
    }
  }, [mandala, sukta]);

  const handleFetch = async () => {
    if (!mandala || !sukta || !verse) {
      setError("Please select Mandala, Sukta, and Verse");
      return;
    }

    // Validate location
    if (!isValidLocation(parseInt(mandala), parseInt(sukta), parseInt(verse))) {
      setError("Invalid location. This verse does not exist.");
      return;
    }

    setLoading(true);
    setError(null);
    setDocument(null);

    try {
      const locationId = `${mandala}.${sukta}.${verse}`;
      const result = await fetchDocumentById(locationId);

      if (result) {
        setDocument(result);
      } else {
        setError("Sukta not found. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch translation");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMandala("");
    setSukta("");
    setVerse("");
    setDocument(null);
    setError(null);
    setAvailableSuktas([]);
    setAvailableVerses([]);
  };

  const originalVersions = document?.versions
    ? getOriginalVersions(document.versions)
    : [];
  const translations = document?.versions
    ? getTranslations(document.versions)
    : [];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-orange-200/50 mb-6">
        <h2 className="text-2xl font-bold gradient-text mb-6 text-center">
          Find a Sukta
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-orange-900 mb-2">
              📖 Mandala
            </label>
            <Select value={mandala} onValueChange={setMandala}>
              <SelectTrigger className="h-12 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 bg-white text-gray-900">
                <SelectValue placeholder="Select Mandala..." />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-orange-200 rounded-xl shadow-2xl">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="cursor-pointer hover:bg-orange-50 focus:bg-orange-100 rounded-lg my-1"
                  >
                    Mandala {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-orange-900 mb-2">
              ✨ Sukta {mandala && `(1-${availableSuktas.length})`}
            </label>
            <Select value={sukta} onValueChange={setSukta} disabled={!mandala}>
              <SelectTrigger className="h-12 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 bg-white text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                <SelectValue placeholder="Select Sukta..." />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-orange-200 rounded-xl shadow-2xl max-h-[300px]">
                {availableSuktas.map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="cursor-pointer hover:bg-orange-50 focus:bg-orange-100 rounded-lg my-1"
                  >
                    Sukta {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-orange-900 mb-2">
              📝 Verse {sukta && `(1-${availableVerses.length})`}
            </label>
            <Select value={verse} onValueChange={setVerse} disabled={!sukta}>
              <SelectTrigger className="h-12 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 bg-white text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                <SelectValue placeholder="Select Verse..." />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-orange-200 rounded-xl shadow-2xl max-h-[300px]">
                {availableVerses.map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="cursor-pointer hover:bg-orange-50 focus:bg-orange-100 rounded-lg my-1"
                  >
                    Verse {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            <Button
              onClick={handleFetch}
              disabled={loading || !mandala || !sukta || !verse}
              className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl btn-hover shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading...
                </>
              ) : (
                "Get Translation"
              )}
            </Button>
            {document && (
              <Button
                onClick={handleClear}
                variant="outline"
                className="h-12 px-4 border-2 border-orange-300 text-orange-900 hover:bg-orange-100 rounded-xl"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>💡 Tip:</strong> Select a Mandala first, then choose from
            available Suktas, and finally select a verse.
          </p>
        </div>
      </div>

      {/* Results Section */}
      {document && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Location Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-2">
                  Rigveda{" "}
                  {document.location ||
                    formatLocation(
                      document.book,
                      document.hymn,
                      document.stanza
                    )}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/20 text-white border-white/30">
                    📖 Mandala {document.book}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    ✨ Sukta {document.hymn}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    📝 Verse {document.stanza}
                  </Badge>
                  {document.hymnAddressee && (
                    <Badge className="bg-white/20 text-white border-white/30">
                      🙏 {document.hymnAddressee}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Original Text Versions */}
          {originalVersions.length > 0 && (
            <Card className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-orange-200/50">
              <h4 className="text-2xl font-bold gradient-text mb-6 flex items-center gap-2">
                <span>📜</span> Original Sanskrit Text
              </h4>
              <div className="space-y-4">
                {originalVersions.map((version, idx) => {
                  const text = Array.isArray(version.form)
                    ? version.form.join(" ")
                    : version.form;
                  return (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-100"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Badge
                          variant="outline"
                          className="border-orange-300 text-orange-900 bg-white"
                        >
                          {version.source}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-orange-200 text-orange-800 bg-white text-xs"
                        >
                          {version.language}
                        </Badge>
                      </div>
                      <p className="text-gray-800 text-lg leading-relaxed font-serif whitespace-pre-wrap">
                        {text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Translations */}
          {translations.length > 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-orange-200/50">
              <h4 className="text-2xl font-bold gradient-text mb-6 flex items-center gap-2">
                <span>🌐</span> Translations ({translations.length})
              </h4>
              <div className="space-y-4">
                {translations.map((translation, idx) => {
                  const text = Array.isArray(translation.form)
                    ? translation.form.join(" ")
                    : translation.form;
                  const languageMap: { [key: string]: string } = {
                    deu: "German",
                    eng: "English",
                    fra: "French",
                    rus: "Russian",
                  };
                  const languageName =
                    languageMap[translation.language] || translation.language;

                  return (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100 card-hover"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Badge
                          variant="outline"
                          className="border-blue-300 text-blue-900 bg-white"
                        >
                          {languageName}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-indigo-300 text-indigo-900 bg-white"
                        >
                          {translation.source}
                        </Badge>
                      </div>
                      <p className="text-gray-800 text-lg leading-relaxed">
                        {text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          ) : (
            <Card className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-orange-200/50 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h4 className="text-xl font-bold text-gray-700 mb-2">
                No Translations Available
              </h4>
              <p className="text-gray-600">
                This verse doesn't have translations in the database yet.
              </p>
            </Card>
          )}

          {/* Additional Metadata */}
          {(document.strata || document.hymnGroup) && (
            <Card className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-orange-200/50">
              <h4 className="text-lg font-bold gradient-text mb-3">
                Additional Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {document.strata && (
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4">
                    <p className="text-sm text-orange-700 font-semibold mb-1">
                      Strata
                    </p>
                    <p className="text-orange-900">{document.strata}</p>
                  </div>
                )}
                {document.hymnGroup && (
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4">
                    <p className="text-sm text-orange-700 font-semibold mb-1">
                      Hymn Group
                    </p>
                    <p className="text-orange-900">{document.hymnGroup}</p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Empty State */}
      {!document && !loading && !error && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 text-center shadow-2xl border border-orange-200/50">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-5xl animate-float">
            🌐
          </div>
          <h3 className="text-3xl font-bold gradient-text mb-4">
            Discover Translations
          </h3>
          <p className="text-lg text-orange-800/70 mb-6">
            Select a Mandala, Sukta, and Verse above to view translations from
            various scholars
          </p>
        </div>
      )}
    </div>
  );
}
