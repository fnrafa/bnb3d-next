import React, {ReactNode} from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow pt-[70px]  subpixel-antialiased">
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;
