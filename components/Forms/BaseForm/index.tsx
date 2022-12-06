import {Form} from "react-bootstrap";
import {FC} from "react";
import {capitalizeFirstLetter} from "utils/helpers";
import {IBaseFormInputs} from "components/Forms/BaseForm/types";

const FormInputs: FC<IBaseFormInputs> = ({inputs, onChange}) => {
    return (
        <>
            {inputs.map((input) => (
                <Form.Group key={input.name} className="mb-3">
                    {input.type === "select" ? (
                        <>
                            <Form.Label>{capitalizeFirstLetter(input.name)}</Form.Label>
                            <Form.Select {...input} onChange={onChange}>
                                <option key='blankChoice' hidden value={undefined}>Select a {input.name}</option>
                                {input.options?.map((option) => (
                                    <option key={option.id} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </Form.Select>
                            {input.required && (
                                <Form.Control.Feedback type="invalid">
                                    This field is required
                                </Form.Control.Feedback>
                            )}
                        </>
                    ) : (
                        <>
                            <Form.Label>{capitalizeFirstLetter(input.name)}</Form.Label>
                            <Form.Control {...input} placeholder={`Enter ${input.name}`} onChange={onChange}/>
                            {input.required && (
                                <Form.Control.Feedback type="invalid">
                                    This field is required
                                </Form.Control.Feedback>
                            )}
                        </>
                    )}
                </Form.Group>
            ))}
        </>
    )

};

export default FormInputs;