import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const enteredPassword = useRef("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDwX1LEI0sFtNSiRy9x1fnxL52NZXOX-s0",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredPassword.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
        
      const data = await res.json();

      if (res.ok) {
        console.log("password successfully changed");
      } else {
        throw new Error(data.error.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          ref={enteredPassword}
          minLength="7"
          type="password"
          id="new-password"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
