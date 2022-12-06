import {useState} from "react";
import {useSession} from "contexts/Session";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import BaseForm from "components/Forms/BaseForm";
import {loginInputs} from "utils/constants";

const Login = () => {
    const {login} = useSession();
    const [credentials, setCredentials] = useState({username: "", password: ""});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <Container>
            <Row className="login">
                <Col lg={6}>
                    <Form>
                        <h3>Sign In</h3>
                        <BaseForm inputs={loginInputs} onChange={onChange}/>
                        <div className="d-grid">
                            <Button onClick={() => login(credentials)} variant="primary">Sign In</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;