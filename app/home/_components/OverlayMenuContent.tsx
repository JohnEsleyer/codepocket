import { ReactNode } from "react";
import IconButton from "../../_components/IconButton";
import { X } from "lucide-react";

interface Props {
    onClose: () => void;
    title: string;
    children: ReactNode;
    disableCloseButton?: boolean;
    width: string;
}

const OverlayMenuPage: React.FC<Props> = ({onClose, title, children, disableCloseButton, width}) => {
    return ( <div className={`border rounded bg-slate-100 text-black ${width} p-2`}>
    <div className="flex w-full">
        <p className="flex-1 text-3xl font-bold">{title}</p>
        {!disableCloseButton && <IconButton icon={ <X />} text="Close" onClick={onClose} />}
    </div>
    {children}
</div>);
}



export default OverlayMenuPage;