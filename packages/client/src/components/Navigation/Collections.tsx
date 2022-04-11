import Typography from "../Typography";
import Collection from "../Collections/Collection";
import CollectionNavForm from "../Forms/CollectionNavForm";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { queries } from "../../clients/ApolloClient";
import { ProgressSpinner } from "primereact/progressspinner";
import { ICollection } from "../../types";
import { setCollections } from "../../store/slices/userSlice";

const Collections = () => {
  const dispatch = useAppDispatch();
  const { collections } = useAppSelector((state) => state.user);
  const { loading, error } = useQuery(queries.query.GET_COLLECTIONS, {
    onCompleted: (data) => {
      dispatch(setCollections(data.getCollections.data.collections));
    },
  });

  return (
    <aside className="flex flex-col gap-5 h-full min-w-full bg-gray-800  overflow-y-auto overflow-x-hidden absolute sm:relative sm:min-w-[22rem]">
      <Typography classNames="p-3" variant="h4">
        Collections
      </Typography>

      <nav className="grid gap-5">
        <section>
          {loading ? (
            <ProgressSpinner />
          ) : error ? (
            []
          ) : (
            collections.map((collection: ICollection) => (
              <Collection key={collection._id} collection={collection} />
            ))
          )}
        </section>
      </nav>

      <div className="grid gap-5 mt-auto">
        <Accordion>
          <AccordionTab header="Add Collection" contentClassName="!bg-pink">
            <CollectionNavForm />
          </AccordionTab>
        </Accordion>
      </div>
    </aside>
  );
};

export default Collections;
