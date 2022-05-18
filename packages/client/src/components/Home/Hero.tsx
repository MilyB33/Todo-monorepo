import Typography from "../Typography";
import LinkButton from "../Buttons/LinkButton";

const Hero = () => {
  return (
    <header className="m-auto text-center grid gap-8 px-5">
      <Typography variant="h2">Organize your tasks</Typography>

      <Typography classNames="max-w-lg text-gray-600">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum dolore eius doloremque aperiam
        laboriosam cupiditate voluptas temporibus at expedita minus. Quae voluptatem ullam
        doloremque ad, repellendus illum.
      </Typography>

      <div className="flex gap-5 justify-center">
        <LinkButton to="/register" label="Get started" className="border-pink-300 border-2" />
        <LinkButton to="/about" label="Learn more" className="bg-surface-800" />
      </div>
    </header>
  );
};

export default Hero;
