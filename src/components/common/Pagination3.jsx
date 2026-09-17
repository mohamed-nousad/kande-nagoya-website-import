import { PAGE_SIZE_OPTIONS } from "@/constants";

const ChevronLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function getPageNumbers(page, pages) {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "...", pages];
  if (page >= pages - 3) return [1, "...", pages - 4, pages - 3, pages - 2, pages - 1, pages];
  return [1, "...", page - 1, page, page + 1, "...", pages];
}

export default function Pagination({ page, limit, total = 0, onPageChange, onLimitChange }) {
  const pages = Math.max(1, Math.ceil(total / limit));
  const from  = total === 0 ? 0 : (page - 1) * limit + 1;
  const to    = Math.min(page * limit, total);
  const pageNumbers = getPageNumbers(page, pages);

  return (
    <div className="pagination-bar">
      <span className="pagination-info">
        Showing {from}-{to} of {total} results
      </span>

      <div className="pagination-controls">
        <div className="pagination-nav">
          <button className="pagination-btn" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            <ChevronLeftIcon />
          </button>

          {pageNumbers.map((p, i) =>
            p === "..." ? (
              <span key={`dot-${i}`} className="pagination-dots">...</span>
            ) : (
              <button
                key={p}
                className={`pagination-btn ${p === page ? "active" : ""}`}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            )
          )}

          <button className="pagination-btn" disabled={page >= pages} onClick={() => onPageChange(page + 1)}>
            <ChevronRightIcon />
          </button>
        </div>

        <div className="pagination-rows">
          <select
            className="pagination-select"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}