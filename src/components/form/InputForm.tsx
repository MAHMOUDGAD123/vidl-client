import "./inputForm.css";
import { Form } from "react-router";
import SearchBox from "./SearchBox";

const InputForm = () => {
  return (
    <Form method="POST" className="input-form">
      <SearchBox />
    </Form>
  );
};

export default InputForm;
