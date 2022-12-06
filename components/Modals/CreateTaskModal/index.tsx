import {useEffect, useState} from "react";
import BaseModal from "components/Modals/BaseModal";
import {createTaskInputs} from "utils/constants";
import {TaskStatus} from "utils/enums";
import {Form} from "react-bootstrap";
import FormInputs from "components/Forms/BaseForm";
import {IBaseTask} from "models/task";
import {useModal} from "contexts/Modal";
import {getAllUsers} from "api/users";
import {useToast} from "contexts/Toast";
import { createTask } from "api/task";

const CreateTaskModal = () => {
    const {params, closeModal} = useModal();
    const {toast} = useToast();
    const [users, setUsers] = useState([]);
    const [newTask, setNewTask] = useState<IBaseTask>({
        title: '',
        description: '',
        status: TaskStatus.CREATED,
        owner: ''
    });

    const inputs = [...createTaskInputs, {name: "owner", type: "select", options: users}];

    const onApproval = async() => {
        const newTasks = await createTask(newTask);
        params.setDashboardTasks(newTasks);
        toast({text: `${newTask.title} created successfully`, type: "success"});
        closeModal();
    }

    const onChange = (e: any) => {
        setNewTask({...newTask, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers();
            setUsers(users);
        }
        fetchUsers().catch(e => toast({text: e.message, type: "danger"}));
    }, []);

    return (
        <BaseModal title="Create a new task" approvalText="Create" onApproval={onApproval}>
            <Form>
                <FormInputs inputs={inputs} onChange={onChange}/>
            </Form>
        </BaseModal>
    )
}

export default CreateTaskModal;