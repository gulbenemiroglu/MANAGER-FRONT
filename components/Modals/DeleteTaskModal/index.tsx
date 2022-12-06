import { deleteTask } from "api/task";
import { useModal } from "contexts/Modal";
import BaseModal from "../BaseModal";

const DeleteTaskModal = () => {
  const { params, closeModal } = useModal();
  const { task, setTasks } = params;
  const onApproval = async () => {
    const response = await deleteTask(task);
    setTasks(response);
    closeModal();
  };
  return (
    <BaseModal
      title={`Delete Task`}
      approvalButtonVariant="danger"
      approvalText="Delete"
      onApproval={onApproval}
    >
      Are you sure about delete {task.title}?
    </BaseModal>
  );
};

export default DeleteTaskModal;
