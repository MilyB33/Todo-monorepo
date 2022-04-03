import Typography from "../Typography";
import ActionButton from "./ActionButton";

const Hero = () => {
  return (
    <header className="m-auto text-center grid gap-8 px-5">
      <Typography variant="h1">Organize your tasks</Typography>

      <Typography classNames="max-w-lg text-gray-600">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum dolore eius doloremque aperiam
        laboriosam cupiditate voluptas temporibus at expedita minus. Quae voluptatem ullam
        doloremque ad, repellendus illum.
      </Typography>

      <div className="flex gap-5 justify-center">
        <ActionButton to="/login" color="bg-basic">
          Get started
        </ActionButton>
        <ActionButton color="bg-surface-800" to="/about">
          Learn more
        </ActionButton>
      </div>
    </header>
  );
};

export default Hero;
