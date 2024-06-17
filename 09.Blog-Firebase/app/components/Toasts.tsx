import { IoMdClose } from "react-icons/io";


interface ToastProps {
  msg?: string;
  closeToast: ()=> void
}

const Toast: React.FC<ToastProps> = ({msg= "", closeToast}) => {
  return (
    <div className="duration-500 transition-all ease-in-out bg-blue-500 text-white justify-between flex items-center p-4 rounded-md">
        <h2>{msg}</h2>
        <button onClick={closeToast}>
          <IoMdClose className="text-[22px] ml-5 text-white"/>
        </button>
    </div>
  )
}

export default Toast