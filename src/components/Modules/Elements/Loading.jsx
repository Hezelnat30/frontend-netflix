import { PiFlyingSaucerBold } from "react-icons/pi";
export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2">
      <div>
        <span className="loading loading-ball w-14"></span>
        <span className="loading loading-ball w-16"></span>
        <span className="loading loading-ball w-20"></span>
        <span className="loading loading-ball w-24"></span>
      </div>
      <div className="flex items-center gap-4 text-white">
        <p className="font-bold  text-xl">Please Wait</p>
        <PiFlyingSaucerBold size={26} className="animate-pulse" />
      </div>
    </div>
  );
}
