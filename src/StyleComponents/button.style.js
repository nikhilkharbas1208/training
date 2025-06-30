const { default: styled } = require("styled-components");

export const Button = styled.button`
width: 180px;
height:30px;
background-color: ${(props)=>props.bgColor};
padding: 2px 10px ;
font-size: 17px;
border: none;
border-radius: 5px;
/* margin-right: 18px; */
/* background-color:rgb(238, 77, 77); */
color:  rgb(240, 231, 231);

/* 
&:hover{
    & label{
        color: black;
    }
} */
&:active{
    background-color: rgb(105, 102, 102);;
}

`;

export const ButtonLabel = styled.label`

font-size: 25px;
color: white;

`;