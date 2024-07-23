import { ReactNode } from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";


interface LayoutProps{
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>  
        <div className="flex flex-col h-screen">
            <Header/>
            {children}
            <Footer/>
        </div>
        </>
    )
}

export default Layout;