export default function SectionLayout({ children, styles }) {
  return (
    <section className="relative bg-black text-white w-full">
      <div
        className={`${styles} grid md:grid-cols-2 max-w-8xl mx-auto justify-center items-center pt-16 pb-20 md:px-28 gap-2 text-center place-content-center sm:text-left`}
      >
        {children}
      </div>
      <div className="bg-stone-800 w-full absolute top-0 left-0 h-2"></div>
    </section>
  );
}
