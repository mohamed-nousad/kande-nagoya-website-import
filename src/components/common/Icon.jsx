const Icon = ({ src, alt = "icon", className = "", ...props }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    {...props}
  />
);

export default Icon;