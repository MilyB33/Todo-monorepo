import Typography from "../Typography";

interface IPropTypes {
  id: number;
  text: string;
  icon: string;
  iconSm: string;
  alt: string;
}

const ItemTemplate = ({ id, text, icon, iconSm, alt }: IPropTypes) => {
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
