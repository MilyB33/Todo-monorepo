import { useRef } from "react";
import { BsFillPenFill } from "react-icons/bs";
import { OverlayPanel } from "primereact/overlaypanel";
import FileInput from "../Forms/Inputs/AvatarInputs/FileInput";

interface PropTypes {
  url: string;
}

const Avatar = ({ url }: PropTypes) => {
  const op = useRef<OverlayPanel>(null);

  return (
    <div>
      <div className="relative w-fit">
        <button
          className="bg-pink p-2 rounded-full absolute top-px right-px hover:bg-text-pink transition-colors"
          aria-haspopup
          aria-controls="overlay_panel"
          onClick={(e) => op.current?.toggle(e)}
        >
          <BsFillPenFill />
        </button>
        <img src={url} alt="avatar" />
      </div>

      <OverlayPanel className="!p-0" showCloseIcon={true} ref={op} id="overlay_panel">
        <FileInput />
      </OverlayPanel>
    </div>
  );
};

export default Avatar;
