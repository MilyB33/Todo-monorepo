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
      id: 1,
      text: "Organize your tasks.",
      icon: binder,
      iconSm: sm_binder,
      alt: "binder",
    },
    {
      id: 2,
      text: "Save your time.",
      icon: idea,
      iconSm: sm_idea,
      alt: "idea",
    },
    {
      id: 3,
      text: "Write your notes.",
      icon: note,
      iconSm: sm_note,
      alt: "note",
    },
    {
      id: 4,
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
        circular={true}
        numScroll={1}
        itemTemplate={ItemTemplate}
        className="w-full text-center"
      />
    </div>
  );
};

export default AuthSlider;
