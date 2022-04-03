import { Carousel } from "primereact/carousel";
import ItemTemplate from "./ItemTemplate";
import binder from "../../assets/binderX128.png";
import idea from "../../assets/ideaX128.png";
import note from "../../assets/noteX128.png";
import timetable from "../../assets/timetableX128.png";
import sm_binder from "../../assets/binderX64.png";
import sm_idea from "../../assets/ideaX64.png";
import sm_note from "../../assets/noteX64.png";
import sm_timetable from "../../assets/timetableX64.png";

const AuthSlider = () => {
  const items = [
    {
      id: 0,
      text: "Organize your tasks.",
      icon: binder,
      iconSm: sm_binder,
      alt: "binder",
    },
    {
      id: 1,
      text: "Save your time.",
      icon: idea,
      iconSm: sm_idea,
      alt: "idea",
    },
    {
      id: 2,
      text: "Write your notes.",
      icon: note,
      iconSm: sm_note,
      alt: "note",
    },
    {
      id: 3,
      text: "Don't forget what you need to do.",
      icon: timetable,
      iconSm: sm_timetable,
      alt: "timetable",
    },
  ];

  return (
    <div className="hidden items-center justify-center relative md:flex">
      <Carousel
        value={items}
        autoplayInterval={3000}
        itemTemplate={ItemTemplate}
        className="w-full text-center"
      />
    </div>
  );
};

export default AuthSlider;
