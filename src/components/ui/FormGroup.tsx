import React from "react";

export interface IProps {
  children?: JSX.Element,
  label?: string,
  labelFor?: string
}
export default function FormGroup({ children, label, labelFor }: IProps) {
  return (
    <div className="form-group">
      {
        (label || labelFor) && (<label htmlFor={labelFor}>{label}</label>)
      }
      {children}
    </div>
  )
}