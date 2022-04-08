import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/app/hooks";
import { useQuery } from "@apollo/client";
import { queries } from "../clients/ApolloClient";
import { setDefaultIcons } from "../store/slices/appSlice";

export const useInit = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useQuery(queries.query.DEFAULT_ICONS, {
    variables: {
      input: {
        path: "default",
      },
    },
  });

  const { defaultIcons } = useAppSelector((state) => state.app);

  useEffect(() => {
    console.log("tak");
    if (data && !loading && !defaultIcons.length) {
      dispatch(setDefaultIcons(data.getImages.data.images));
    }
  }, [data, dispatch]);
};
