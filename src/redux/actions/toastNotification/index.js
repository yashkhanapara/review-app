import { toast } from "react-toastify";
import { SHOW_TOAST_NOFITICATION, REMOVE_TOAST_NOFITICATION } from "../../types";

export const callShowTostMessage = (message, type) => {
    switch (type) {
        case "success":
            toast.success(message,{
        position: toast.POSITION.TOP_RIGHT
      });
            break;
        case "info":
            toast.info(message,{
        position: toast.POSITION.TOP_RIGHT
      });
            break;
        case "warn":
            toast.warn(message,{
        position: toast.POSITION.TOP_RIGHT
      });
            break;
        case "error":
            toast.error(message,{
        position: toast.POSITION.TOP_RIGHT
      });
            break;
        case "dark":
            toast.dark(message,{
        position: toast.POSITION.TOP_RIGHT
      });
            break;
        default:
            toast(message,{
        position: toast.POSITION.TOP_RIGHT
      });
            break;
    }
};
export const showToastMessage = (message, type) => (dispatch) => {
    dispatch({
        type: SHOW_TOAST_NOFITICATION,
        payload: true,
    });
    callShowTostMessage(message, type);
    setTimeout(() => {
        dispatch({
            type: REMOVE_TOAST_NOFITICATION,
            payload: false,
        });
    }, 2000);
};
