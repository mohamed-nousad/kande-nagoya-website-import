import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetStockListQuery } from "@/store/api/webStockApi";
import { usePagination } from "@/utils/hooks/usePagination";
import StockVehicleCard from "./StockVehicleCard";
import Loading from "../common/Loading";
import Inquiry from "../modals/Inquiry";

const StockVehicleList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pagination, setPage, setLimit } = usePagination();
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const filterParams = Object.fromEntries(searchParams);
  delete filterParams.page;
  delete filterParams.limit;

  const { data, isLoading, isError } = useGetStockListQuery({
    ...filterParams,
    page: pagination.page,
    limit: pagination.limit,
  });

  const vehicles = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) {
    return <section className="stock-vehicle-list"><Loading inline/></section>;
  }

  if (isError || vehicles.length === 0) {
    const country = searchParams.get("country");
    const port = searchParams.get("port");

    // Port-specific empty state
    if (port) {
      return (
        <section className="stock-vehicle-list">
          <div className="country-stock-empty">
            <h4 className="country-stock-empty__title">
              No stocks available for {port} port
            </h4>
            <p className="country-stock-empty__desc">
              We don't have any stocks for this port right now. Please select a nearby port.
            </p>
            <button
              type="button"
              className="country-stock-empty__btn"
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                next.delete("port");
                setSearchParams(next, { replace: true });
              }}
            >
             View Country Stocks
            </button>
          </div>
        </section>
      );
    }

    // Country-specific empty state
    if (country) {
      return (
        <section className="stock-vehicle-list">
          <div className="country-stock-empty">
            <h4 className="country-stock-empty__title">
              No stocks available for {country}
            </h4>
            <p className="country-stock-empty__desc">
              We don't have any stocks for this country right now. Please select a nearby country.
            </p>
            <button
              type="button"
              className="country-stock-empty__btn"
              onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}
            >
              View all stocks
            </button>
          </div>
        </section>
      );
    }

    // Generic fallback (no country/port in URL)
    return (
      <section className="stock-vehicle-list">
        <div className="country-stock-empty">
          <h4 className="country-stock-empty__title">No stocks match your search.</h4>
          <p className="country-stock-empty__desc">
            We don't have any stocks for your search right now.
          </p>
          <button
            type="button"
            className="country-stock-empty__btn"
            onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}
          >
            View all stocks
          </button>
        </div>
      </section>
    );
  }

  const pageNumbers = [];
  const maxButtons = 5;
  for (let i = 1; i <= Math.min(totalPages, maxButtons); i++) {
    pageNumbers.push(i);
  }
  const showTail = totalPages > maxButtons;

  return (
    <>
      <section className="stock-vehicle-list">
        <div className="stock-vehicle-scroll">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="stock-vehicle-item">
              <StockVehicleCard vehicle={vehicle} onInquiry={() => setSelectedVehicleId(vehicle?._id)} />
            </div>
          ))}
        </div>
      </section>

      <div className="stock-pagination-wrapper">
        <div className="stock-pagination">
          {pageNumbers.map((n) => (
            <button
              key={n}
              className={`stock-pagination__item ${n === pagination.page ? "stock-pagination__item--active" : ""}`}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}

          {showTail && (
            <>
              <span className="stock-pagination__dots">........</span>
              <button className="stock-pagination__item" onClick={() => setPage(totalPages - 1)}>
                {totalPages - 1}
              </button>
              <button className="stock-pagination__item" onClick={() => setPage(totalPages)}>
                {totalPages}
              </button>
            </>
          )}

          <button
            className="stock-pagination__next"
            onClick={() => setPage(Math.min(pagination.page + 1, totalPages))}
          >
            <span>Next</span>
            <span className="stock-pagination__next-circle">→</span>
          </button>
        </div>
      </div>

      <Inquiry vehicleId={selectedVehicleId} />
    </>
  );
};

export default StockVehicleList;