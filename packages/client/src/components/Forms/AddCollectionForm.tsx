import CollectionFormTemplate from "./Templates/CollectionFormTemplate";
import { useAppDispatch } from "../../store/app/hooks";
import { queries } from "../../clients/ApolloClient";
import { addCollection } from "../../store/slices/collectionsSlice";

const AddCollectionForm = () => {
  const dispatch = useAppDispatch();

  const handleOnCompleted = (data: any, toastCallback: (message: string) => void) => {
    dispatch(addCollection(data.createCollection.data.collection));
    toastCallback(data.createCollection.message);
  };

  return (
    <CollectionFormTemplate
      buttonText="Add"
      query={queries.mutation.CREATE_COLLECTION}
      onCompletedCallback={handleOnCompleted}
    />
  );
};

export default AddCollectionForm;
