import Typography from "../Typography";
import Collection from "../Collections/Collection";
import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { queries } from "../../clients/ApolloClient";
import { ProgressSpinner } from "primereact/progressspinner";
import { ICollection } from "../../types";
import { setCollections, selectFavoriteCollections } from "../../store/slices/userSlice";
import LinkButton from "../Buttons/LinkButton";

const Collections = () => {
  const dispatch = useAppDispatch();
  const favoriteCollections = useAppSelector(selectFavoriteCollections)(5);
  const { loading, error } = useQuery(queries.query.GET_COLLECTIONS, {
    onCompleted: (data) => {
      dispatch(setCollections(data.getCollections.data.collections));
    },
  });

  return (
    <aside className="bg-surface-800 hidden h-full w-full md:block">
      <Typography classNames="p-3 text-center sm:text-left" variant="h4">
        Collections
      </Typography>

      <nav className="grid gap-5">
        <section className="grid">
          {loading ? (
            <ProgressSpinner />
          ) : error ? (
            []
          ) : (
            favoriteCollections.map((collection: ICollection) => (
              <Collection key={collection._id} collection={collection} />
            ))
          )}

          <LinkButton
            to="/collections"
            label="More"
            defaultStyles={false}
            className="mt-5 mx-auto bg-blue px-4 py-2 rounded transition-colors hover:bg-blue-600 shadow-lg"
          />
        </section>
      </nav>
    </aside>
  );
};

export default Collections;
