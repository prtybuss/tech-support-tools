import React, { useState } from "react";
import cl from "./SignupEmployeeForm.module.css";

function signupEmployee({
  login,
  password,
  jobTitle,
  soundDir,
  pcAndPeripheralsInfo,
}) {
  console.log(login, password, jobTitle, soundDir, pcAndPeripheralsInfo);
}

const SignupEmployeeForm = ({ setVisible }) => {
  /*  const { signupEmployee } = useOffice(); */
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [soundDir, setSoundDir] = useState("");
  const [pcAndPeripheralsInfo, setPcAndPeripheralsInfo] = useState("");

  const clickOnSubmitHandler = () => {
    signupEmployee({
      login,
      password,
      jobTitle,
      soundDir,
      pcAndPeripheralsInfo,
    });
    setVisible(false);
  };

  return (
    <div className={cl.SignupEmployeeForm}>
      <div className={cl.newEmployeeSignupForm__header}>
        Добавить нового сотрудника
      </div>

      <input
        className={cl.form_input}
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Логин"
        autoFocus
      />

      <input
        className={cl.form_input}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />

      <input
        className={cl.form_input}
        type="text"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="Должность"
      />

      <input
        className={cl.form_input}
        type="text"
        value={soundDir}
        onChange={(e) => setSoundDir(e.target.value)}
        placeholder="Директория для хранения прослушки"
      />

      <textarea
        className={cl.form_textarea}
        value={pcAndPeripheralsInfo}
        onChange={(e) => setPcAndPeripheralsInfo(e.target.value)}
        placeholder="Информация об оборудовании рабочего места сотрудника"
      />

      {
        <button
          type="button"
          className={cl.form_submit__button}
          disabled={
            !(login || password || jobTitle || soundDir || pcAndPeripheralsInfo)
          }
          onClick={clickOnSubmitHandler}
        >
          Ок
        </button>
      }
    </div>
  );
};

export default SignupEmployeeForm;
