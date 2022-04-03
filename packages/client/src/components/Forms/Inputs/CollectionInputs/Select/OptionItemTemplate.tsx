import Typography from "../../../../Typography";

interface IPropTypes {
  label: string;
  value: string;
}

const OptionItemTemplate = (option: IPropTypes) => {
  return (
    <div className="flex gap-3 items-center">
      <img src={option.value} alt={option.label} />
      <Typography>{option.label}</Typography>
    </div>
  );
};

export default OptionItemTemplate;
