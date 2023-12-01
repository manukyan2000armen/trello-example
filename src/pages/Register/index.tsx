import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../store/type";
import { addUser } from "../../store/user/action";
import st from "./style.module.css";

function Register() {
  const { arrUser } = useSelector((st: any) => st.users);
  // console.log(arrUser)

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>();

  const save = (data: User): void => {
    // console.log(data);
    const us = arrUser.find((e: User) => e.email == data.email);
    if (us) {
      alert("Email has already");
    } else {
      dispatch(addUser(data));
      reset();
    }
  };
  return (
    <>
      <div className={st.myRegister}>
        <div className={st.registerForm}>
          <h1>Register</h1>
          <div>
            <form onSubmit={handleSubmit(save)}>
              <label>Name</label>
              <div>
                <input
                  placeholder="Enter your name here"
                  type="text"
                  {...register("name", {
                    required: "Լրացնել դաշտը",
                    pattern: { value: /[a-z-A-Z]+$/, message: "Լրացնել տառեր" },
                  })}
                />
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </div>
              <label>Surname</label>
              <div>
                <input
                  placeholder="Enter your surname here"
                  type="text"
                  {...register("surname", {
                    required: "Լրացնել դաշտը",
                    pattern: { value: /[a-z-A-Z]+$/, message: "Լրացնել տառեր" },
                  })}
                />
                {errors.surname && (
                  <p className="text-danger">{errors.surname.message}</p>
                )}
              </div>
              <label>Email</label>
              <div>
                <input
                  placeholder="Enter your email here"
                  type="text"
                  {...register("email", {
                    required: "Լրացնել դաշտը",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message:
                        "Լրացնել Email-ի հստակ կառուցվածքին համապատասխան",
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
                    required: "Լրացնել դաշտը",
                    pattern: {
                      value: /(?=.*\d)/,
                      message: "Լրացնել տառեր,թվեր",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>
              <button>Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
