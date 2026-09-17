import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserFavouritesUpdate, UserGetAll } from "@/store/slices/userSlice";

export default function FavouriteIconWrap({ vehicle }) {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);

  const userId = "688494b78486e3c855c81548";
  const user = userStore?.data?.find((u) => u._id === userId);

  useEffect(() => {
    if (!userStore?.data?.length) dispatch(UserGetAll());
  }, [userStore?.data?.length, dispatch]);

  useEffect(() => {
    if (user?.favourites?.includes(vehicle._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user?.favourites, vehicle._id]);

  const handleClick = () => {
    setIsFavorite((prev) => !prev);
    dispatch(UserFavouritesUpdate(vehicle?._id));
  };

  return (
    <a className="icon" onClick={handleClick}>
      {isFavorite ? (
      <svg
          width={16}
          height={14}
          viewBox="0 0 16 14"
          fill="red"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.75 4.1875C14.75 2.32375 13.1758 0.8125 11.234 0.8125C9.78275 0.8125 8.53625 1.657 8 2.86225C7.46375 1.657 6.21725 0.8125 4.76525 0.8125C2.825 0.8125 1.25 2.32375 1.25 4.1875C1.25 9.6025 8 13.1875 8 13.1875C8 13.1875 14.75 9.6025 14.75 4.1875Z"
            stroke="red"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width={18}
          height={16}
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
            stroke="CurrentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  );
}
