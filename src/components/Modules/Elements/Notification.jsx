export default function Notification({ message }) {
  return (
    <div className="toast toast-start z-30">
      <div className="alert bg-black/75 border border-slate-50/50 text-white">
        <span>{message}</span>
      </div>
    </div>
  );
}
