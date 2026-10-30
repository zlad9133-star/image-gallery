import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaHeart, FaImages, FaRandom } from "react-icons/fa";
import SearchBar from "./components/SearchBar";
import ImageGrid from "./components/ImageGrid";
import "./App.css";

const API_URL = "https://api.unsplash.com";
const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("gallery-favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const closeButtonRef = useRef(null);
  useEffect(() => {
    localStorage.setItem("gallery-favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    if (!selectedImage) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedImage]);
  const fetchImages = useCallback(async (search = "") => {
    setLoading(true);
    setError("");
    setShowFavorites(false);
    try {
      if (!API_KEY) {
        // وضع العرض التجريبي: صور مجانية من Picsum بدون مفتاح API
        const page = Math.floor(Math.random() * 10) + 1;
        const { data } = await axios.get("https://picsum.photos/v2/list", {
          params: { page, limit: 60 },
        });
        const term = search.toLowerCase();
        const list = data
          .filter((p) => !term || p.author.toLowerCase().includes(term))
          .slice(0, 24)
          .map((p) => ({
            id: `picsum-${p.id}`,
            alt_description: `صورة بواسطة ${p.author}`,
            user: { name: p.author },
            urls: {
              small: `https://picsum.photos/id/${p.id}/400/300`,
              regular: `https://picsum.photos/id/${p.id}/1080/720`,
            },
            links: { download: p.download_url },
          }));
        setImages(list);
        setQuery(search);
        return;
      }
      const endpoint = search ? "/search/photos" : "/photos/random";
      const params = search ? { query: search, per_page: 24 } : { count: 24 };
      const { data } = await axios.get(`${API_URL}${endpoint}`, {
        params,
        headers: { Authorization: `Client-ID ${API_KEY}` },
      });
      setImages(search ? data.results : data);
      setQuery(search);
    } catch {
      setError(
        "تعذّر تحميل الصور. تأكد من المفتاح واتصال الإنترنت ثم حاول مجددًا.",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const initialFetch = window.setTimeout(fetchImages, 0);
    return () => window.clearTimeout(initialFetch);
  }, [fetchImages]);
  const toggleFavorite = (image) =>
    setFavorites((current) =>
      current.some(({ id }) => id === image.id)
        ? current.filter(({ id }) => id !== image.id)
        : [...current, image],
    );
  const displayedImages = showFavorites ? favorites : images;
  return (
    <main className="app-shell" dir="rtl">
      <header className="hero-section">
        <div className="brand">
          <FaImages /> Lenscape
        </div>
        <div className="hero-copy">
          <p className="eyebrow">اكتشف لحظة جديدة</p>
          <h1>صور تلهم أفكارك</h1>
          <p>ابحث في مجموعة منتقاة من صور Unsplash الرائعة واحفظ ما تحب.</p>
        </div>
        <SearchBar onSearch={fetchImages} />
      </header>
      <section className="gallery-section" aria-live="polite">
        <div className="gallery-toolbar">
          <div>
            <p className="section-kicker">
              {showFavorites
                ? "مجموعتك الخاصة"
                : query
                  ? `نتائج “${query}”`
                  : "اختيارات عشوائية"}
            </p>
            <h2>
              {showFavorites
                ? `${favorites.length} صورة محفوظة`
                : "استكشف المعرض"}
            </h2>
          </div>
          <div className="view-actions">
            <button
              className={!showFavorites ? "active" : ""}
              onClick={() => setShowFavorites(false)}
            >
              <FaRandom /> اكتشف
            </button>
            <button
              className={showFavorites ? "active" : ""}
              onClick={() => setShowFavorites(true)}
            >
              <FaHeart /> المفضلة <span>{favorites.length}</span>
            </button>
          </div>
        </div>
        {loading && (
          <div className="status-card">
            <i /> جاري استكشاف صور جديدة…
          </div>
        )}
        {error && (
          <div className="status-card error">
            <strong>حدث خطأ</strong>
            <span>{error}</span>
            <button onClick={() => fetchImages(query)}>إعادة المحاولة</button>
          </div>
        )}
        {!loading && !error && (
          <ImageGrid
            images={displayedImages}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelect={setSelectedImage}
          />
        )}
      </section>
      {selectedImage && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="عرض الصورة"
          onClick={() => setSelectedImage(null)}
        >
          <button
            ref={closeButtonRef}
            className="close"
            type="button"
            aria-label="إغلاق عرض الصورة"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage.urls.regular}
            alt={selectedImage.alt_description || "صورة من Unsplash"}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
export default App;
