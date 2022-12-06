import {FormControlProps, FormSelectProps} from "react-bootstrap";
import {ChangeEvent} from "react";

export interface IInput {
    type?: string;
    name: string;
    onChange?: (e: ChangeEvent<any>) => void;
    required?: boolean
    options?: any[];
    readOnly?: boolean;
}

export interface IBaseFormInputs {
    inputs: IInput[];
    onChange: (e: ChangeEvent<any>) => void;
}