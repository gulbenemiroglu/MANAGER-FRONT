import { Accordion, Alert, InputGroup, Form, Button, Container } from "react-bootstrap";
import { FC, useState } from "react";
import { ICommentSection } from "components/CommentSection/types";
import { useModal } from "contexts/Modal";
import { updateTask } from "api/task";
import { postComment } from "api/comment";

const CommentSection: FC<ICommentSection> = ({ comments }) => {
  const { params, setParams } = useModal();

  const { setTasks, task } = params;

  const [comment, setComment] = useState("");

  const sendComment = async () => {
    const newComment = {
      reaTaskId: task.reaTaskId,
      commentText: comment,
    };
    const response = await postComment(newComment, task);
    const [updatedTask] = response.filter(
      (r) => r.reaTaskId === task.reaTaskId
    );
    setTasks(response);
    setParams({ ...params, task: updatedTask });
    setComment("");
  };

  return (
    <Accordion id="comment-section" defaultActiveKey="comments">
      <Accordion.Item eventKey="comments">
        <Accordion.Header>Show Comments</Accordion.Header>
        <Accordion.Body>
          <Container className="comment-container">
            {task.comments?.map((c: any) => (
              <div className="comment" key={c?.reaTaskId}>
                {c?.commentText}
              </div>
            ))}
          </Container>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button variant="outline-primary" onClick={sendComment}>
              Send
            </Button>
          </InputGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default CommentSection;
