interface IHandleClick {
  containerMovieRef: React.RefObject<HTMLDivElement>;
  setMaxScroll: React.Dispatch<React.SetStateAction<number>>;
  setNextScroll: React.Dispatch<React.SetStateAction<number>>;
  nextScroll: number;
  step: number;
}
const handleClickNext = ({
  containerMovieRef,
  setMaxScroll,
  setNextScroll,
  nextScroll,
  step,
}: IHandleClick) => {
  const container = containerMovieRef.current;
  if (container) {
    const widthImage = container.children[0].children[0].clientWidth;
    const { scrollWidth, clientWidth } = container;

    const maxScroll = scrollWidth - clientWidth;
    const newOffset = Math.min(nextScroll + widthImage * step + 20, maxScroll);
    container.style.transform = `translateX(-${newOffset}px)`;
    setMaxScroll(maxScroll);
    setNextScroll(newOffset);
  }
};
type THandleClickPrev = Pick<
  IHandleClick,
  "setNextScroll" | "containerMovieRef" | "nextScroll" | "step"
>;
const handleClickPrev = ({
  containerMovieRef,
  setNextScroll,
  nextScroll,
  step,
}: THandleClickPrev) => {
  const container = containerMovieRef.current;
  if (container) {
    const widthImage = container.children[0].children[0].clientWidth;
    const newOffset = Math.max(nextScroll - widthImage * step - 20, 0);
    container.style.transform = `translateX(-${newOffset}px)`;
    setNextScroll(newOffset);
  }
};

interface IMouseDrag {
  isDragging: React.MutableRefObject<boolean>;
  isDrag: number;
  scrollTo: number;
  e: React.MouseEvent<HTMLDivElement, MouseEvent>;
  startX: React.MutableRefObject<number>;
  setIsDrag: React.Dispatch<React.SetStateAction<number>>;
}

type THandleMouseMove = Pick<IHandleClick, "containerMovieRef"> & IMouseDrag;

const handleMouseMove = ({
  containerMovieRef,
  e,
  isDrag,
  isDragging,
  scrollTo,
  startX,
  setIsDrag,
}: THandleMouseMove) => {
  if (!isDragging.current || !containerMovieRef.current) return;
  const diff = e.clientX - startX.current;
  if (diff > 50) {
    const newOffset = Math.max(0, isDrag - scrollTo);
    containerMovieRef.current.style.transform = `translateX(-${newOffset}px)`;
    containerMovieRef.current.style.cursor = "grabbing";
    setIsDrag(newOffset);
  } else if (diff < -50) {
    const maxScroll =
      containerMovieRef.current.scrollWidth -
      containerMovieRef.current.clientWidth;
    const newOffset = Math.min(isDrag + scrollTo, maxScroll);
    containerMovieRef.current.style.transform = `translateX(-${newOffset}px)`;
    containerMovieRef.current.style.cursor = "grabbing";
    setIsDrag(newOffset);
  }
};

type THandleMouseDown = Pick<IHandleClick, "containerMovieRef"> &
  Pick<IMouseDrag, "e" | "isDragging" | "startX">;

const handleMouseDown = ({
  containerMovieRef,
  e,
  isDragging,
  startX,
}: THandleMouseDown) => {
  const container = containerMovieRef.current;
  if (!container) return;
  isDragging.current = true;
  startX.current = e.pageX;
  container.style.cursor = "grabbing";
};

interface IHandleMouseUp {
  isDragging: React.MutableRefObject<boolean>;
  containerMovieRef: React.RefObject<HTMLDivElement>;
}

const handleMouseUp = ({ containerMovieRef, isDragging }: IHandleMouseUp) => {
  isDragging.current = false;
  if (containerMovieRef.current) {
    containerMovieRef.current.style.cursor = "grab";
  }
};

export {
  handleClickNext,
  handleClickPrev,
  handleMouseMove,
  handleMouseDown,
  handleMouseUp,
};
