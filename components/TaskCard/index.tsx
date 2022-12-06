import { useDrag } from "react-dnd";
import { CSSProperties, FC, useContext } from "react";
import { Card, Badge } from "react-bootstrap";
import { ITaskCard } from "components/TaskCard/types";
import { DashboardContext } from "contexts/Dashboard";
import { TaskStatus } from "utils/enums";
import { formatDate, shortenDisplayname } from "utils/helpers";
import { useToast } from "contexts/Toast";
import { useModal } from "contexts/Modal";
import { ModalType } from "contexts/Modal/types";
import { updateTask } from "api/task";
import { ITask } from "models/task";
import Toggle from "components/Toggle";

const style: CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 0.5rem",
  cursor: "move",
  float: "left",
};

interface DropResult {
  name: string;
}

const TaskCard: FC<ITaskCard> = ({ task }) => {
  const { tasks, setTasks } = useContext(DashboardContext);
  const { toast } = useToast();
  const { openModal } = useModal();
  const onDrop = async () => {
    let updatedTask = {} as ITask;
    switch (task.status) {
      case TaskStatus.CREATED:
        updatedTask = { ...task, status: TaskStatus.IN_PROGRESS };
        break;
      case TaskStatus.IN_PROGRESS:
        updatedTask = { ...task, status: TaskStatus.DONE };
        break;
      case TaskStatus.DONE:
        return;
    }

    const updatedTasks = await updateTask(updatedTask);
    setTasks(updatedTasks);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: task.status,
    item: task,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        onDrop();
        toast({
          text: `${item.title} moved to ${dropResult.name} successfully!`,
          type: "success",
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  const getDateText = () => {
    let str = "";

    switch (task.status) {
      case TaskStatus.CREATED:
        str = "Create time: ";
        break;

      case TaskStatus.IN_PROGRESS:
        str = "In progress time: ";
        break;

      case TaskStatus.DONE:
        str = "Finish time: ";
        break;
    }

    return str + formatDate(task.updatedDate);
  };

  const taskCardToggleItems = [
    {
      text: task.status === TaskStatus.CREATED ? "Edit" : "View",
      onClick: () => openModal(ModalType.VIEW_TASK, { task, setTasks }),
    },
    {
      text: "Delete",
      onClick: () => openModal(ModalType.DELETE_TASK, { task, setTasks }),
    },
  ];
  return (
    <Card id="task-card" ref={drag} style={{ ...style, opacity }}>
      <div className="task-header">
        <Card.Title>{task.title}</Card.Title>
        <Toggle items={taskCardToggleItems} />
      </div>
      <Card.Text>{task.description}</Card.Text>
      <Card.Footer>
        {getDateText()}
        {Boolean(task.owner) && (
          <Badge bg="warning" text="dark">
            {shortenDisplayname(task.owner)}
          </Badge>
        )}
      </Card.Footer>
    </Card>
  );
};

export default TaskCard;
