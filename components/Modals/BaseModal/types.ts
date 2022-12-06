import {ReactNode} from "react";
import {ButtonVariant} from "react-bootstrap/types";

export interface IBaseModal {
    title: string;
    approvalText?: string;
    approvalButtonVariant?: ButtonVariant;
    onApproval?: () => void;
    children?: ReactNode;
}