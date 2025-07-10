
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
    background-color: #a2b2c7;
    cursor: not-allowed;
  }
  &:active {
    transform: scale(0.96);
  }

  margin-right: 10px;
`;



export default ButtonStyled;


