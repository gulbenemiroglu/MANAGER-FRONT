import { FC } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { IToggle } from "./types";

const Toggle: FC<IToggle> = ({ items }) => {
  return (
    <Dropdown id="toggle" as={ButtonGroup}>
      <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
      <Dropdown.Menu>
        {items.map((i) => (
          <Dropdown.Item key={i.text} onClick={i.onClick}>
            {i.text}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Toggle;
