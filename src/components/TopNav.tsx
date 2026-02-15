/**
 * Job Notification Tracker — Top Navigation
 * KodNest Premium Design System
 * Dashboard | Saved | Digest | Settings | Proof
 * Responsive: hamburger menu on mobile
 */

import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Saved', path: '/saved' },
  { label: 'Digest', path: '/digest' },
  { label: 'Settings', path: '/settings' },
  { label: 'Proof', path: '/proof' },
] as const;

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (
    <>
      {NAV_ITEMS.map(({ label, path }) => (
        <NavLink
          key={path}
          to={path}
          end={false}
          className={({ isActive }) =>
            `kn-topnav__link${isActive ? ' kn-topnav__link--active' : ''}`
          }
          onClick={() => setMenuOpen(false)}
        >
          {label}
        </NavLink>
      ))}
    </>
  );

  return (
    <nav className="kn-topnav">
      <Link to="/" className="kn-topnav__brand">Job Notification Tracker</Link>

      <button
        type="button"
        className="kn-topnav__hamburger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
      >
        <span className="kn-topnav__hamburger-bar" />
        <span className="kn-topnav__hamburger-bar" />
        <span className="kn-topnav__hamburger-bar" />
      </button>

      <div className={`kn-topnav__links${menuOpen ? ' kn-topnav__links--open' : ''}`}>
        {navLinks}
      </div>
    </nav>
  );
}
