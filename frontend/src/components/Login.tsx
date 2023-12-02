import countries from "../country.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const baseURL: string = "http://localhost:8090";

type CountryData = {
    prefix: string;
    country: string;
};
function isValidName(name: string): boolean {
    if (name.length <3) return false;
    const regexDigit = /[0-9]/;
    return !regexDigit.test(name);
}
function isValidPhone(phone: string): boolean {
    if (phone.length < 5) return false;
    const regexLowerCase = /[a-z]/;
    const regexUpperCase = /[A-Z]/;
    const regexSpc = /[!@#$%^?><;'&*()]/;
    return !(regexLowerCase.test(phone) && regexUpperCase.test(phone) && regexSpc.test(phone));
}
function isValidEmail(email: string): boolean {
    if (email.length < 8) return false;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
}

function isValidPassword(pass: string): boolean {
    if (pass.length < 8) return false;
    const regexLowerCase = /[a-z]/;
    const regexUpperCase = /[A-Z]/;
    const regexDigit = /[0-9]/;
    const regexSpc = /[!@#$%^?><;'&*()]/;
    return regexLowerCase.test(pass) && regexUpperCase.test(pass) && regexDigit.test(pass) && regexSpc.test(pass);
}


function Login() {
    const navigate = useNavigate();

    //select country
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const countriesDictionary: Record<string, CountryData> = {};
    countries.forEach((country: CountryData) => {
        countriesDictionary[country.country] = country;
    });
    const countryOptions = Object.keys(countriesDictionary).map((countryName) => (
        <option key={countryName} value={countryName}>
            {countryName} ({countriesDictionary[countryName].prefix})
        </option>
    ));

    //check inputs
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');

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

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (!isValidEmail(value)) {
            setEmailError('This is not a valid mail.');
        } else {
            setEmailError('');
        }
    };

    //Create account
    const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const countryPrefix = countriesDictionary[selectedCountry]?.prefix || '';
        const user = {
            firstName: formData.get('firstName')?.toString() || '',
            lastName: formData.get('lastName')?.toString() || '',
            mail: formData.get('email')?.toString() || '',
            password: formData.get('password')?.toString() || '',
            phone: countryPrefix + formData.get('phone')?.toString() || '',
        };
        //check mail exists
        const response = await fetch(baseURL + '/users/' + user.mail, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status !== 404) {
            alert('The mail you provided is already used. Try a different one');
        }
        else {
            const response = await fetch(baseURL + '/volunteers/' + user.mail, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status !== 404) {
                alert('The mail you provided is already used. Try a different one');
            }
            else{
                const response = await fetch(baseURL + '/organizers/' + user.mail, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status !== 404) {
                    alert('The mail you provided is already used. Try a different one');
                }
                else{
                    //Create account
                    const userType = formData.get('btn')?.toString() || '';
                    const phoneNumber = formData.get('phone')?.toString() || '';
                    //Check if all is ok
                    if (user.firstName !== '' && user.lastName !== '' && user.mail !== '' && user.password !== '') {
                        if (userType !== 'Participant' && (phoneNumber === ''))
                            alert('The phone number is mandatory.');
                        else {
                            //Create account
                            if (userType === 'Participant') {
                                const response = await fetch(baseURL + '/users', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(user)
                                });
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                            }
                            else if (userType === 'Volunteer') {
                                const response = await fetch(baseURL + '/volunteers', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(user)
                                });
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                            }
                            else if (userType === 'Organiser') {
                                const response = await fetch(baseURL + '/organizers', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(user)
                                });
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                else
                                    console.log("mere");
                            }
                        }
                    }
                    else alert('Name, email and password are mandatory.');
                };
            }
        }
    }

    return (
        // <div>
        //     {showForgotPassword ? (
        <div className="card-switch">
            <label className="switch">
                <input type="checkbox" className="toggle" />
                <span className="slider" />
                <span className="toggle-knob" />
                <span className="card-side" />
                <div className="flip-card__inner">
                    {/*Fata cardului*/}
                    <div className="flip-card__front">
                        <p className="title">Welcome back</p>
                        <form className="flip-card__form"  onSubmit={handleSubmitLogin}>
                            <input type="email" name="mail" className="flip-card__input" placeholder="Email"  onChange={handleEmailChange}/>
                            <span className="error">{emailError}</span>
                            <input type="password" name="password" className="flip-card__input" placeholder="Password"/>
                            {/*<p className="page-link">*/}
                            {/*    <span className="page-link-label" onClick={handleForgotPasswordClick}>Forgot Password?</span>*/}
                            {/*</p>*/}
                            <button className="flip-card__btn">Log in</button>
                        </form>
                    </div>
                    {/*Spatele cardului*/}
                    <div className="flip-card__back">
                        <p className="title">Create account</p>
                        <form className="flip-card__form" onSubmit={handleSubmitCreate}>
                            <input type="text" name="firstName" className="flip-card__input" placeholder="First name"  onChange={(e) => {
                                const value = e.target.value.trim();
                                if (!isValidName(value)) {
                                    setFirstNameError('This is not a valid name.');
                                } else {
                                    setFirstNameError('');
                                }
                            }}/>
                            <span className="error">{firstNameError}</span>
                            <input type="text" name="lastName" className="flip-card__input" placeholder="Last name" onChange={(e) => {
                                const value = e.target.value.trim();
                                if (!isValidName(value)) {
                                    setLastNameError('This is not a valid name.');
                                } else {
                                    setLastNameError('');
                                }
                            }}/>
                            <span className="error">{lastNameError}</span>
                            <input type="email" name="email" className="flip-card__input" placeholder="Email" onChange={(e) => {
                                const value = e.target.value.trim();
                                if (!isValidEmail(value)) {
                                    setEmailError('This is not a valid mail.');
                                } else {
                                    setEmailError('');
                                }
                            }}/>
                            <span className="error">{emailError}</span>
                            <input type="password" name="password" className="flip-card__input" placeholder="Password"  onChange={(e) => {
                                const value = e.target.value.trim();
                                if (!isValidPassword(value)) {
                                    setPasswordError('The password must contain at least one uppercase letter, one lowercase letter, one number, one special character and have at least 8 characters.');
                                } else {
                                    setPasswordError('');
                                }
                            }}/>
                            <span className="error">{passwordError}</span>
                            Prefix country:
                            <select name="country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="flip-card__input">
                                {countryOptions}
                            </select>
                            <input type="number" name="phone" className="flip-card__input" placeholder="Phone" onChange={(e) => {
                                const value = e.target.value.trim();
                                if (!isValidPhone(value)) {
                                    setPhoneError('This is not a valid phone number.');
                                } else {
                                    setPhoneError('');
                                }
                            }}/>
                            <span className="error">{phoneError}</span>
                            I'm an
                            <div className="wrapper-check">
                                <div className="option">
                                    <input defaultChecked={true} value="Participant" name="btn" type="radio" className="input" />
                                    <div className="btn">
                                        <span className="span">Participant</span>
                                    </div>
                                </div>
                                <div className="option">
                                    <input value="Volunteer" name="btn" type="radio" className="input" />
                                    <div className="btn">
                                        <span className="span">Volunteer</span>
                                    </div>
                                </div>
                                <div className="option">
                                    <input value="Organiser" name="btn" type="radio" className="input" />
                                    <div className="btn">
                                        <span className="span">Organiser</span>
                                    </div>
                                </div>
                            </div>
                            <button className="flip-card__btn">Create account</button>
                    </form>
                    </div>
                </div>
            </label>
        </div>
        //         ) : (
        //             /*Password forgot*/
        //         <div>
        //
        //         </div>
        //     )}
        // </div>
    );
}

export default Login;
