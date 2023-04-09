import Aside from "../components/Aside";

// Rendu avec un Aside responsive.
export default function AsideLayout({ children }) {
  return (
    <div className="flex flex-col min-[880px]:px-20 lg:px-0 lg:flex-row lg:justify-center gap-14 lg:gap-16">
      {children}
      <Aside />
    </div>
  );
};