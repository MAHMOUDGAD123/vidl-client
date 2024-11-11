import "./downloadForm.css";
import { Form } from "react-router-dom";

interface DownloadFormProps {
  children: React.ReactNode | React.ReactNode[];
}

const DownloadForm = ({ children }: DownloadFormProps) => {
  return (
    <Form className="download-form" method="POST">
      {children}
    </Form>
  );
};

export default DownloadForm;
