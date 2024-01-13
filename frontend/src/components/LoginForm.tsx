import {useNavigate} from "react-router-dom";
import '../style/form.css';
import Header from "./Header.tsx";

const baseURL: string = "http://localhost:8090";

function LoginForm() {
    const navigate = useNavigate();
    //login
    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = {
            mail: formData.get('mail')?.toString() || '',
            password: formData.get('password')?.toString() || ''
        };

        //Log in
        if (user.mail !== '' && user.password !== '') {
            const response = await fetch(`${baseURL}/users?mail=${user.mail}&password=${user.password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status !== 404) {
                let userData = await response.json();
                userData = { type: 'Participant', ...userData };
                //Save the date
                localStorage.setItem('userData', JSON.stringify(userData));
                //go home
                navigate('/home');
            }
            else{
                const response = await fetch(`${baseURL}/organizers?mail=${user.mail}&password=${user.password}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status !== 404) {
                    let userData = await response.json();
                    userData = { type: 'Organiser', ...userData };
                    //Save the date
                    localStorage.setItem('userData', JSON.stringify(userData));
                    //go home
                    navigate('/home');
                }
                else{
                    const response = await fetch(`${baseURL}/volunteers?mail=${user.mail}&password=${user.password}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.status !== 404) {
                        let userData = await response.json();
                        userData = { type: 'Volunteers', ...userData };
                        //Save the date
                        localStorage.setItem('userData', JSON.stringify(userData));
                        //go home
                        navigate('/home');
                    }
                    else alert("Mail or password are wrong!");
                }
            }
        }
    };

    return (
        <>
            <Header/>
            <div className="login-form">
                <p className="title-form">Welcome back</p>
                <form className="form"  onSubmit={handleSubmitLogin}>
                    <input type="email" name="mail" className="form-input" placeholder="Email"/>
                    <input type="password" name="password" className="form-input" placeholder="Password"/>
                    <button className="btn-form">Log in</button>
                </form>
            </div>
        </>
    );
}

export default LoginForm;
