export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="z-100 w-h-10 dark: fixed bottom-2 left-2 flex h-10 items-center justify-center rounded-full  bg-gray-800/90 p-3 font-mono text-sm font-bold text-slate-100 outline outline-2 outline-slate-100 dark:bg-slate-100/90 dark:text-gray-800 dark:outline-slate-800">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}
