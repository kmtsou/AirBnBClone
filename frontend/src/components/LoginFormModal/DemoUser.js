import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useState } from "react";

const DemoUser = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const loginDemoUser = (e) => {
        e.preventDefault();
        const demoCredentials = {
            credential: 'Demo-lition',
            password: 'password'
        }
        dispatch(login(demoCredentials)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    };

    return (
        <button onClick={loginDemoUser}>Login as demo user</button>
    )
};

export default DemoUser;
