import ImageCard from "./ImageCard";
function ImageGrid({ images, favorites, onToggleFavorite, onSelect }) {
  if (!images.length)
    return (
      <div className="empty-state">
        لا توجد صور هنا بعد. جرّب بحثًا مختلفًا أو أضف صورًا إلى المفضلة.
      </div>
    );
  return (
    <div className="image-grid">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          isFavorite={favorites.some(({ id }) => id === image.id)}
          onToggleFavorite={onToggleFavorite}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
export default ImageGrid;
