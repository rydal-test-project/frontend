import React from "react";

export type dictionary<t> = { [key: string]: t }
export interface IComponentProps {
    children?: React.ReactNode,
    className?: string
}