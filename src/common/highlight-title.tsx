function HighlightTitle({ title, subTitle }: any) {
  return (
    <div className="lg:mb-2 mb-1 w-full">
      <div className="flex gap-2 items-center">
        <h2 className="lg:text-2xl text-lg font-bold tracking-tight">
          {title}
        </h2>
      </div>
      <p className="text-light-black lg:text-base text-xs">{subTitle}</p>
    </div>
  );
}

export default HighlightTitle;
