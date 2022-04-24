import { useState, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import Typography from "../Typography";
import Avatar from "./Avatar";
import EditButton from "../Buttons/EditButton";
import UpdatePasswordForm from "../Forms/UpdatePasswordForm";
import UpdateNameForm from "../Forms/UpdateNameForm";
import UpdateEmailForm from "../Forms/UpdateEmailForm";

type FormName = "nameForm" | "emailForm" | "passwordForm";

const initialState = {
  nameForm: false,
  emailForm: false,
  passwordForm: false,
};

const PersonalInfo = () => {
  const [visibility, setVisibility] = useState(initialState);

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

  const { user } = useAuth();
  return (
    <div className="grid gap-4 bg-surface-800 rounded p-4">
      <div>
        <Avatar url={user.avatar} />
      </div>

      <div>
        <Typography variant="small" classNames="text-text-secondary">
          Display name
        </Typography>
        <div className="flex justify-between items-center">
          <Typography>{`${user.name} ${user.surname}`}</Typography>
          <EditButton text="Edit" onClick={handleToggleNameForm} isOpen={visibility.nameForm} />
        </div>

        {visibility.nameForm && <UpdateNameForm />}
      </div>

      <div>
        <Typography variant="small" classNames="text-text-secondary">
          Email
        </Typography>
        <div className="flex justify-between items-center">
          <Typography>{user.email}</Typography>
          <EditButton text="Edit" onClick={handleToggleEmailForm} isOpen={visibility.emailForm} />
        </div>
      </div>
      {visibility.emailForm && <UpdateEmailForm />}

      <div>
        <Typography variant="small" classNames="text-text-secondary">
          Password
        </Typography>
        <div className="flex justify-between items-center">
          <Typography>*******</Typography>
          <EditButton
            text="Change"
            onClick={handleTogglePasswordForm}
            isOpen={visibility.passwordForm}
          />
        </div>

        {visibility.passwordForm && <UpdatePasswordForm />}
      </div>
    </div>
  );
};

export default PersonalInfo;
