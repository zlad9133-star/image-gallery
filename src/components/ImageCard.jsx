import { FaDownload, FaHeart, FaRegHeart } from "react-icons/fa";

function ImageCard({ image, isFavorite, onToggleFavorite, onSelect }) {
  const title =
    image.alt_description || image.description || "صورة من Unsplash";
  return (
    <article className="image-card">
      <button
        className="image-trigger"
        type="button"
        onClick={() => onSelect(image)}
        aria-label={`عرض ${title}`}
      >
        <img
          src={image.urls.small}
          srcSet={`${image.urls.small} 400w, ${image.urls.regular} 1080w`}
          sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
          alt={title}
          loading="lazy"
        />
      </button>
      <div className="image-overlay">
        <div>
          <p>{title}</p>
          <small>بواسطة {image.user?.name || "Unsplash"}</small>
        </div>
        <div className="card-actions">
          <button
            className={isFavorite ? "liked" : ""}
            type="button"
            onClick={() => onToggleFavorite(image)}
            aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
          <a
            href={image.links.download_location || image.links.download}
            target="_blank"
            rel="noreferrer"
            aria-label="فتح رابط التنزيل"
          >
            <FaDownload />
          </a>
        </div>
      </div>
    </article>
  );
}
export default ImageCard;
