
import { TaskStatus } from "utils/enums";
import dayjs from "dayjs";

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDate = (date: Date) => {
    return dayjs(date).format("DD/MM/YYYY HH:mm");
}

export const statusHandler = (status: number | string) => {
    if (typeof status === "string") {
        switch (status) {
            case TaskStatus.CREATED:
                return 0;
            case TaskStatus.IN_PROGRESS:
                return 1;
            case TaskStatus.DONE:
                return 2;
        }
    }
    switch (status) {
        case 0:
            return TaskStatus.CREATED;
        case 1:
            return TaskStatus.IN_PROGRESS;
        case 2:
            return TaskStatus.DONE;
    }
}

export const shortenDisplayname = (name: string) => {
    const chunk = name.split(" ");
    const firstname = chunk[0];
    const restReversed = [...chunk.reverse()];

    return firstname[0] + ". " +  restReversed[0]
}