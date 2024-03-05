export const LoadingIcon = ({ width }: { width: number }) => {
  return (
    <img
      src='/images/Loading.svg'
      alt='Loading icon'
      className={`w-[${width}px] aspect-square animate-spin m-auto`}
    />
  );
};
