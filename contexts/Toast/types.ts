import {ReactNode} from "react";
import {Variant} from "react-bootstrap/types";

export interface IToastContext {
    toast: (args: IToastParams) => void;
}

export type TToastContextParams = IToastParams | null;

export interface IToastParams {
    text: string;
    type: Variant;
}