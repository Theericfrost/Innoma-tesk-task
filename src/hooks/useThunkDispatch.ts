import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/index";

const useThunkDispatch = () => useDispatch<AppDispatch>();

export default useThunkDispatch;
