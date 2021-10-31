import styled from 'styled-components';

interface InputProps {
    width?: string;
}

export const Input = styled.input<InputProps>`
    border: none;
    border-bottom: 1px solid black;
    padding: 4px;
    width: ${(props) => props.width ? props.width : 'inherit'};
    font-size: 16px;
    background-color: inherit;
`