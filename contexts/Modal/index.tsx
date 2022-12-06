import {IModalContext, ModalType, TModalState} from "contexts/Modal/types";
import {createContext, FC, PropsWithChildren, useContext, useState} from "react";
import dynamic from "next/dynamic";

const CreateTaskModal = dynamic(() => import("components/Modals/CreateTaskModal"));
const ViewTaskModal = dynamic(() => import("components/Modals/ViewTaskModal"));
const DeleteTaskModal = dynamic(() => import("components/Modals/DeleteTaskModal"));

export const ModalContext = createContext<IModalContext>({} as IModalContext);
export const useModal = () => useContext(ModalContext);

export const ModalContextProvider: FC<PropsWithChildren<{}>> = ({children}) => {
    const [modalState, setModalState] = useState<TModalState>(null);
    const [params, setParams] = useState(null);

    const openModal = (modal: ModalType, params: any) => {
        setModalState(modal);
        setParams(params);
    }

    const closeModal = () => {
        setModalState(null);
        setParams(null);
    }

    return (
        <ModalContext.Provider value={{modal: modalState, params, setParams, openModal, closeModal}}>
            {children}
            {modalState === ModalType.CREATE_TASK && <CreateTaskModal/>}
            {modalState === ModalType.VIEW_TASK && <ViewTaskModal/>}
            {modalState === ModalType.DELETE_TASK && <DeleteTaskModal/>}
        </ModalContext.Provider>
    )
}