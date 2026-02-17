import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isShippingUnlocked, getShipStatus } from '../utils/testStatus';
import type { ShipStatus } from '../utils/testStatus';

export function ShipPage() {
    const [isLocked, setIsLocked] = useState(true);
    const [status, setStatus] = useState<ShipStatus>('Not Started');

    useEffect(() => {
        setIsLocked(!isShippingUnlocked());
        setStatus(getShipStatus());

        const handleFocus = () => {
            setIsLocked(!isShippingUnlocked());
            setStatus(getShipStatus());
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const statusColors = {
        'Not Started': 'var(--color-text-muted)',
        'In Progress': 'var(--color-warning)',
        'Shipped': 'var(--color-success)'
    };

    return (
        <section className="kn-container">
            <header className="kn-page__header" style={{ marginBottom: 'var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                <div>
                    <h1 className="kn-page__heading">Project Shipping</h1>
                    <p className="kn-page__subheading">Final deployment and verification status.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Status</p>
                    <span
                        className="kn-badge"
                        style={{
                            fontSize: '1rem',
                            padding: '6px 16px',
                            backgroundColor: 'transparent',
                            border: `1px solid ${statusColors[status]}`,
                            color: statusColors[status]
                        }}
                    >
                        {status}
                    </span>
                </div>
            </header>

            {isLocked ? (
                <div className="kn-empty-state" style={{ marginTop: 'var(--space-6)' }}>
                    <div className="kn-empty-state__icon" style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🔒</div>
                    <h1 className="kn-empty-state__title">Shipping Locked</h1>
                    <p className="kn-empty-state__message">
                        You must pass all 10 system verification tests AND provide all 3 project links in the Proof page before shipping.
                    </p>
                    <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/jt/07-test" className="kn-btn kn-btn-secondary">
                            Go to Test Checklist
                        </Link>
                        <Link to="/proof" className="kn-btn kn-btn-primary">
                            Go to Proof Page
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="kn-empty-state" style={{ marginTop: 'var(--space-6)' }}>
                    <div className="kn-empty-state__icon" style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🚀</div>
                    <h1 className="kn-empty-state__title">Ready to Ship</h1>
                    <p className="kn-empty-state__message">
                        All systems verified. Your KodJob Portal upgrade is ready for production.
                    </p>

                    <div className="kn-banner kn-banner--success" style={{ margin: 'var(--space-6) auto 0', maxWidth: '400px', textAlign: 'center' }}>
                        <p className="kn-banner__text" style={{ fontWeight: 600 }}>Project 1 Shipped Successfully.</p>
                    </div>

                    <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="kn-btn kn-btn-primary">Deploy to Vercel</button>
                        <button className="kn-btn kn-btn-secondary">Download Bundle</button>
                    </div>
                </div>
            )}
        </section>
    );
}
