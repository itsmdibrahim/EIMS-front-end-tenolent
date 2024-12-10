import { AiOutlineLoading3Quarters } from "react-icons/ai";

function PreLoader() {
  return (
    <div className="w-full h-full bg-gray-100/80 grid place-content-center">
      <span className="p-3 block text-4xl text-slate-500">
        <AiOutlineLoading3Quarters className="animate-spin" />
      </span>
    </div>
  );
}

export default PreLoader;
