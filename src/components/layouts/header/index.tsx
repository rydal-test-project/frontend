import React from "react";
import DesktopHeader from "./desktopHeader";
import cn from 'classnames'
import css from './header.module.scss'
import {useInstance} from "react-ioc";
import {UiStore} from "@stores";
import MobileHeader from "./mobileHeader";
import {observer} from "mobx-react-lite";

function Header() {
    const ui = useInstance(UiStore);

    return (
        <header className={cn(css.header)}>
            {
                ui.isSm ? (
                    <MobileHeader/>
                ) : (
                    <DesktopHeader/>
                )
            }
        </header>
    )
}

export default observer(Header);
