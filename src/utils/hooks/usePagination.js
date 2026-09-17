import { useState, useCallback } from "react";
import { DEFAULT_PAGINATION } from "@/constants";

export function usePagination(initial = DEFAULT_PAGINATION) {
  const [pagination, setPagination] = useState(initial);

  const setPage = useCallback((page) => setPagination((p) => ({ ...p, page })), []);
  const setLimit = useCallback((limit) => setPagination((p) => ({ ...p, limit, page: 1 })), []);
  const reset = useCallback(() => setPagination(DEFAULT_PAGINATION), []);

  return { pagination, setPagination, setPage, setLimit, reset };
}
