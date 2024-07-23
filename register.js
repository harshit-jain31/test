import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import { isEmail } from "validator";

const Register = (props) => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "The username must be between 3 and 20 characters.")
      .max(20, "The username must be between 3 and 20 characters.")
      .required("This field is required!"),
    email: Yup.string()
      .test("is-email", "This is not a valid email.", (value) => isEmail(value))
      .required("This field is required!"),
    password: Yup.string()
      .min(6, "The password must be between 6 and 40 characters.")
      .max(40, "The password must be between 6 and 40 characters.")
      .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;

    setMessage("");
    setSuccessful(false);

    AuthService.register(username, email, password).then(
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

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Field
                    name="username"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                  </button>
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
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
