import { useState } from "react"
import { useLogin } from "../hooks/useLogin.js"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    const handleSignUpClick = () => {
        navigate('/signup');
    }
    
    return (
        <div className="login_div">
            <div className="kasete">
                <form className="login" onSubmit={handleSubmit}>
                    <h2 className="sign">LOGIN</h2>
                    <div className="login_label login_email">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                className="l_label"
                                type="email"
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                    </div>
                    <div className="login_label  login_password">
                        <label htmlFor="password">Password:</label>
                        <input
                            className="l_label"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                        <button type="submit" className="login_navig button" disabled={isLoading}>LOGIN</button>
                        {error && <div className="error_warning">{error}</div>}
                </form>
                <button className="signup_navig button" onClick={handleSignUpClick}>SIGN UP</button>
            </div>
        </div>
    );
}
 
export default Login;