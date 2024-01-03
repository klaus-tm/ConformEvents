import {useNavigate} from "react-router-dom";
import '../style/form.css';

const baseURL: string = "http://localhost:8090";

function Login() {
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
                // console.log(userData);
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
        // <div>
        //     {showForgotPassword ? (
        // <div className="card-switch">
        //     <label className="switch">
        //         <div className="card-switch switch flip-card__inner">
        <div className="login-form">
            <p className="title-form">Welcome back</p>
            <form className="form"  onSubmit={handleSubmitLogin}>
                <input type="email" name="mail" className="form-input" placeholder="Email"/>
                {/*<span className="error">ema</span>*/}
                <input type="password" name="password" className="form-input" placeholder="Password"/>
                {/*<p className="page-link">*/}
                {/*    <span className="page-link-label" onClick={handleForgotPasswordClick}>Forgot Password?</span>*/}
                {/*</p>*/}
                <button className="btn-form">Log in</button>
            </form>
        </div>
    );
}

export default Login;
