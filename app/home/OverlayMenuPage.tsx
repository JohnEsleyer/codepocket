import { ReactNode } from "react";
import IconButton from "../components/IconButton";

interface Props {
    onClose: () => void;
    title: string;
    children: ReactNode;
    dialogMode?: boolean;
    disableCloseButton?: boolean;
}

const OverlayMenuPage: React.FC<Props> = ({onClose, title, children, dialogMode, disableCloseButton}) => {
    return ( <div className={`border rounded bg-slate-100 text-black ${dialogMode ? 'w-80' : "w-4/5"} p-2`}>
    <div className="flex w-full">
        <p className="flex-1 text-3xl font-bold">{title}</p>
        {!disableCloseButton && <IconButton icon="close" text="Close" onClick={onClose} />}
    </div>
    {children}
</div>);
}



export default OverlayMenuPage;