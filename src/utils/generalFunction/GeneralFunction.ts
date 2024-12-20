interface IHandleClick {
  containerMovieRef: React.RefObject<HTMLDivElement>;
  setMaxScroll: React.Dispatch<React.SetStateAction<number>>;
  setNextScroll: React.Dispatch<React.SetStateAction<number>>;
  nextScroll: number;
}
const handleClickNext = ({
  containerMovieRef,
  setMaxScroll,
  setNextScroll,
  nextScroll,
}: IHandleClick) => {
  const container = containerMovieRef.current;
  if (container) {
    const widthImage = container.children[0].children[0].clientWidth;
    const { scrollWidth, clientWidth } = container;

    const maxScroll = scrollWidth - clientWidth;
    const newOffset = Math.min(nextScroll + widthImage * 2 + 20, maxScroll);
    container.style.transform = `translateX(-${newOffset}px)`;
    setMaxScroll(maxScroll);
    setNextScroll(newOffset);
  }
};
type THandleClickPrev = Pick<
  IHandleClick,
  "setNextScroll" | "containerMovieRef" | "nextScroll"
>;
const handleClickPrev = ({
  containerMovieRef,
  setNextScroll,
  nextScroll,
}: THandleClickPrev) => {
  const container = containerMovieRef.current;
  if (container) {
    const widthImage = container.children[0].children[0].clientWidth;
    const newOffset = Math.max(nextScroll - widthImage * 2 - 20, 0);
    container.style.transform = `translateX(-${newOffset}px)`;
    setNextScroll(newOffset);
  }
};

export { handleClickNext, handleClickPrev };
