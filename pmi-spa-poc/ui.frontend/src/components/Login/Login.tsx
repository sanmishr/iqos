import React, {useEffect, useState} from "react";
import "./Login.scss";
import Button from "../Button/Button";

interface LoginProps {
    labelEmail: string;
    labelPassword: string;
    labelPasswordForgotten: string;
    labelSubmitButton: string;
}

function RequiredIndicator() {
    return <span className={"required"}>&nbsp;*</span>;
}

export default function Login(props: LoginProps): JSX.Element {
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState({});
    const [form, setForm] = useState({
        loginID: "",
        password: "",
    });

    useEffect(() => {
        // @FIXME -> This will not work with SSR. 'document' is not available on server side. POC only.
        if (document && document.getElementsByClassName("wrapper")) {
            document
                .getElementsByClassName("wrapper")[0]
                .parentElement?.parentElement?.classList.add("login-wrapper");
            document
                .getElementsByClassName("wrapper")[0]
                .parentElement?.parentElement?.parentElement?.classList.add(
                "flex-login-container"
            );
        }
    });

    // https://help.sap.com/docs/SAP_CUSTOMER_DATA_CLOUD/8b8d6fffe113457094a17701f63e3d6a/683844d3c4b54104b2201efffdf558e3.html
    function login() {
        const endpoint = process.env.REACT_APP_GIGYA_ENDPOINT;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,OPTIONS, HEAD"
            },
        };
        const apiKey = process.env.REACT_APP_GIGYA_APIKEY
            ? process.env.REACT_APP_GIGYA_APIKEY
            : "missing-key";
        const params: URLSearchParams = new URLSearchParams([
            ["loginID", form.loginID],
            ["password", form.password],
            ["apiKey", apiKey],
        ]);

        const getUrl = endpoint + "/accounts.login?" + params;

        fetch(getUrl, options)
            .then((success) => {
                return success.json();
            })
            .then((data) => {
                if (data) {
                    if (data.isActive && data.profile) {
                        setErrorMessage("");
                        setUser(true);
                    } else {
                        setErrorMessage(data.errorDetails);
                    }
                }
            })
            .catch((error) => console.log("error", error));
    }

    return (
        <div className="wrapper">
            <form>
                <label htmlFor="email">
          <span className="form-label">
            {props.labelEmail}
              <RequiredIndicator/>
          </span>
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={form.loginID}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            loginID: e.target.value,
                        });
                    }}
                />

                <label htmlFor="password">
          <span className={"form-label"}>
            {props.labelPassword}
              <RequiredIndicator/>
          </span>
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            password: e.target.value,
                        });
                    }}
                />

                <span className={"form-label"}>
          <a className={"password-forgotten"} href="#pwForgotten">
            {props.labelPasswordForgotten}
          </a>
        </span>
                <Button
                    text={props.labelSubmitButton}
                    callback={login}
                    styleVariation="btn-slate-turquoise"
                    type="submit"
                />
            </form>

            {errorMessage && (
                <div className="error">{"Login Failed :" + errorMessage}</div>
            )}


            {user && (
                <div className="success">
                    {"Logged In Successfully"}
                    <img src="/content/dam/pmi-spa-poc/Login_Success.jpg"/>
                </div>
            )}
        </div>
    );
}

export const LoginEditConfig = {
    emptyLabel: "Button",

    isEmpty: function (props: LoginProps) {
        return (
            !props ||
            !props.labelSubmitButton ||
            props.labelSubmitButton.trim().length < 1
        );
    },
};
