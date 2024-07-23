import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import AuthService from "../services/auth.service";
import { isEmail } from "validator";

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    setMessage("");
    setSuccessful(false);

    AuthService.register(data.username, data.email, data.password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("username", {
                    required: "This field is required!",
                    minLength: {
                      value: 3,
                      message: "The username must be between 3 and 20 characters.",
                    },
                    maxLength: {
                      value: 20,
                      message: "The username must be between 3 and 20 characters.",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => (
                    <div className="invalid-feedback d-block">{message}</div>
                  )}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("email", {
                    required: "This field is required!",
                    validate: (value) =>
                      isEmail(value) || "This is not a valid email.",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <div className="invalid-feedback d-block">{message}</div>
                  )}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  {...register("password", {
                    required: "This field is required!",
                    minLength: {
                      value: 6,
                      message: "The password must be between 6 and 40 characters.",
                    },
                    maxLength: {
                      value: 40,
                      message: "The password must be between 6 and 40 characters.",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <div className="invalid-feedback d-block">{message}</div>
                  )}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
