import { FaBook, FaMagic } from "react-icons/fa";
import { FeedbackType } from "./types";
import { MdOutlineNewReleases, MdOutlineWeb } from "react-icons/md";
import { TagTypeBase } from "@/components/widgets/TagsManager/TagsManager";


export const FEEDBACK_TYPE: TagTypeBase[] = [
  {
    id: FeedbackType.CONTENT,
    title: "Contenido",
    icon: <FaBook />,
  },
  {
    id: FeedbackType.EXPERIENCE,
    title: "Experiencia de uso",
    icon: <FaMagic />,
  },
  {
    id: FeedbackType.TECH,
    title: "Aspectos técnicos",
    icon: <MdOutlineWeb />,
  },
  {
    id: FeedbackType.OTHERS,
    title: "Otros",

    icon: <MdOutlineNewReleases />,
  },
];
