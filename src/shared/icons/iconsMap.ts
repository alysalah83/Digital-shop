import {
  BsCart3,
  BsChatText,
  BsFacebook,
  BsLinkedin,
  BsPerson,
  BsTwitterX,
} from "react-icons/bs";
import { CiHeart, CiSearch } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { GoHeartFill, GoRows, GoScreenFull, GoShield } from "react-icons/go";
import { GrPowerCycle } from "react-icons/gr";
import { HiOutlineUsers } from "react-icons/hi2";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdCheckmark,
  IoMdClose,
} from "react-icons/io";
import {
  IoBagHandleOutline,
  IoCallOutline,
  IoEyeOutline,
  IoLocationOutline,
  IoMailOutline,
  IoPricetagsOutline,
} from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { LuLayoutGrid } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";
import {
  RiMenuUnfold3Line,
  RiMenuUnfold4Line,
  RiShoppingBag3Line,
} from "react-icons/ri";
import { RxRocket } from "react-icons/rx";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";

export const ICONS_MAP = {
  search: CiSearch,
  close: IoMdClose,
  rocket: RxRocket,
  loop: GrPowerCycle,
  shield: GoShield,
  chat: BsChatText,
  category: IoPricetagsOutline,
  arrowLeft: SlArrowLeft,
  arrowRight: SlArrowRight,
  arrowTop: IoIosArrowUp,
  arrowBot: IoIosArrowDown,
  bag: IoBagHandleOutline,
  shoppingBag: RiShoppingBag3Line,
  star: TiStarFullOutline,
  emptyStar: TiStarOutline,
  halfStar: TiStarHalfOutline,
  users: HiOutlineUsers,
  locationPin: IoLocationOutline,
  call: IoCallOutline,
  mail: IoMailOutline,
  facebook: BsFacebook,
  twitter: BsTwitterX,
  linkedin: BsLinkedin,
  checkMark: IoMdCheckmark,
  layoutGrid: LuLayoutGrid,
  row: GoRows,
  eye: IoEyeOutline,
  heart: CiHeart,
  filledHeart: GoHeartFill,
  cart: BsCart3,
  plus: FaPlus,
  minus: FaMinus,
  person: BsPerson,
  error: MdErrorOutline,
  fullScreen: GoScreenFull,
  signOut: LiaSignOutAltSolid,
  menu: RiMenuUnfold4Line,
  menu2: RiMenuUnfold3Line,
  trash: FaRegTrashAlt,
} as const;
