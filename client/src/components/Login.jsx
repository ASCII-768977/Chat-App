import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";
import toast from "react-hot-toast";

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp, resultSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  const handleRegister = () => {
    triggerSignUp({ username, password });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (isRegister) {
        handleRegister();
      } else {
        handleLogin();
      }
    }
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
      toast.success("Login success, wait for redirect...");
    } else if (resultLogin.error) {
      toast.error("User doesn't exist or wrong credentials");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultLogin.data, resultLogin.error]);

  useEffect(() => {
    if (resultSignUp.data?.response) {
      toast.success("User Created");
    } else if (resultSignUp.error) {
      toast.error("Created Failed, 10 users max.");
    }
  }, [resultSignUp.data, resultSignUp.error]);

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">TALK GENIUS</h2>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>

        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onKeyDown={handleKeyDown}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onKeyDown={handleKeyDown}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          ) : (
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>

      <div className="intro-container">
        <h3 className="intro-title">Quick User Guide</h3>
        <p className="intro-text">
          There are 3 test users are pre-set.
          <br />
          <br />- username: forrest &nbsp;&nbsp;&nbsp; password: 1234
          <span style={{ color: "red" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Recommended
          </span>
          <br />
          - username: bob &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; password: 1234
          <br />
          - username: alice &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; password: 1234
          <br />
          <br />
          You can try to create your own user or just use test users, only
          maximum 10 users can be created.
        </p>
        <p className="intro-text">
          1. If you create a normal room. You can invite other users to join the
          room by clicking the right sidebar -&gt; Members.
        </p>
        <p className="intro-text">
          2.If you want to use ChatGPT, click on the plus button on top left
          sidebar to create a new chat room. Please set the room name with
          prefix of
          <span style={{ color: "red" }}> "AiAssist_"</span>. For example,
          "AiAssist_Test". The ai will only work with this prefix. Then go to
          the right sidebar click members and invite the ai
          <span style={{ color: "red" }}> "ChatGPT4o"</span>.
        </p>
        <p className="intro-text">
          3. Once you type text into the input box. After one second the ai will
          try to complete your sentence. Press tab to take the ai
          auto-completion or press enter to send the message.
        </p>

        <p className="intro-text">
          4. You can also send picture, gif and pdf through the attachment
          button aside the send message icon.
        </p>
        <p className="intro-text">
          5. Have fun and feel free to contact me if you have any questions or
          find any bugs. &nbsp;
          <a
            href="mailto:forrest.lin.work@gmail.com"
            style={{ color: "lightGreen" }}
          >
            forrest.lin.work@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
