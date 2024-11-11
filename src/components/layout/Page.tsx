import "./page.css";
import { ReactNode } from "react";

interface PageProps {
  children: ReactNode | ReactNode[];
  pageTitle: string;
}

const Page = ({ children, pageTitle }: PageProps) => {
  return (
    <div className="page">
      <p className="title">{pageTitle}</p>
      {children}
    </div>
  );
};

export default Page;
