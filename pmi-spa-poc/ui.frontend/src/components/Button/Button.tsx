import React from "react";

require("./Button.scss");

interface ButtonProps {
    text: string;
    id?: string;
    link?: string;
    accessibilityLabel?: string;
    styleVariation?: string;
    variationType?: string;
    linkVariation?: string;
    marginBottom?: string;
    marginTop?: string;
    marginStart?: string;
    marginEnd?: string;
    typeAttr?: string;
    callback?: React.MouseEventHandler;
    type: string;
}

export default function Button(props: ButtonProps) {
    return (
        <a
            onClick={props.callback ? props.callback : () => null}
            id={props.id}
            type={props.typeAttr ? props.typeAttr : ""}
            href={props.link}
            className={`btn ${props.styleVariation} ${props.marginBottom} ${props.marginEnd} ${props.marginStart} ${props.marginTop}`}
            title={props.accessibilityLabel}
        >
            {props.text}
        </a>
    );
}

export const ButtonEditConfig = {
    emptyLabel: "Button",

    isEmpty: function (props: ButtonProps) {
        return !props || !props.text || props.text.trim().length < 1;
    },
};
