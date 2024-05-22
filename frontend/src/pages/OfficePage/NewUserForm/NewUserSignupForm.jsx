import React, { useState } from "react";
import cl from "./UserSignupForm.module.css";

function signupEmployee({
  login,
  password,
  jobTitle,
  soundDir,
  pcAndPeripheralsInfo,
}) {
  console.log(login, password, jobTitle, soundDir, pcAndPeripheralsInfo);
}

const UserSignupForm = ({ setVisible }) => {
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
    <div className={cl.form}>
      <span className={cl.form_header}>Добавить нового сотрудника</span>

      <div className={cl.form_field}>
        <span className={cl.form_field__label}>Логин</span>
        <input
          className={cl.form_input}
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Логин"
          autoFocus
        />
      </div>

      <div className={cl.form_field}>
        <span className={cl.form_field__label}>Пароль</span>
        <input
          className={cl.form_input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
      </div>

      <div className={cl.form_field}>
        <span className={cl.form_field__label}>Должность</span>
        <input
          className={cl.form_input}
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Должность"
        />
      </div>

      <div className={cl.form_field}>
        <span className={cl.form_field__label}>Папка</span>
        <input
          className={cl.form_input}
          type="text"
          value={soundDir}
          onChange={(e) => setSoundDir(e.target.value)}
          placeholder="Директория для хранения прослушки"
        />
      </div>

      <div className={cl.form_field}>
        <span className={cl.form_field__label}>Оборудование</span>
        <textarea
          className={cl.form_textarea}
          value={pcAndPeripheralsInfo}
          onChange={(e) => setPcAndPeripheralsInfo(e.target.value)}
          placeholder="Информация об оборудовании рабочего места сотрудника"
        />
      </div>

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
    </div>
  );
};

export default UserSignupForm;
