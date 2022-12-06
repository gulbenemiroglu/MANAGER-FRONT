import {createContext, FC, PropsWithChildren, useContext, useState} from "react";
import {Toast, ToastContainer} from "react-bootstrap";
import {IToastContext, IToastParams, TToastContextParams} from "contexts/Toast/types";

export const ToastContext = createContext<IToastContext>({} as IToastContext);
export const useToast = () => useContext(ToastContext);

export const ToastContextProvider: FC<PropsWithChildren<{}>> = ({children}) => {
    const [show, setShow] = useState(false);
    const [params, setParams] = useState<TToastContextParams>(null);

    const toast = ({text, type}: IToastParams) => {
        setParams({text, type});
        setShow(true);
    }

    const onClose = () => {
        setShow(false);
        setParams(null);
    }

    return (
        <ToastContext.Provider value={{toast: (args) => toast(args)}}>
            {children}
            <ToastContainer position="bottom-end">
                <Toast className="m-3" bg={params?.type} onClose={onClose} show={show} delay={3000} autohide>
                    <Toast.Header closeButton={false}>
                        <strong className="me-auto">Information</strong>
                        <small>Now</small>
                    </Toast.Header>
                    <Toast.Body className="text-white">{params?.text}</Toast.Body>
                </Toast>
            </ToastContainer>
        </ToastContext.Provider>
    )
}