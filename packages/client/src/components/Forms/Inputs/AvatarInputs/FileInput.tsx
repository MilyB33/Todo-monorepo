import { FileUpload } from "primereact/fileupload";
import { useMutation } from "@apollo/client";
import { queries } from "../../../../clients/ApolloClient";
import { useToastMessage } from "../../../../hooks/useToastMessage";
import { useAuth } from "../../../../hooks/useAuth";
import { updateAvatar } from "../../../../store/slices/authSlice";
import { useAppDispatch } from "../../../../store/app/hooks";

const FileInput = () => {
  const dispatch = useAppDispatch();
  const {
    user: { _id },
  } = useAuth();
  const { handleSuccess, handleError } = useToastMessage();
  const [uploadAvatar, { loading }] = useMutation(queries.mutation.UPDATE_AVATAR, {
    onCompleted: (data) => {
      dispatch(updateAvatar(data.updateAvatar.data.avatar));
      handleSuccess(data.updateAvatar.message);
    },
    onError: (error) => {
      console.log(error);
      handleError(error.message);
    },
  });
  const sharedClasses = "text-text border-none hover:!text-text text-xs sm:text-base";

  const chooseOptions = {
    label: "Choose",
    icon: "pi pi-fw pi-plus",
    className: `${sharedClasses}
 `,
  };

  const uploadOptions = {
    label: "Uplaod",
    icon: "pi pi-upload",
    className: `${sharedClasses} bg-green-700 hover:!bg-green-800`,
  };

  const cancelOptions = {
    label: "Cancel",
    icon: "pi pi-times",
    className: `${sharedClasses} bg-defaults-error hover:!bg-pink-700`,
  };

  const customBase64Uploader = async (event: any) => {
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      uploadAvatar({
        variables: {
          input: {
            _id,
            avatar: base64data,
          },
        },
      });
    };
  };
  return (
    <label htmlFor="">
      <FileUpload
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        customUpload
        uploadHandler={customBase64Uploader}
        accept="image/*"
        className="p-0"
      />
    </label>
  );
};

export default FileInput;
