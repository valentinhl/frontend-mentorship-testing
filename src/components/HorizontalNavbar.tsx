import React from 'react';
import './HorizontalNavbar.css';

type NavbarItem = {
  label: string;
  url: string;
};

const NAVBAR_ITEMS: NavbarItem[] = [
  { label: 'Home', url: '/' },
  { label: 'Lists', url: '/todo' },
  { label: 'New List Item', url: '/todo/create' },
  { label: 'Stats', url: '/stats' }
];

const HorizontalNavbar = (): JSX.Element => {
  return (
    <nav className='horizontal-navbar'>
      <ul className='horizontal-navbar-list'>
        {NAVBAR_ITEMS.map(({ label, url }: NavbarItem) => (
          <li key={label}>
            <a href={url}> {label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HorizontalNavbar;
