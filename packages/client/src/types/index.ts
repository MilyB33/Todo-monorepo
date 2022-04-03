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

export interface Filters {
  search: "";
  availibility: "available" | "unavailable" | "all";
  genres: string[];
  rating: string[];
}
