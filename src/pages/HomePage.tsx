/**
 * Job Notification Tracker — Landing Page
 * KodNest Premium Design System
 */

import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="kn-hero-section">
      <div className="kn-hero-container">
        <div className="kn-hero-stack">
          <h1 className="kn-landing__headline">
            Stop Missing The Right Jobs.
          </h1>
          <p className="kn-landing__subtext">
            Precision-matched job discovery delivered daily at 9AM.
          </p>
          <Link to="/settings" className="kn-btn kn-btn-primary kn-landing__cta">
            Start Tracking
          </Link>
        </div>
      </div>
    </div>
  );
}
