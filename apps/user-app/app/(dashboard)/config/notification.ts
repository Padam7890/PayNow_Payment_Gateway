import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const notificationReduc = ()=>{
    const notificationCount = useSelector((state: RootState) => state.socketNotifications.count);
    return notificationCount;

}