import BaseModal from "components/Modals/BaseModal";
import { ChangeEvent, useEffect, useState } from "react";
import { useModal } from "contexts/Modal";
import { Form } from "react-bootstrap";
import FormInputs from "components/Forms/BaseForm";
import { viewTaskInputs } from "utils/constants";
import { getAllUsers } from "api/users";
import { useToast } from "contexts/Toast";
import { TaskStatus } from "utils/enums";
import CommentSection from "components/CommentSection";
import { updateTask } from "api/task";

const ViewTaskModal = () => {
  const { params, closeModal } = useModal();
  const { toast } = useToast();
  const { setTasks, task: selectedTask } = params;

  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState({ ...selectedTask });
  const [usersInput, setUsersInput] = useState({
    name: "owner",
    type: "select",
    options: [],
    disabled: true,
    value: selectedTask.owner,
  });
  const [inputs, setInputs] = useState(
    viewTaskInputs.map((input) => ({
      ...input,
      value: selectedTask[input.name],
    }))
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSave = async () => {
    const response = await updateTask(task)
    setTasks(response);
    toast({ text: `${task.title} edited successfully`, type: "success" });
    closeModal();
  };

  const changeMode = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setUsersInput({ ...usersInput, disabled: false });
      return setInputs(
        viewTaskInputs.map((i: any) => ({ ...i, readOnly: false }))
      );
    }
    setUsersInput({ ...usersInput, disabled: true });
    setInputs(viewTaskInputs.map((i: any) => ({ ...i, readOnly: true })));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setUsersInput({ ...usersInput, options: users });
    };
    fetchUsers().catch((e) => toast({ text: e.message, type: "danger" }));
  }, []);

  const title = isEditing ? "Edit Task" : "View Task";
  const approvalText = isEditing ? "Save" : "Edit";
  const onApproval = isEditing ? onSave : changeMode;
  const approvalButtonVariant = isEditing ? "warning" : "outline-warning";

  return (
    <BaseModal
      title={title}
      approvalText={
        task.status === TaskStatus.CREATED ? approvalText : undefined
      }
      approvalButtonVariant={approvalButtonVariant}
      onApproval={onApproval}
    >
      <Form>
        <FormInputs inputs={[...inputs, usersInput]} onChange={onChange} />
      </Form>
      <CommentSection comments={task.comments} />
    </BaseModal>
  );
};

export default ViewTaskModal;
