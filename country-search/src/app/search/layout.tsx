export const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 w-full flex justify-center overflow-y-auto px-4 py-6 relative">
      <div className="w-full max-w-6xl absolute">{children}</div>
    </div>
  );
};

export default SearchLayout;