import { AlertType } from "../../typedeclaration";
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";

const Alert = ({ type, body }: AlertType) => {
  if (type == "success") {
    return (
      <div className="bg-[rgb(213,237,219)] text-[rgb(20,86,36)] rounded-md p-3 mt-4">
        <div className="flex items-center space-x-2">
          <BiCheckCircle />
          <p>Success</p>
        </div>
        <p>{body}</p>
      </div>
    );
  }
  if (type == "error") {
    return (
      <div className="bg-[rgb(249,215,219)] text-[rgb(137,28,119)] rounded-md p-3 mt-4">
        <div className="flex items-center space-x-2">
          <BiErrorCircle />
          <p>Error</p>
        </div>
        <p>{body}</p>
      </div>
    );
  }
  return <div></div>;
};

export default Alert;
