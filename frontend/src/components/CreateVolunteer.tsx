// import countries from "../country.json";
import {useState} from "react";

const baseURL: string = "http://localhost:8090";

// type CountryData = {
//     prefix: string;
//     country: string;
// };
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


function CreateVolunteer() {
    //select country
    // const [selectedCountry, setSelectedCountry] = useState<string>('');
    // const countriesDictionary: Record<string, CountryData> = {};
    // countries.forEach((country: CountryData) => {
    //     countriesDictionary[country.country] = country;
    // });
    // const countryOptions = Object.keys(countriesDictionary).map((countryName) => (
    //     <option key={countryName} value={countryName}>
    //         {countryName} ({countriesDictionary[countryName].prefix})
    //     </option>
    // ));

    //check inputs
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');

    //Create account
    const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // const countryPrefix = countriesDictionary[selectedCountry]?.prefix || '';
        const user = {
            firstName: formData.get('firstName')?.toString() || '',
            lastName: formData.get('lastName')?.toString() || '',
            mail: formData.get('email')?.toString() || '',
            password: formData.get('password')?.toString() || '',
            phone: /*countryPrefix + */formData.get('phone')?.toString() || '',
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
                    const phoneNumber = formData.get('phone')?.toString() || '';
                    //Check if all is ok
                    if (user.firstName !== '' && user.lastName !== '' && user.mail !== '' && user.password !== '' && phoneNumber !=='' &&
                        isValidName(user.firstName) && isValidName(user.lastName) && isValidEmail(user.mail) &&
                        isValidPassword(user.password) && isValidPhone(user.phone)){
                        //Create account
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
                        else
                            alert('Cont was created with success. Log in now.');
                            //console.log("mere");
                    }
                    else alert('All inputs are mandatory.');
                };
            }
        }
    }

    return (
        <div className="create-account-form">
            <p className="title-form">Lead a hand!</p>
            <form className="form" onSubmit={handleSubmitCreate}>
                <span className="required">Marked inputs are mandatory.</span>
                <div className="label-input">
                    First name<span className="required">*</span>
                </div>
                <input type="text" name="firstName" className="form-input" placeholder="First name"  onChange={(e) => {
                    const value = e.target.value.trim();
                    if (!isValidName(value)) {
                        setFirstNameError('This is not a valid name.');
                    } else {
                        setFirstNameError('');
                    }
                }}/>
                <span className="error">{firstNameError}</span>
                <div className="label-input">
                    Last name<span className="required">*</span>
                </div>
                <input type="text" name="lastName" className="form-input" placeholder="Last name" onChange={(e) => {
                    const value = e.target.value.trim();
                    if (!isValidName(value)) {
                        setLastNameError('This is not a valid name.');
                    } else {
                        setLastNameError('');
                    }
                }}/>
                <span className="error">{lastNameError}</span>
                <div className="label-input">
                    Mail<span className="required">*</span>
                </div>
                <input type="email" name="email" className="form-input" placeholder="Email" onChange={(e) => {
                    const value = e.target.value.trim();
                    if (!isValidEmail(value)) {
                        setEmailError('This is not a valid mail.');
                    } else {
                        setEmailError('');
                    }
                }}/>
                <span className="error">{emailError}</span>
                <div className="label-input">
                    Password<span className="required">*</span>
                </div>
                <input type="password" name="password" className="form-input" placeholder="Password"  onChange={(e) => {
                    const value = e.target.value.trim();
                    if (!isValidPassword(value)) {
                        setPasswordError('The password must contain at least one uppercase letter, one lowercase letter, one number, one special character and have at least 8 characters.');
                    } else {
                        setPasswordError('');
                    }
                }}/>
                <span className="error">{passwordError}</span>
                <div className="label-input">
                    Phone number<span className="required">*</span>
                </div>
                <input type="number" name="phone" className="form-input" placeholder="Phone" onChange={(e) => {
                    const value = e.target.value.trim();
                    if (!isValidPhone(value)) {
                        setPhoneError('This is not a valid phone number.');
                    } else {
                        setPhoneError('');
                    }
                }}/>
                <span className="error">{phoneError}</span>
                <button className="btn-form">Create account</button>
            </form>
        </div>
    );
}

export default CreateVolunteer;
