import Typography from "../Typography";
import Collection from "../Collections/Collection";
import AddCollectionForm from "../Forms/AddCollectionForm";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { queries } from "../../clients/ApolloClient";
import { ProgressSpinner } from "primereact/progressspinner";
import { ICollection } from "../../types";
import { setCollections, selectFavoriteCollections } from "../../store/slices/userSlice";
import MoreButton from "../Buttons/MoreButton";
import { ScrollPanel } from "primereact/scrollpanel";

const Collections = () => {
  const dispatch = useAppDispatch();
  const favoriteCollections = useAppSelector(selectFavoriteCollections)(5);
  const { loading, error } = useQuery(queries.query.GET_COLLECTIONS, {
    onCompleted: (data) => {
      dispatch(setCollections(data.getCollections.data.collections));
    },
  });

  return (
    <aside className="  bg-gray-800 h-full min-w-full   sm:relative sm:min-w-[22rem]">
      <ScrollPanel style={{ width: "100%", height: "100%" }}>
        <Typography classNames="p-3" variant="h4">
          Collections
        </Typography>
        <section className="flex flex-col gap-5 min-w-full absolute">
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

              <MoreButton />
            </section>
          </nav>

          <div className="grid gap-5">
            <Accordion>
              <AccordionTab header="Add Collection" contentClassName="!bg-pink">
                <AddCollectionForm />
              </AccordionTab>
            </Accordion>
          </div>
        </section>
      </ScrollPanel>
    </aside>
  );
};

export default Collections;
