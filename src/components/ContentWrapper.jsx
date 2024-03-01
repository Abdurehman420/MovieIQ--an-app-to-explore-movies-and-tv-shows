function ContentWrapper({ children, className }) {
  return (
    <div className={` w-full max-w-[1200px] mx-auto py-0 px-5 ${className}`}>
      {children}
    </div>
  );
}

export default ContentWrapper;