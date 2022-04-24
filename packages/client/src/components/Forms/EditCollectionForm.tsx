import CollectionFormTemplate from "./Templates/CollectionFormTemplate";
import { useAppDispatch } from "../../store/app/hooks";
import { queries } from "../../clients/ApolloClient";
import { replaceCollection } from "../../store/slices/userSlice";

const EditCollectionForm = () => {
  const dispatch = useAppDispatch();

  const handleOnCompleted = (data: any, toastCallback: (message: string) => void) => {
    dispatch(replaceCollection(data.updateCollection.data.collection));
    toastCallback(data.updateCollection.message);
  };

  return (
    <CollectionFormTemplate
      buttonText="Update"
      query={queries.mutation.UPDATE_COLLECTION}
      onCompletedCallback={handleOnCompleted}
    />
  );
};

export default EditCollectionForm;
