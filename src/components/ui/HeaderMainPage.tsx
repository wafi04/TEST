import { ReactNode } from "react";

interface HeaderMainPageProps {
  title: string;
  children?: ReactNode;
}

export const HeaderMainPage = ({ title, children }: HeaderMainPageProps) => {
  return (
    <div className="flex justify-between space-x-4  w-full items-center py-2">
      <h1 className="font-bebas text-[4vw] w-full md:text[3vw]  lg:text-[2vw]">
        {title}
      </h1>
      {children}
    </div>
  );
};
