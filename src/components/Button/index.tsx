import * as React from 'react';
import './styles.scss';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color: "primary" | "disabled" | "secondary";
    customClassName?: string;
    checkStatus: boolean

}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { color, customClassName ,checkStatus, ...btnProps} = props;
    return (
        <button disabled={checkStatus}  className={`btn btn--${color}  ${customClassName || ''}`}  {...btnProps} >
            {props.children}
        </button>
    );
};
