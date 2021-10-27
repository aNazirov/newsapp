import {AppState} from "./index";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const useAppDispatch = (): any => useDispatch();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
