import {Button, Modal} from "react-bootstrap";
import {useModal} from "contexts/Modal";
import {IBaseModal} from "components/Modals/BaseModal/types";
import {FC, MouseEvent} from "react";

export const BaseModal: FC<IBaseModal> = ({title, approvalText, onApproval, approvalButtonVariant, children}) => {
    const {modal, closeModal} = useModal();

    return (
        <Modal show={Boolean(modal)} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                {Boolean(approvalText) && (
                    <Button variant={approvalButtonVariant} onClick={onApproval}>
                        {approvalText}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default BaseModal;