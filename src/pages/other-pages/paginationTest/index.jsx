import Pagination from "@/components/common/Pagination3";
import { useGetVehiclesQuery } from "@/store/api/vehicleApi";
import { usePagination } from "@/utils/hooks/usePagination";

export default function SamplePagination() {
  const { pagination, setPage, setLimit } = usePagination();

  const { data, isLoading } = useGetVehiclesQuery({
    page: pagination.page,
    limit: pagination.limit,
  });

  const items      = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <div className="tf-section">
      <div className="container">
        <h4 className="mb-30">Vehicle List</h4>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                {["Kande No", "Make", "Model", "Chassis No", "Year", "Colour", "Status"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", fontWeight: 600, textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((v) => (
                <tr key={v._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "10px 12px" }}>{v.kandeNo    || "-"}</td>
                  <td style={{ padding: "10px 12px" }}>{v.make       || "-"}</td>
                  <td style={{ padding: "10px 12px" }}>{v.model      || "-"}</td>
                  <td style={{ padding: "10px 12px" }}>{v.chassisNo  || "-"}</td>
                  <td style={{ padding: "10px 12px" }}>{v.manufactureYear ? new Date(v.manufactureYear).getFullYear() : "-"}</td>
                  <td style={{ padding: "10px 12px" }}>{v.color     || "-"}</td>
                  <td style={{ padding: "10px 12px" }}>{v.vehicleStatus || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Pagination
          page={pagination.page}
          limit={pagination.limit}
          total={totalCount}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      </div>
    </div>
  );
}