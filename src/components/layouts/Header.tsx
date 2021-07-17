import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import $ from 'jquery';


type TLink = { label: string, path: string }

let selectedLink: TLink | null;

export default function Header() {
  const links = [
    { path: '/', label: 'Главная' },
    { path: '/about', label: 'Обо мне' },
    { path: '/interests', label: 'Мои интересы' },
    { path: '/study', label: 'Учеба' },
    { path: '/gallery', label: 'Галерея' },
    { path: '/contacts', label: 'Контакты' },
    { path: '/blog', label: 'Мой блог' },
  ] as TLink[];
  // eslint-disable-next-line no-restricted-globals
  selectedLink = links.find(link => link.path === location.pathname ) as TLink;
  const [activeLink, setActiveLink] = useState<TLink>(selectedLink);
  const nav = useRef<HTMLElement>(null);
  const line = useRef<HTMLElement>(null);
  const mouseEnterHandler = (e: React.MouseEvent<HTMLAnchorElement>, link: TLink) => {
    setActiveLink(link)
  };
  const mouseLeaveHandler = () => {
    if (selectedLink) {
      setActiveLink(selectedLink);
    }
  };
  const selectLinkHandler = (link: TLink) => {
    setActiveLink(link);
    selectedLink = link
  };
  const NavLink = ({ link}: { link: TLink }) => {
    const isActive = activeLink.path === link.path;

    return (
      <Link to={link.path}
            className={cn('nav__link', { 'is-active': isActive })}
            onMouseEnter={e => mouseEnterHandler(e, link)}
            onMouseLeave={() => mouseLeaveHandler()}
            onClick={() => selectLinkHandler(link)}
      >
        {link.label}
      </Link>
    )
  };

  useEffect(() => {
    const $currentLink = $(nav.current as HTMLElement).find('.nav__link.is-active')
    const $line = $(line.current as HTMLElement);

    setTimeout(() => $line.css({ 'left': $currentLink.position().left, width: $currentLink.innerWidth() as number }), 100)
  });

  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav nav" ref={nav}>
          <ul className="nav__links-list">
            {
              links.map(link => (
                <li className="nav__links-list-item" key={link.path}>
                  <NavLink link={link}/>
                </li>
              ))
            }
          </ul>
          <span ref={line} className="nav__line"/>
        </nav>
      </div>
    </header>
  )
}