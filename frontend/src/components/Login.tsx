function Login() {
    return (
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
                        <form className="flip-card__form">
                            <input
                                type="email"
                                className="flip-card__input"
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                className="flip-card__input"
                                placeholder="Password"
                            />
                            <p className="page-link">
                                <span className="page-link-label">Forgot Password?</span>
                            </p>
                            <button className="flip-card__btn">Log in</button>
                        </form>
                    </div>
                    {/*Spatele cardului*/}
                    <div className="flip-card__back">
                        <p className="title">Create account</p>
                        <form className="flip-card__form">
                            <input type="text" className="flip-card__input" placeholder="Name" />
                            <input
                                type="email"
                                className="flip-card__input"
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                className="flip-card__input"
                                placeholder="Password"
                            />
                            <button className="flip-card__btn">Create account</button>
                        </form>
                        I'm an
                        <div className="wrapper-check">
                            <div className="option">
                                <input
                                    defaultChecked={true}
                                    defaultValue="Organiser"
                                    name="btn"
                                    type="radio"
                                    className="input"
                                />
                                <div className="btn">
                                    <span className="span">Organiser</span>
                                </div>
                            </div>
                            <div className="option">
                                <input
                                    defaultValue="Volunteer"
                                    name="btn"
                                    type="radio"
                                    className="input"
                                />
                                <div className="btn">
                                    <span className="span">Volunteer</span>
                                </div>
                            </div>
                            <div className="option">
                                <input
                                    defaultValue="Participant"
                                    name="btn"
                                    type="radio"
                                    className="input"
                                />
                                <div className="btn">
                                    <span className="span">Participant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </label>
        </div>
    );
}

export default Login;
