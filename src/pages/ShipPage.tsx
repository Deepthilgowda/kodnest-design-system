/**
 * Job Notification Tracker — Shipping Page
 * Premium UI for the final production step.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isShippingUnlocked } from '../utils/testStatus';

export function ShipPage() {
    const [isLocked, setIsLocked] = useState(true);

    useEffect(() => {
        setIsLocked(!isShippingUnlocked());

        // Check again on focus
        const handleFocus = () => setIsLocked(!isShippingUnlocked());
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    if (isLocked) {
        return (
            <main className="kn-page">
                <div className="kn-empty-state" style={{ marginTop: 'var(--space-12)' }}>
                    <div className="kn-empty-state__icon" style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🔒</div>
                    <h1 className="kn-empty-state__title">Shipping Locked</h1>
                    <p className="kn-empty-state__message">
                        You must pass all 10 system verification tests before shipping.
                    </p>
                    <Link to="/jt/07-test" className="kn-btn kn-btn-primary" style={{ marginTop: 'var(--space-6)' }}>
                        Go to Test Checklist
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="kn-page">
            <div className="kn-empty-state" style={{ marginTop: 'var(--space-12)' }}>
                <div className="kn-empty-state__icon" style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🚀</div>
                <h1 className="kn-empty-state__title">Ready to Ship</h1>
                <p className="kn-empty-state__message">
                    All systems verified. Your KodJob Portal upgrade is ready for production.
                </p>
                <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
                    <button className="kn-btn kn-btn-primary">Deploy to Vercel</button>
                    <button className="kn-btn kn-btn-secondary">Download Bundle</button>
                </div>
            </div>
        </main>
    );
}
