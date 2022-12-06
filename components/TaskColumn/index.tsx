import {FC, useContext, useMemo} from "react";
import {useDrop} from 'react-dnd'
import {Col} from "react-bootstrap";
import {ITaskColumn} from "./types";
import {TaskStatus} from "utils/enums";
import {DashboardContext} from "contexts/Dashboard";
import TaskCard from "components/TaskCard";

const TaskColumn: FC<ITaskColumn> = ({title}) => {
    const {tasks} = useContext(DashboardContext);
    const columnTasks = useMemo(() => {
        switch (title) {
            case TaskStatus.CREATED:
                return tasks.filter((t) => t.status === TaskStatus.CREATED);
            case TaskStatus.IN_PROGRESS:
                return tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS);
            case TaskStatus.DONE:
                return tasks.filter((t) => t.status === TaskStatus.DONE);
        }
    },[title, tasks]);

    const acceptDropzone = useMemo(() => {
        switch (title) {
            case TaskStatus.CREATED:
                return "";
            case TaskStatus.IN_PROGRESS:
                return TaskStatus.CREATED;
            case TaskStatus.DONE:
                return TaskStatus.IN_PROGRESS;
        }
    },[title]);

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: acceptDropzone,
        drop: () => ({name: title}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    const isActive = canDrop && isOver
    let backgroundColor = 'whitesmoke'
    if (isActive) {
        backgroundColor = '#d1cebd'
    } else if (canDrop) {
        backgroundColor = '#f6eedf'
    }
    return (
        <Col id="task-column" ref={drop} style={{backgroundColor}}>
            <h5 className="title">{title} ({columnTasks.length})</h5>
            {columnTasks?.map((task) => (
                <TaskCard key={task.reaTaskId} task={task}/>
            ))}
        </Col>
    )
}

export default TaskColumn;