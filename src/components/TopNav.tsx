/**
 * Job Notification Tracker — Top Navigation
 * KodNest Premium Design System
 * Dashboard | Saved | Digest | Settings | Proof
 * Responsive: hamburger menu on mobile
 */

import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isShippingUnlocked } from '../utils/testStatus';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Saved', path: '/saved' },
  { label: 'Digest', path: '/digest' },
  { label: 'Settings', path: '/settings' },
  { label: 'Proof', path: '/proof' },
  { label: 'Test', path: '/jt/07-test' },
  { label: 'Ship', path: '/jt/08-ship' },
] as const;

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shipLocked, setShipLocked] = useState(true);

  useEffect(() => {
    const checkLock = () => {
      setShipLocked(!isShippingUnlocked());
    };

    checkLock();
    // Listen for storage changes in other tabs
    window.addEventListener('storage', checkLock);
    // Refresh on focus, click or state changes in this tab
    window.addEventListener('click', checkLock);
    window.addEventListener('focus', checkLock);

    return () => {
      window.removeEventListener('storage', checkLock);
      window.removeEventListener('click', checkLock);
      window.removeEventListener('focus', checkLock);
    };
  }, []);

  const navLinks = (
    <>
      {NAV_ITEMS.map(({ label, path }) => {
        const isShip = path === '/jt/08-ship';
        const locked = isShip && shipLocked;

        return (
          <NavLink
            key={path}
            to={locked ? '#' : path}
            end={false}
            className={({ isActive }) =>
              `kn-topnav__link${isActive ? ' kn-topnav__link--active' : ''}${locked ? ' kn-topnav__link--locked' : ''}`
            }
            onClick={(e) => {
              if (locked) {
                e.preventDefault();
                alert('Shipping is locked! Complete all 10 tests in the Test Checklist first.');
              }
              setMenuOpen(false);
            }}
            style={locked ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            {locked ? `🔒 ${label}` : label}
          </NavLink>
        );
      })}
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
