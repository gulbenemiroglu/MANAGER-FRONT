import {Dispatch, SetStateAction} from "react";

export enum ModalType {
    CREATE_TASK = "CREATE_TASK",
    VIEW_TASK = "VIEW_TASK",
    DELETE_TASK = "DELETE_TASK"
}

export type TModalState = ModalType | null;

export interface IModalContext {
    modal: TModalState;
    params: any;
    setParams: Dispatch<SetStateAction<any>>;
    openModal: (type: ModalType, params?: any) => void;
    closeModal: () => void;
}