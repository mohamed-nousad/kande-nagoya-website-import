import { useSearchParams } from "react-router-dom";
import { StarIcon, SortArrowIcon } from "./Icon";
import { useGetStockListQuery } from "@/store/api/webStockApi";
import { usePagination } from "@/utils/hooks/usePagination";

const SearchResultsHeader = () => {
  const [searchParams] = useSearchParams();
  const { pagination } = usePagination();

  const filterParams = Object.fromEntries(searchParams);
  delete filterParams.page;
  delete filterParams.limit;

  const { data } = useGetStockListQuery({
    ...filterParams,
    page: pagination.page,
    limit: pagination.limit,
  });

  const totalCount = data?.totalCount ?? 0;

  return (
    <>
      <div className="stock-results-bar">
        <div className="stock-results-left">
          <span className="results-count">
            Search Results: {totalCount.toLocaleString()}
          </span>

          <div className="results-rating">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />

            <span className="rating-value">4.6</span>

            <a href="/" className="reviews-link">
              2,790 Reviews
            </a>
          </div>
        </div>

        <div className="stock-results-sort-wrapper">
          <div className="stock-results-sort">
            <span>Discounted Price</span>
            <SortArrowIcon />
          </div>

          <div className="stock-sort-line" />
        </div>
      </div>

      <div className="stock-results-divider" />
    </>
  );
};

export default SearchResultsHeader;