import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/app/hooks";
import { selectCollection } from "../../store/slices/userSlice";
import CollectionOverlayButton from "../Buttons/CollectionOverlayButton";
import Typography from "../Typography";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { queries } from "../../clients/ApolloClient";
import { useAppDispatch } from "../../store/app/hooks";
import { replaceCollection } from "../../store/slices/userSlice";
import LinkButton from "../Buttons/LinkButton";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface PropTypes {
  handleOpenDialog: () => void;
}

const CollectionHeader = ({ handleOpenDialog }: PropTypes) => {
  const dispatch = useAppDispatch();
  const { collectionId } = useParams();
  const collection = useAppSelector(selectCollection)(collectionId!)!;
  const [toggleFavourite] = useMutation(queries.mutation.UPDATE_COLLECTION, {
    variables: {
      input: {
        _id: collection._id,
        isFavorite: !collection.isFavorite,
      },
    },
    onCompleted: (data) => {
      dispatch(replaceCollection(data.updateCollection.data.collection));
    },
  });

  const handleOnClick = async () => {
    try {
      await toggleFavourite();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex gap-3 items-center">
      <LinkButton to={"/collections"}>
        <AiOutlineArrowLeft className="text-xl" />
      </LinkButton>

      <Typography classNames="font-bold" variant="h3">
        {collection.name}
      </Typography>

      <div className="flex gap-3 ml-auto">
        <button className="text-3xl text-yellow" onClick={handleOnClick}>
          {collection.isFavorite ? <AiFillStar /> : <AiOutlineStar />}
        </button>

        <CollectionOverlayButton handleOpenDialog={handleOpenDialog} _id={collection._id} />
      </div>
    </header>
  );
};

export default CollectionHeader;
