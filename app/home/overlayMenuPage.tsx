import { ReactNode } from "react";
import IconButton from "../components/IconButton";

interface Props {
    onClose: () => void;
    title: string;
    children: ReactNode;
    dialogMode?: boolean;
}

const OverlayMenuPage: React.FC<Props> = ({onClose, title, children, dialogMode}) => {
    return ( <div className={`border rounded bg-gray-200 text-black ${dialogMode ? 'w-80' : "w-4/5"} p-2`}>
    <div className="flex w-full">
        <p className="flex-1 text-3xl font-bold">{title}</p>
        <IconButton icon="close" text="Close" onClick={onClose} />
    </div>
    {children}
</div>);
}



export default OverlayMenuPage;