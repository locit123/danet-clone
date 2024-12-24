import { IMovie } from "@models/Movie.models";
import { createContext, useState } from "react";

interface IIsBoundingRect {
  top: number;
  width: number;
  left: number;
}

export interface IContextHover {
  isBoundingRect: IIsBoundingRect | undefined;
  setIsBoundingRect: React.Dispatch<
    React.SetStateAction<IIsBoundingRect | undefined>
  >;
  itemIndex: number;
  setItemIndex: React.Dispatch<React.SetStateAction<number>>;
  currentItem: IMovie | undefined;
  setCurrentItem: React.Dispatch<React.SetStateAction<IMovie | undefined>>;
  isToggle: boolean;
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextHover = createContext<IContextHover | undefined>(undefined);

const ProviderContextHover = ({ children }: { children: React.ReactNode }) => {
  const [isBoundingRect, setIsBoundingRect] = useState<
    IIsBoundingRect | undefined
  >(undefined);
  const [itemIndex, setItemIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState<IMovie | undefined>(undefined);
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const value = {
    isBoundingRect,
    setIsBoundingRect,
    itemIndex,
    setItemIndex,
    currentItem,
    setCurrentItem,
    isToggle,
    setIsToggle,
  };
  return (
    <ContextHover.Provider value={value}>{children}</ContextHover.Provider>
  );
};

export default ProviderContextHover;
