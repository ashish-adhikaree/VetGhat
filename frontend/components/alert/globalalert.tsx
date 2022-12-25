import { AlertType } from "../../typedeclaration"
import Alert from "./alert"

const GlobalAlert = ({type, body}:AlertType) => {
    return <div className="fixed right-10 min-w-[200px] bottom-10 z-[300]">
        <Alert type={type} body={body}/>
    </div>
}
export default GlobalAlert