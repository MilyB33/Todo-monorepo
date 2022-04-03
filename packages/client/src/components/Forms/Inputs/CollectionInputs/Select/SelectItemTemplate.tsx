import Typography from "../../../../Typography";

interface IPropTypes {
  label: string;
  value: string;
}

const SelectItem = (option: IPropTypes) => {
  if (option)
    return (
      <div className="flex gap-3 items-center">
        <img src={option.value} alt={option.label} />
        <Typography>{option.label}</Typography>
      </div>
    );
  return <span>{"Select icon"}</span>;
};

export default SelectItem;
