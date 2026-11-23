import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Pause, Play, Search, X } from "lucide-react";
import AtlasMap from "@/components/atlas/AtlasMap";
import ChapterRail from "@/components/atlas/ChapterRail";
import PlacePanel from "@/components/atlas/PlacePanel";
import Intro from "@/components/atlas/Intro";
import { PLACES, searchPlaces } from "@/lib/atlas";
import { RESOLVED_CHAPTERS, chapterById } from "@/data/chapters";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Atlas() {
  const [entered, setEntered] = useState(false);
  const [chapterId, setChapterId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [camera, setCamera] = useState({ lat: 57.45, lng: -153.3, zoom: 7.2, key: 0 });
  const [journey, setJourney] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  const chapter = chapterId ? chapterById(chapterId) : null;
  const selected = selectedId ? PLACES.find((p) => p.id === selectedId) : null;

  const visible = useMemo(() => {
    if (query.trim().length > 1) return searchPlaces(query);
    if (chapter) return chapter.places;
    return PLACES;
  }, [query, chapter]);

  const results = useMemo(
    () => (query.trim().length > 1 ? searchPlaces(query).slice(0, 7) : []),
    [query]
  );

  const fly = useCallback((p, zoom = 12) => {
    setCamera((c) => ({ lat: p.lat, lng: p.lng, zoom, key: c.key + 1 }));
  }, []);

  const playPlace = useCallback(
    (p) => {
      const el = audioRef.current;
      if (!el || !p?.audio) return;
      if (playingId === p.id) {
        el.pause();
        setPlayingId(null);
        return;
      }
      el.src = p.audio;
      el.load();
      el.play()
        .then(() => setPlayingId(p.id))
        .catch(() => setPlayingId(null));
    },
    [playingId]
  );

  const selectPlace = useCallback(
    (p) => {
      setSelectedId(p.id);
      setJourney(null);
      audioRef.current?.pause();
      setPlayingId(null);
      fly(p, 12);
    },
    [fly]
  );

  const step = useCallback((dir) => {
    setJourney((j) => {
      if (!j) return j;
      const ch = chapterById(j.chapterId);
      const next = j.index + dir;
      if (next < 0) return { ...j, index: 0 };
      if (next >= (ch?.places.length || 0)) return { ...j, playing: false };
      return { ...j, index: next };
    });
  }, []);

  const startJourney = useCallback((id) => {
    setEntered(true);
    setChapterId(id);
    setQuery("");
    setJourney({ chapterId: id, index: 0, playing: true });
  }, []);

  const selectChapter = useCallback((id) => {
    setJourney(null);
    audioRef.current?.pause();
    setPlayingId(null);
    setSelectedId(null);
    setChapterId(id);
    const ch = id ? chapterById(id) : null;
    if (ch) {
      setCamera((c) => ({ lat: ch.center[0], lng: ch.center[1], zoom: ch.zoom, key: c.key + 1, duration: 1.8 }));
    } else {
      setCamera((c) => ({ lat: 57.45, lng: -153.3, zoom: 7.2, key: c.key + 1, duration: 1.8 }));
    }
  }, []);

  // Cinematic fly-through: wide view of the district, then a two-stage descent.
  useEffect(() => {
    if (!journey) return;
    const ch = chapterById(journey.chapterId);
    const place = ch?.places[journey.index];
    if (!place) return;
    let cancelled = false;
    setSelectedId(place.id);

    (async () => {
      setCamera((c) => ({
        lat: ch.center[0],
        lng: ch.center[1],
        zoom: ch.zoom,
        key: c.key + 1,
        duration: 1.9,
      }));
      await sleep(1600);
      if (cancelled) return;
      setCamera((c) => ({ lat: place.lat, lng: place.lng, zoom: 9.7, key: c.key + 1, duration: 1.8 }));
      await sleep(1550);
      if (cancelled) return;
      setCamera((c) => ({
        lat: place.lat + 0.009,
        lng: place.lng + 0.006,
        zoom: 12.1,
        key: c.key + 1,
        duration: 4.5,
      }));
      await sleep(1000);
      if (cancelled || !journey.playing) return;
      playPlace(place);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journey?.chapterId, journey?.index]);

  const handleEnded = () => {
    setPlayingId(null);
    if (journey?.playing) step(1);
  };

  const toggleJourney = () => {
    if (!journey) return;
    const ch = chapterById(journey.chapterId);
    const place = ch?.places[journey.index];
    if (journey.playing) {
      audioRef.current?.pause();
      setPlayingId(null);
      setJourney({ ...journey, playing: false });
    } else {
      setJourney({ ...journey, playing: true });
      if (place) playPlace(place);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSelectedId(null);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const currentJourneyPlace =
    journey && chapterById(journey.chapterId)?.places[journey.index];

  return (
    <div className="relative isolate h-[100dvh] w-full overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      <AtlasMap places={visible} selected={selected} camera={camera} onSelect={selectPlace} />

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(115%_95%_at_50%_5%,transparent_38%,rgba(5,9,13,0.82)_100%)]" />

      {/* header */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 px-4 pt-4 md:px-7 md:pt-6">
        <Link to="/" className="pointer-events-auto flex items-baseline gap-2.5">
          <span className="atlas-serif text-[21px] font-light leading-none tracking-[0.01em]">
            Sun&rsquo;aq
          </span>
          <span className="atlas-label text-[var(--paper-dim)]">Atlas</span>
        </Link>

        <div className="pointer-events-auto flex items-center gap-2">
          <div className="relative">
            <div
              className={`flex items-center gap-2 border border-[var(--ink-line)] bg-[rgba(5,9,13,0.72)] backdrop-blur-md transition-all ${
                searchOpen ? "w-[230px] md:w-[300px]" : "w-[150px] md:w-[220px]"
              }`}
            >
              <Search size={13} className="ml-3 shrink-0 text-[var(--paper-dim)]" />
              <input
                value={query}
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a name"
                className="w-full bg-transparent py-2.5 pr-3 text-[12px] text-[var(--paper)] placeholder:text-[var(--paper-dim)]/70 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="mr-2 shrink-0 text-[var(--paper-dim)] hover:text-[var(--paper)]"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {results.length > 0 && (
              <div className="absolute right-0 top-[calc(100%+6px)] w-[290px] border border-[var(--ink-line)] bg-[rgba(10,17,25,0.97)] backdrop-blur-xl md:w-[330px]">
                {results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                      selectPlace(p);
                    }}
                    className="flex w-full items-baseline justify-between gap-3 border-b border-[var(--ink-line)] px-4 py-2.5 text-left last:border-b-0 hover:bg-[rgba(243,237,227,0.06)]"
                  >
                    <span className="atlas-serif truncate text-[14px]">{p.alutiiq}</span>
                    <span className="truncate text-[10.5px] text-[var(--paper-dim)]">
                      {p.english || p.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/about"
            className="atlas-label hidden border border-[var(--ink-line)] bg-[rgba(5,9,13,0.72)] px-3.5 py-2.5 text-[var(--paper-dim)] backdrop-blur-md transition-colors hover:text-[var(--paper)] sm:block"
          >
            About
          </Link>
        </div>
      </header>

      {/* chapters */}
      <div className="absolute inset-x-0 top-[62px] z-20 px-4 md:left-7 md:right-auto md:top-24 md:w-[292px] md:px-0">
        <ChapterRail
          chapters={RESOLVED_CHAPTERS}
          activeId={chapterId}
          onSelect={selectChapter}
          onPlay={startJourney}
          total={PLACES.length}
        />
      </div>

      {/* journey bar */}
      {journey && currentJourneyPlace && (
        <div className="pointer-events-auto absolute inset-x-4 bottom-4 z-30 mx-auto max-w-md border border-[var(--ink-line)] bg-[rgba(10,17,25,0.97)] px-4 py-3 backdrop-blur-xl md:inset-x-auto md:bottom-7 md:left-1/2 md:w-[420px] md:-translate-x-1/2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => step(-1)}
              className="p-1.5 text-[var(--paper-dim)] transition-colors hover:text-[var(--paper)]"
              aria-label="Previous place"
            >
              <ArrowLeft size={15} strokeWidth={1.7} />
            </button>
            <button
              onClick={toggleJourney}
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--paper)]/25 text-[var(--paper)] transition-colors hover:bg-[var(--paper)] hover:text-[var(--ink)]"
              aria-label={journey.playing ? "Pause journey" : "Play journey"}
            >
              {journey.playing ? (
                <Pause size={13} strokeWidth={2} fill="currentColor" />
              ) : (
                <Play size={13} strokeWidth={2} fill="currentColor" className="ml-0.5" />
              )}
            </button>
            <button
              onClick={() => step(1)}
              className="p-1.5 text-[var(--paper-dim)] transition-colors hover:text-[var(--paper)]"
              aria-label="Next place"
            >
              <ArrowRight size={15} strokeWidth={1.7} />
            </button>

            <div className="min-w-0 flex-1 pl-1">
              <div className="atlas-serif truncate text-[15px] leading-tight">
                {currentJourneyPlace.alutiiq}
              </div>
              <div className="truncate text-[10px] uppercase tracking-[0.18em] text-[var(--paper-dim)]">
                {chapterById(journey.chapterId)?.name} · {journey.index + 1} of{" "}
                {chapterById(journey.chapterId)?.places.length}
              </div>
            </div>

            <button
              onClick={() => {
                setJourney(null);
                audioRef.current?.pause();
                setPlayingId(null);
              }}
              className="p-1.5 text-[var(--paper-dim)] transition-colors hover:text-[var(--paper)]"
              aria-label="End journey"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <PlacePanel
        place={selected}
        playing={playingId === selected?.id}
        onListen={playPlace}
        onClose={() => setSelectedId(null)}
        hiddenOnMobile={!!journey}
      />

      <div className="pointer-events-none absolute bottom-2 left-4 z-10 hidden text-[9px] uppercase tracking-[0.16em] text-[var(--paper-dim)]/50 md:left-7 md:block">
        Imagery © Esri, Maxar, Earthstar Geographics · Names &amp; audio © Alutiiq Museum
      </div>

      <audio ref={audioRef} onEnded={handleEnded} onPause={() => {}} className="hidden" />

      {!entered && (
        <Intro
          chapters={RESOLVED_CHAPTERS}
          total={PLACES.length}
          onEnter={() => {
            setEntered(true);
            setCamera((c) => ({ lat: 57.45, lng: -153.3, zoom: 7.2, key: c.key + 1, duration: 2.2 }));
          }}
          onPickChapter={startJourney}
        />
      )}
    </div>
  );
}
