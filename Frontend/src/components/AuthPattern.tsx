const AuthPattern = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-10 h-screen">
      <div className="text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <h2 className="text-base-content/60">{subtitle}</h2>
      </div>
    </div>
  );
};

export default AuthPattern;
