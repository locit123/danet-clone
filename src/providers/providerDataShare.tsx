import { createContext, ReactNode, useState } from "react";

export interface IDataShareContext {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DataShareContext = createContext<IDataShareContext | undefined>(
  undefined
);

const ProviderDataShare = ({ children }: { children: ReactNode }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const value = { isOpenMenu, setIsOpenMenu };
  return (
    <DataShareContext.Provider value={value}>
      {children}
    </DataShareContext.Provider>
  );
};

export default ProviderDataShare;
