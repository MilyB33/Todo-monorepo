import Typography from "../Typography";

interface IPropTypes {
  text: string;
  icon: string;
  alt: string;
}

const ItemTemplate = ({ text, icon, alt }: IPropTypes) => {
  return (
    <div className="grid justify-center items-center gap-5">
      <img src={icon} alt={alt} className="mx-auto" />
      <Typography variant="h4" classNames="text-blue-200">
        {text}
      </Typography>
    </div>
  );
};

export default ItemTemplate;
