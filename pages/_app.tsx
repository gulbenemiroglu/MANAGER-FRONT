import type {AppProps} from 'next/app';
import {ToastContextProvider} from "contexts/Toast";
import {SessionContextProvider} from "contexts/Session";
import 'styles/globals.scss';
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {ModalContextProvider} from "contexts/Modal";

export default function App({Component, pageProps}: AppProps) {
    return (
        <ToastContextProvider>
            <ModalContextProvider>
                <SessionContextProvider>
                    <DndProvider backend={HTML5Backend}>
                        <Component {...pageProps} />
                    </DndProvider>
                </SessionContextProvider>
            </ModalContextProvider>
        </ToastContextProvider>
    )
}
