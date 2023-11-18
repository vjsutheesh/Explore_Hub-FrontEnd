import React, { useState, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";

const Auth = () => {
  const API_URL = process.env.REACT_APP_API_KEY;
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image:undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image :{
            value:null,
            isValid:false
          }
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs)
    if (isLoginMode) {
      try {
         const responseData = await sendRequest(
          `${API_URL}/api/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        )
        auth.login(responseData.user.id);
      } catch (err) {
      }
    } else {
      try {
        const formData = new FormData()
        formData.append('email',formState.inputs.email.value)
        formData.append('name',formState.inputs.name.value)
        formData.append('password',formState.inputs.password.value)
        formData.append('image',formState.inputs.image.value)
        const responseData = await sendRequest( `${API_URL}/api/users/signup`, 
           "POST",
          formData
        );
        auth.login(responseData.user.id);
      } catch (err) {
      }
    }
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} errorText="Please provide an image ." />}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;

// import React, { useState, useContext } from "react";
// import { AuthContext } from "../../shared/context/auth-context";
// import Card from "../../shared/components/UIElements/Card";
// import Input from "../../shared/components/FormElements/Input";
// import Button from "../../shared/components/FormElements/Button";
// import ErrorModal from "../../shared/components/UIElements/ErrorModal";
// import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
// import {
//   VALIDATOR_EMAIL,
//   VALIDATOR_MINLENGTH,
//   VALIDATOR_REQUIRE,
// } from "../../shared/util/validators";
// import { useForm } from "../../shared/hooks/form-hook";
// import "./Auth.css";

// const Auth = () => {
//   const auth = useContext(AuthContext);
//   const [isLoginMode, setIsLoginMode] = useState(true);
//   const [isLoading, setIsLoadng] = useState(false);
//   const [error, setError] = useState();
//   const [formState, inputHandler, setFormData] = useForm(
//     {
//       email: {
//         value: "",
//         isValid: false,
//       },
//       password: {
//         value: "",
//         isValid: false,
//       },
//     },
//     false
//   );

//   const switchModeHandler = () => {
//     if (!isLoginMode) {
//       setFormData(
//         {
//           ...formState.inputs,
//           name: undefined,
//         },
//         formState.inputs.email.isValid && formState.inputs.password.isValid
//       );
//     } else {
//       setFormData(
//         {
//           ...formState.inputs,
//           name: {
//             value: "",
//             isValid: false,
//           },
//         },
//         false
//       );
//     }
//     setIsLoginMode((prevMode) => !prevMode);
//   };

//   const authSubmitHandler = async (event) => {
//     event.preventDefault();
//     setIsLoadng(true);
//     if (isLoginMode) {
//       try {
//         const response = await fetch("http://localhost:5000/api/users/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: formState.inputs.email.value,
//             password: formState.inputs.password.value,
//           }),
//         });
//         const responseData = await response.json();
//         if (!response.ok) {
//           throw new Error(responseData.message);
//         }
//         setIsLoadng(false);
//         auth.login();
//       } catch (err) {
//         setIsLoadng(false);
//         setError(err.message || "something went wrong , try again ! ");
//       }
//     } else {
//       try {
//         const response = await fetch("http://localhost:5000/api/users/signup", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: formState.inputs.name.value,
//             email: formState.inputs.email.value,
//             password: formState.inputs.password.value,
//           }),
//         });
//         const responseData = await response.json();
//         if (!response.ok) {
//           throw new Error(responseData.message);
//         }
//         setIsLoadng(false);
//         auth.login();
//       } catch (err) {
//         setIsLoadng(false);
//         setError(err.message || "something went wrong , try again ! ");
//       }
//     }
//     setIsLoadng(false);
//   };
//   const errorHandler = () => {
//     setError(null);
//   };
//   return (
//     <>
//       <ErrorModal error={error} onClear={errorHandler}></ErrorModal>
//       <Card className="authentication">
//         {isLoading && <LoadingSpinner asOverlay />}
//         <hr />
//         <form onSubmit={authSubmitHandler}>
//           {!isLoginMode && (
//             <Input
//               element="input"
//               id="name"
//               type="text"
//               label="Your Name"
//               validators={[VALIDATOR_REQUIRE()]}
//               errorText="Please enter a name."
//               onInput={inputHandler}
//             />
//           )}
//           <Input
//             element="input"
//             id="email"
//             type="email"
//             label="E-Mail"
//             validators={[VALIDATOR_EMAIL()]}
//             errorText="Please enter a valid email address."
//             onInput={inputHandler}
//           />
//           <Input
//             element="input"
//             id="password"
//             type="password"
//             label="Password"
//             validators={[VALIDATOR_MINLENGTH(5)]}
//             errorText="Please enter a valid password, at least 5 characters."
//             onInput={inputHandler}
//           />
//           <Button type="submit" disabled={!formState.isValid}>
//             {isLoginMode ? "LOGIN" : "SIGNUP"}
//           </Button>
//         </form>
//         <Button inverse onClick={switchModeHandler}>
//           SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
//         </Button>
//       </Card>
//     </>
//   );
// };

// export default Auth;
