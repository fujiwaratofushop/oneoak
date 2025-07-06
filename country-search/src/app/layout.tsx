'use client'

import "./globals.scss";
import SearchBar from "@/components/common/Searchbar/SearchBar";
import { usePathname } from "next/navigation";

export const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body className="bg-white text-black px-6 py-3 min-h-screen flex flex-col item-center justify-center"
      >
        <div className="app-container flex flex-col flex-1 items-center justify-center w-full">
          <header>
            <SearchBar isCompact={!isHomePage}/>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

export default RootLayout