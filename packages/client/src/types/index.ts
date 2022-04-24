export type DispatchProps<T> = React.Dispatch<React.SetStateAction<T>>;

// ====== FORMS ======

export interface DefaultProps<T = string> {
  placeholder?: string;
  label?: string;
  classNames?: string;
  setFieldValue: (field: string, value: T, validation: boolean) => void;
  field: {
    name: string;
    onBlur: Function;
    onChange: Function;
    value: T;
  };
  form: {
    errors: { [key: string]: string };
    touched: { [key: string]: boolean };
    setFieldTouched: Function;
    values: any;
  };
}

export interface TextInputPropTypes extends DefaultProps {
  icon?: string;
  labelColor?: string;
}

export interface CalendarPropTypes extends DefaultProps<Date> {
  isTime: boolean;
  isIcon?: boolean;
}

export interface Filters {
  search: "";
  availibility: "available" | "unavailable" | "all";
  genres: string[];
  rating: string[];
}

// Store Payload Types
export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  avatar: string;
}

export interface ILogin {
  user: IUser;
  token: string;
}

export interface IIcon {
  name: string;
  fileId: string;
  url: string;
}

export interface ICollection {
  _id: string;
  name: string;
  color: string;
  iconUrl: string;
  owner: string;
  tasks: ITask[];
  isFavorite: boolean;
}

export interface ITask {
  _id: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
  collectionId: string;
}
