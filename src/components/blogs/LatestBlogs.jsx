import BlogCard from "../home/BlogCard";
import SeeMoreButton from "../home/SeeMoreButton";
import latestBlogsData from "../../data/latestBlogsData";

const LatestBlogs = () => {
  return (
    <section className="latest-blogs-section">
      <div className="latest-blogs-header">
        <h2>Latest Blog Posts</h2>

        <SeeMoreButton />
      </div>

      <div className="latest-blogs-grid">
        {Array.isArray(latestBlogsData) &&
        latestBlogsData.map((blog) => (
          <BlogCard
            key={blog.id}
            image={blog.image}
            category={blog.category}
            author={blog.author}
            date={blog.date}
            title={blog.title}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestBlogs;