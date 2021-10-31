import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import cn from 'classnames';
import $ from 'jquery';
import {throttle} from "lodash";
import css from "./desktopHeader.module.scss";
import {Container} from "../../../ui/container";


type TLink = { label: string, path: string }

const links = [
  { path: '/', label: 'Главная' },
  { path: '/about', label: 'Обо мне' },
  { path: '/interests', label: 'Мои интересы' },
  { path: '/study', label: 'Учеба' },
  { path: '/gallery', label: 'Галерея' },
  { path: '/contacts', label: 'Контакты' },
  { path: '/blog', label: 'Мой блог' },
] as TLink[];

function DesktopHeader() {
  const location = useLocation();
  const refNav = useRef<HTMLElement>(null);
  const refLine = useRef<HTMLElement>(null);
  const [activeLink, setActiveLink] = useState<TLink | null>(null);
  const [selectedLink, setSelectedLink] = useState<TLink | null>(null);

  useEffect(() => {
    const handleResize = throttle(updateLinePos, 100);

    window.addEventListener('resize', handleResize);

    setSelectedLink(links.find(link => link.path === location.pathname) || null);
    setActiveLink(selectedLink );

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])
  useEffect(() => {
    updateLinePos();
  }, [activeLink, selectedLink])

  function updateLinePos() {
    const $currentLink = $(refNav.current as HTMLElement).find(`.${css.nav__link}.is-active`);
    const $line = $(refLine.current as HTMLElement);

    $line.css({ 'left': $currentLink.position()?.left, width: $currentLink.innerWidth() as number });
  }

  // handlers
  function handleMouseEnter (e: React.MouseEvent<HTMLAnchorElement>, link: TLink) {
    setActiveLink(link)
  }
  function handleMouseLeave () {
    if (selectedLink) {
      setActiveLink(selectedLink);
    }
  }
  function handleClickOnLink (link: TLink) {
    setSelectedLink(link);
  }

  // renderers
  function renderLink (link: TLink) {
    const isActive = activeLink && activeLink.path === link.path;

    return (
      <Link to={link.path}
            className={cn(css.nav__link, { 'is-active': isActive })}
            onMouseEnter={e => handleMouseEnter(e, link)}
            onMouseLeave={() => handleMouseLeave()}
            onClick={() => handleClickOnLink(link)}
      >
        {link.label}
      </Link>
    )
  }

  return (
      <Container>
        <nav className={cn(css.nav)} ref={refNav}>
          <ul className={cn(css.nav__linksList)}>
            {
              links.map(link => (
                <li className={cn(css.nav__linksListItem)} key={link.path}>
                  {renderLink(link)}
                </li>
              ))
            }
          </ul>
          <span ref={refLine} className={cn(css.nav__line)}/>
        </nav>
      </Container>
  )
}

export default DesktopHeader;
