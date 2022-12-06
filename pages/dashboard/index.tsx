import {FC, useState} from "react";
import {DashboardContext} from "contexts/Dashboard";
import {useModal} from "contexts/Modal";
import {Button, Container, Row} from "react-bootstrap";
import TaskColumn from "components/TaskColumn";
import {TaskStatus} from "utils/enums";
import {ModalType} from "contexts/Modal/types";
import {ITask} from "models/task";
import {getAllTasks} from "api/task";

interface IDashboard {
    tasks: ITask[];
}

const Dashboard: FC<IDashboard> = ({tasks}) => {
    const {openModal} = useModal();
    const [dashboardTasks, setDashboardTasks] = useState([...tasks]);

    return (
        <DashboardContext.Provider value={{
            tasks: dashboardTasks,
            setTasks: setDashboardTasks
        }}>
            <Container id="dashboard">
                <Row>
                    <Button variant="primary" onClick={() => openModal(ModalType.CREATE_TASK, {setDashboardTasks})}>Add Task</Button>
                </Row>
                <Row>
                    {[TaskStatus.CREATED, TaskStatus.IN_PROGRESS, TaskStatus.DONE].map((status) => (
                        <TaskColumn key={status} title={status}/>
                    ))}
                </Row>
            </Container>
        </DashboardContext.Provider>
    )
}

export async function getServerSideProps() {
    const tasks = await getAllTasks();
    
    return {
        props: {
            tasks
        }
    }
};

export default Dashboard;