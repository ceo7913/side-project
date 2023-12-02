import React, { useState } from "react";
import styled from "styled-components";
import LoginType from "./LoginType";
import SignupType from "./SignupType";

const toggleOptions = {
  options: [
    {
      title: "Cell wall",
      value: "cell-wall",
    },
    {
      title: "Ribosomes",
      value: "ribosomes",
    },
  ],
  id: "q1",
};

const currentState = {
  q1: "ribsomes",
};

const Switch = () => {
  const [login, setLogin] = useState(true);
  const [isChecked, setIsChecked] = useState(
    toggleOptions.options[1].value === currentState.q1
  );
  const changeState = () => {
    setIsChecked((previousState) => !previousState);
  };
  const handleCheckBox = () => {
    setLogin(!login);
  };
  return (
    <>
      <div className="switchBox">
        <CheckBoxWrapper>
          <CheckBox
            id="checkbox"
            type="checkbox"
            onChange={changeState}
            checked={isChecked}
          />
          <CheckBoxLabel onClick={handleCheckBox} htmlFor="checkbox" />
        </CheckBoxWrapper>
      </div>
      {login ? <LoginType /> : <SignupType/>}
    </>
  );
};

const CheckBoxWrapper = styled.div`
  position: relative;
  width: 265px;
  height: 41px;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 41px;
  border-radius: 41px;
  border: 2px solid #08c304;
  background: RGB(33, 33, 33);
  cursor: pointer;
  &::after {
    content: "Login";
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 41px;
    width: 50%;
    height: 100%;
    color: #ffffff;
    font-size: 18px;
    background: linear-gradient(
      -135deg,
      rgb(0, 231, 149) 0%,
      rgb(0, 187, 221) 100%
    );
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 41px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: RGB(33, 33, 33);
    &::after {
      content: "Sign Up";
      display: inline-flex;
      background: linear-gradient(
        -135deg,
        rgb(74, 144, 226) 0%,
        rgb(148, 56, 255) 100%
      );
      align-items: center;
      color: #ffffff;
      justify-content: center;
      border-radius: 40px;
      width: 50%;
      height: 100%;
      margin-left: 50%;
      transition: 0.2s;
    }
  }
`;
export default Switch;
