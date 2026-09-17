export default function Loading({ solidBg = false, inline = false, tall = false }) {
  return (
    <section
      className={`loading d-flex flex-column align-items-center justify-content-center text-center ${
        solidBg ? "loading--solid" : ""
      } ${inline ? "loading--inline" : ""} ${tall ? "loading--tall" : ""}`}
    >
      <span className="loading__spinner"></span>
      <p className="loading__text">Loading...</p>
    </section>
  );
}