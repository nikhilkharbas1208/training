// ButtonStyled.js or inside your component file

import styled from 'styled-components';

const ButtonStyled = styled.button`
  padding: 10px 20px;
  background-color: #398cef;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2f74cf;
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }

  margin-right: 10px;
`;



export default ButtonStyled;


