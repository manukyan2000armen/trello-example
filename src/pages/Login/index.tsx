import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User } from "../../store/type";
import Swal from "sweetalert2";
import st from "./style.module.css";

function Login() {
  const { arrUser } = useSelector((st: any) => st.users);
  // console.log(arrUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const save = (data: User) => {
    const us = arrUser.find(
      (elm: User) => elm.email === data.email && elm.password === data.password
    );
    if (us) {
      localStorage.setItem("userId", us.id);
      navigate("/profile");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      reset();
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>();
  return (
    <>
      <div className={st.myForm}>
        <div className={st.loginForm}>
          <h1>Log In</h1>
          <div>
            <form onSubmit={handleSubmit(save)}>
              <label>Email</label>
              <div>
                <input
                  placeholder="Enter your email here"
                  type="text"
                  {...register("email", {
                    required: "Fill the field",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Fill letters",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
              <label>Password</label>
              <div>
                <input
                  placeholder="Enter your password here"
                  type="text"
                  {...register("password", {
                    required: "Fill the field",
                    pattern: {
                      value: /(?=.*\d)/,
                      message: "Fill letters and numbers",
                    },
                  })}
                />
              </div>
              <hr />
              <button>Log In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
