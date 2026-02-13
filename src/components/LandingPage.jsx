import { useState, useRef, useCallback, useMemo, useEffect } from 'react';

const VALENTINE_VIEW_KEY = 'valentine-view';
const VALENTINE_YES_GIF_KEY = 'valentine-show-yes-gif';
import gif from '../assets/3138eaae6e8ea4ae435b640c38054afd.gif';
import kermitGif from '../assets/kermit-kermit-love.gif';
import imagesJpeg from '../assets/images.jpeg';
import heartsPng from '../assets/pngtree-smiling-face-with-hearts-emoji-png-image_15980169.png';
import photoRight from '../assets/7478539b7c5cab50e622ab4169806836.jpg';
import photoLeft from '../assets/4167bde8d78c482cb18a86542cbc7dbf.jpg';
import heartMemeGif from '../assets/heart-meme-heart.gif';
import like1 from '../assets/ea863fabd7ad0d6c2c054846ca34756d.jpg';
import like2 from '../assets/eef2667d2b5a197f8a5df9e2f828f4fb.jpg';
import like3 from '../assets/fefd95b4b551b14bd0be740fd1d4c471.jpg';
import like4 from '../assets/fullmetal-alchemist-roy-mustang.gif';
import like5 from '../assets/haerin-newjeans-haerin-heart.gif';
import like6 from '../assets/saltobears.gif';
import like7 from '../assets/stalin-stalino.gif';
import like8 from '../assets/2acedb27d6b496a931c9996f80df9038.jpg';
import like9 from '../assets/2c92481d3ce8dc4f73447c7b3cc6ee36.jpg';
import like10 from '../assets/04fde517d0dd7ec487c1c2b638e06d55.jpg';
import like11 from '../assets/7d40d16849de63b325dea9cefc591f92.jpg';
import like12 from '../assets/42c1008ed0161cb3fb13b38bd5da94bd.jpg';
import like13 from '../assets/94f71c5be81cbfb45e3fcb10195be61a.jpg';
import like14 from '../assets/210f65979dc9b4ed31b0b27492c5c056.jpg';
import like15 from '../assets/5551d1a4ea3b3154424b20f57bf13787.jpg';
import like16 from '../assets/3261865b5a9587424d5eddbab156d773.jpg';
import like17 from '../assets/a0175913b9ab3bf018ee09b7f628c390.jpg';
import like18 from '../assets/b0f7f8165f2dda408cde0730a2f08c23.jpg';
import like19 from '../assets/depositphotos_370580424-stock-illustration-cute-emoticon-heart-emoji-vector.jpg';
import like20 from '../assets/e4243cea6a2b24b8c57f1a3f0765537e.jpg';
import like21 from '../assets/heart-meme-heart (1).gif';
import yesGif from '../assets/uym3q9dazq9c1.gif';
import yesMusic from '../assets/Nandyan Agad Ako Lyrics  Flow G.mp3';

const LIKE_GALLERY_IMAGES = [
  like1, like2, like3, like4, like5, heartMemeGif, kermitGif, like6, like7,
  like8, like9, like10, like11, like12, like13, like14, gif, like15, like16,
  like17, like18, like19, like20, like21,
];

const RUN_AWAY_RADIUS = 180;
const RUN_AWAY_PUSH = 140;

function distToRect(px, py, rect) {
  const nearestX = Math.max(rect.left, Math.min(px, rect.right));
  const nearestY = Math.max(rect.top, Math.min(py, rect.bottom));
  return Math.hypot(px - nearestX, py - nearestY);
}

function IsaPaView({ onClose, onLike }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dislikeRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const btn = dislikeRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const dist = distToRect(e.clientX, e.clientY, rect);
    if (dist < RUN_AWAY_RADIUS && dist > 0) {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const len = Math.hypot(dx, dy) || 1;
      const push = (1 - dist / RUN_AWAY_RADIUS);
      setOffset({
        x: (-dx / len) * RUN_AWAY_PUSH * push,
        y: (-dy / len) * RUN_AWAY_PUSH * push,
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="min-h-screen flex flex-col items-center justify-center px-4 gap-6 py-8"
    >
      <h1 className="text-center text-xl md:text-2xl text-pink-800 font-medium max-w-xl">
        H1ndi ko aL4m ang k4t4pUs4n ng un1v3rse, p3ro aL4m ko, ang s1muL4, U N 1.
      </h1>
      <img src={heartMemeGif} alt="" className="max-w-sm w-full" />
      <div className="flex gap-4 items-center justify-center relative min-h-[48px]">
        <button
          ref={dislikeRef}
          type="button"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: 'transform 0.1s ease-out',
            pointerEvents: 'none',
          }}
          className="px-4 py-2 rounded-lg bg-gray-500 text-white font-medium select-none"
          aria-hidden
        >
          Dislike
        </button>
        <button
          type="button"
          onClick={onLike}
          className="px-4 py-2 rounded-lg bg-pink-600 text-white font-medium hover:bg-pink-700 transition-colors"
        >
          Like
        </button>
      </div>
    </div>
  );
}

function LandingPage() {
  const [showNext, setShowNext] = useState(false);
  const [photoToShow, setPhotoToShow] = useState(null);
  const [showIsaPaView, setShowIsaPaView] = useState(false);
  const [showLikeGallery, setShowLikeGallery] = useState(false);
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });
  const [noButtonOpacity, setNoButtonOpacity] = useState(1);
  const [showYesGif, setShowYesGif] = useState(false);
  const noButtonRef = useRef(null);
  const yesAudioRef = useRef(null);

  const SESSION_KEY = 'valentine-session-visited';

  useEffect(() => {
    const isRefresh = sessionStorage.getItem(SESSION_KEY);
    if (!isRefresh) {
      sessionStorage.setItem(SESSION_KEY, '1');
      return;
    }
    const saved = localStorage.getItem(VALENTINE_VIEW_KEY);
    const savedYesGif = localStorage.getItem(VALENTINE_YES_GIF_KEY);
    if (saved === 'likeGallery') {
      setShowLikeGallery(true);
      if (savedYesGif === 'true') setShowYesGif(true);
    } else if (saved === 'isaPa') {
      setShowNext(true);
      setShowIsaPaView(true);
    } else if (saved === 'photoRight') {
      setShowNext(true);
      setPhotoToShow('right');
    } else if (saved === 'photoLeft') {
      setShowNext(true);
      setPhotoToShow('left');
    } else if (saved === 'quote') {
      setShowNext(true);
    }
  }, []);

  useEffect(() => {
    const view = showLikeGallery
      ? 'likeGallery'
      : showIsaPaView
        ? 'isaPa'
        : photoToShow === 'right'
          ? 'photoRight'
          : photoToShow === 'left'
            ? 'photoLeft'
            : showNext
              ? 'quote'
              : 'landing';
    localStorage.setItem(VALENTINE_VIEW_KEY, view);
  }, [showNext, photoToShow, showIsaPaView, showLikeGallery]);

  useEffect(() => {
    if (showYesGif) {
      localStorage.setItem(VALENTINE_YES_GIF_KEY, 'true');
    } else {
      localStorage.removeItem(VALENTINE_YES_GIF_KEY);
    }
  }, [showYesGif]);

  useEffect(() => {
    if (!showYesGif) return;
    if (!yesAudioRef.current) yesAudioRef.current = new Audio(yesMusic);
    yesAudioRef.current.play().catch(() => {});
  }, [showYesGif]);

  const handleGalleryMouseMove = useCallback((e) => {
    const btn = noButtonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const dist = distToRect(e.clientX, e.clientY, rect);
    if (dist < RUN_AWAY_RADIUS && dist > 0) {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const len = Math.hypot(dx, dy) || 1;
      const push = (1 - dist / RUN_AWAY_RADIUS);
      setNoButtonOffset({
        x: (-dx / len) * RUN_AWAY_PUSH * push,
        y: (-dy / len) * RUN_AWAY_PUSH * push,
      });
      setNoButtonOpacity(Math.max(0.15, dist / RUN_AWAY_RADIUS));
    } else {
      setNoButtonOffset({ x: 0, y: 0 });
      setNoButtonOpacity(1);
    }
  }, []);

  const likeGallerySlots = useMemo(() => {
    const cols = 6;
    const rows = 5;
    const slots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        slots.push({
          left: (c / cols) * 100,
          top: (r / rows) * 100,
          widthPct: 100 / cols,
          heightPct: 100 / rows,
        });
      }
    }
    for (let i = slots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slots[i], slots[j]] = [slots[j], slots[i]];
    }
    return slots;
  }, [showLikeGallery]);

  if (showLikeGallery) {
    return (
      <div
        className="fixed inset-0 h-screen w-screen overflow-hidden"
        onMouseMove={handleGalleryMouseMove}
        onMouseLeave={() => {
          setNoButtonOffset({ x: 0, y: 0 });
          setNoButtonOpacity(1);
        }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-6">
          <p
            className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-pink-800 whitespace-nowrap"
            style={{
              WebkitTextStroke: '2px white',
              paintOrder: 'stroke fill',
            }}
          >
            Will you be my valentine ?
          </p>
          <div className="flex gap-16 items-center relative min-h-[80px]">
            <button
              ref={noButtonRef}
              type="button"
              style={{
                transform: `translate(${noButtonOffset.x}px, ${noButtonOffset.y}px)`,
                opacity: noButtonOpacity,
                transition: 'transform 0.1s ease-out, opacity 0.5s ease-out',
                pointerEvents: 'none',
              }}
              className="px-14 py-6 text-2xl md:text-3xl font-bold bg-gray-500 text-white select-none"
              aria-hidden
            >
              No
            </button>
            <button
              type="button"
              onClick={() => setShowYesGif(true)}
              className="relative overflow-hidden px-14 py-6 text-2xl md:text-3xl font-bold bg-pink-600 text-white hover:bg-pink-700 transition-all duration-300 ease-out hover:scale-[2.5]"
            >
              <span
                className="pointer-events-none absolute inset-0 z-0 w-[50%] animate-shine-slide"
                style={{
                  backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                }}
              />
              <span className="relative z-10">YES</span>
            </button>
          </div>
        </div>
        {showYesGif && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <img
              src={yesGif}
              alt=""
              className="w-[90vw] max-w-5xl object-contain mt-40"
            />
          </div>
        )}
        {LIKE_GALLERY_IMAGES.map((src, i) => {
          const slot = likeGallerySlots[i];
          if (!slot) return null;
          return (
            <div
              key={i}
              className="absolute flex items-center justify-center p-0.5"
              style={{
                left: `${slot.left}%`,
                top: `${slot.top}%`,
                width: `${slot.widthPct}%`,
                height: `${slot.heightPct}%`,
              }}
            >
              <img
                src={src}
                alt=""
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
          );
        })}
      </div>
    );
  }

  if (showIsaPaView) {
    return (
      <IsaPaView
        onClose={() => setShowIsaPaView(false)}
        onLike={() => {
          setShowIsaPaView(false);
          setShowLikeGallery(true);
        }}
      />
    );
  }

  if (photoToShow) {
    const isRight = photoToShow === 'right';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-6 py-8">
        {isRight ? (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 max-w-4xl">
            {Array.from({ length: 15 }, (_, i) => (
              <img key={i} src={photoRight} alt="" className="w-full rounded-lg shadow-lg object-cover aspect-square" />
            ))}
          </div>
        ) : (
          <img src={photoLeft} alt="" className="max-w-2xl w-full rounded-lg shadow-lg" />
        )}
        <button
          type="button"
          onClick={() => {
            if (photoToShow === 'right') {
              setPhotoToShow(null);
              setShowIsaPaView(true);
            } else {
              setPhotoToShow(null);
              setShowLikeGallery(true);
            }
          }}
          className="px-4 py-2 rounded-lg bg-pink-600 text-white font-medium hover:bg-pink-700 transition-colors"
        >
          {photoToShow === 'right' ? 'isa pa hihihi' : 'Back'}
        </button>
      </div>
    );
  }

  if (showNext) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-6">
        <p className="text-center text-xl md:text-2xl text-pink-800 font-medium max-w-xl animate-fade-in-up">
          Akala ko sa H nagsisimula ang HAPPINESS, bakit yung akin nagsisimula sa U.
        </p>
        <img src={kermitGif} alt="" className="max-w-sm w-full" />
        <div className="w-full max-w-sm flex justify-between items-end">
          <button type="button" onClick={() => setPhotoToShow('left')} className="focus:outline-none">
            <img src={heartsPng} alt="" className="max-w-[120px] w-full transition-transform duration-200 hover:scale-110 cursor-pointer mt-4" />
          </button>
          <button type="button" onClick={() => setPhotoToShow('right')} className="focus:outline-none">
            <img src={imagesJpeg} alt="" className="max-w-[90px] w-full rounded-lg transition-transform duration-200 hover:scale-110 cursor-pointer" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-h-[50vh] w-full max-w-2xl flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-semibold text-pink-800 animate-fade-in-up">
          Hi
        </h1>
        <div className="relative w-full max-w-sm">
          <img src={gif} alt="" className="w-full -scale-x-100" />
          <button
            type="button"
            onClick={() => setShowNext(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-pink-600 text-white font-medium hover:bg-pink-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
