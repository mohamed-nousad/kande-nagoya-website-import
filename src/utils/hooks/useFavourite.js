import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetSaveFavouritesQuery, useToggleFavouriteMutation } from "@/store/api/webSaveFavouriteApi";

export function useFavourite(vehicleId) {
  const user = useSelector((state) => state?.auth?.user);
  const userId = user?._id;

  const { data } = useGetSaveFavouritesQuery(userId, { skip: !userId });
  const [toggleFavourite, { isLoading }] = useToggleFavouriteMutation();

  const favouriteIds = useMemo(() => {
    return new Set((data?.data ?? []).map((f) => f?.vehicle?._id ?? f?.vehicle));
  }, [data]);

  const isSaved = !!vehicleId && favouriteIds.has(vehicleId);

  const toggle = async () => {
    if (!userId) return { requiresLogin: true };
    try {
      await toggleFavourite({ userId, vehicleId }).unwrap();
      return { ok: true };
    } catch (err) {
      return { error: err?.data?.message || "Add to favourites has been failed" };
    }
  };

  return { isSaved, toggle, isLoading, isLoggedIn: !!userId };
}