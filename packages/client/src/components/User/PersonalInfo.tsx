import { useState, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import Typography from "../Typography";
import Avatar from "./Avatar";
import EditButton from "../Buttons/EditButton";
import Button from "../Buttons/Button";
import UpdatePasswordForm from "../Forms/UpdatePasswordForm";
import UpdateNameForm from "../Forms/UpdateNameForm";
import UpdateEmailForm from "../Forms/UpdateEmailForm";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useMutation } from "@apollo/client";
import { useToastMessage } from "../../hooks/useToastMessage";
import { queries } from "../../clients/ApolloClient";

type FormName = "nameForm" | "emailForm" | "passwordForm";

const initialState = {
  nameForm: false,
  emailForm: false,
  passwordForm: false,
};

const PersonalInfo = () => {
  const [visibility, setVisibility] = useState(initialState);
  const { user, handleLogout } = useAuth();
  const { handleSuccess, handleError } = useToastMessage();
  const [deleteUser, { loading }] = useMutation(queries.mutation.DELETE_USER, {
    onCompleted: (data) => {
      handleSuccess(data.deleteUser.message);
      handleLogout();
    },
    onError: (error) => {
      console.error(error.message);
      handleError(error.message);
    },
  });

  const handleChangeVisibility = useCallback((formName: FormName) => {
    setVisibility((prevState) => {
      return {
        ...initialState,
        [formName]: !prevState[formName],
      };
    });
  }, []);

  const handleToggleNameForm = useCallback(() => handleChangeVisibility("nameForm"), []);
  const handleToggleEmailForm = useCallback(() => handleChangeVisibility("emailForm"), []);
  const handleTogglePasswordForm = useCallback(() => handleChangeVisibility("passwordForm"), []);

  const confirm = useCallback(() => {
    confirmDialog({
      header: "Are you sure?",
      message: "Are you sure you want to delete your account?",
      acceptLabel: "Yes",
      rejectLabel: "No",
      accept: () => {
        deleteUser({
          variables: {
            input: {
              _id: user._id,
            },
          },
        });
      },
      reject: () => {
        console.log("No");
      },
    });
  }, []);

  return (
    <>
      <section className="flex flex-col gap-4 bg-surface-800 rounded w-[300px] p-4 relative">
        <div>
          <Avatar url={user.avatar} />
        </div>

        <div>
          <Typography variant="small" classNames="text-text-secondary">
            Display name
          </Typography>
          <div className="flex justify-between items-center gap-10">
            <Typography>{`${user.name} ${user.surname}`}</Typography>
            <EditButton text="Edit" onClick={handleToggleNameForm} isOpen={visibility.nameForm} />
          </div>

          {visibility.nameForm && <UpdateNameForm />}
        </div>

        <div>
          <Typography variant="small" classNames="text-text-secondary">
            Email
          </Typography>
          <div className="flex justify-between items-center gap-10">
            <Typography>{user.email}</Typography>
            <EditButton text="Edit" onClick={handleToggleEmailForm} isOpen={visibility.emailForm} />
          </div>
        </div>
        {visibility.emailForm && <UpdateEmailForm />}

        <div>
          <Typography variant="small" classNames="text-text-secondary">
            Password
          </Typography>
          <div className="flex justify-between items-center gap-10">
            <Typography>*******</Typography>
            <EditButton
              text="Change"
              onClick={handleTogglePasswordForm}
              isOpen={visibility.passwordForm}
            />
          </div>

          <Button
            onClick={confirm}
            label="Delete Account"
            className="bg-defaults-error p-1 absolute right-2 top-2"
            loading={loading}
          />
          <ConfirmDialog />

          {visibility.passwordForm && <UpdatePasswordForm />}
        </div>
      </section>
    </>
  );
};

export default PersonalInfo;
