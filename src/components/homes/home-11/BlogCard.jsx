const BlogCard = ({
  image,
  category,
  author,
  date,
  title,
}) => {
  return (
    <article className="blog-card">
      <div className="blog-card__image-wrapper">
       <img
          src={image || ""}
          alt={title || "Blog image"}
          className="blog-card__image"
        />

        <span className="blog-card__badge">
          {category}
        </span>
      </div>

      <div className="blog-card__content">
        <div className="blog-card__meta">
          <span className="blog-card__author">
            {author}
          </span>

          <span className="blog-card__dot">•</span>

          <span className="blog-card__date">
            {date}
          </span>
        </div>

        <h3 className="blog-card__title">
          {title}
        </h3>
      </div>
    </article>
  );
};

export default BlogCard;