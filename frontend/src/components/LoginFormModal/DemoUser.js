import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const DemoUser = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const loginDemoUser = async (e) => {
        e.preventDefault();
        const demoCredentials = {
            credential: 'Demo-lition',
            password: 'password'
        }
        let loggedInDemo = await dispatch(login(demoCredentials)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        if (loggedInDemo) {
            history.push('/');
        }
    };

    return (
        <button onClick={loginDemoUser}>Login as demo user</button>
    )
};

export default DemoUser;
