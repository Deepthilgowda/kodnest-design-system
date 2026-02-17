/**
 * Job Notification Tracker — Test Checklist
 * Premium UI to verify features before shipping.
 */

import { useState, useEffect } from 'react';
import { TEST_ITEMS, TOTAL_TESTS, getPassedTestIds, setTestItemStatus, resetAllTests } from '../utils/testStatus';

export function TestPage() {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    useEffect(() => {
        setCheckedItems(getPassedTestIds());
    }, []);

    const toggleItem = (id: string) => {
        const isChecked = checkedItems.includes(id);
        setTestItemStatus(id, !isChecked);
        setCheckedItems(getPassedTestIds());
    };

    const resetTests = () => {
        if (window.confirm('Are you sure you want to reset all test progress?')) {
            resetAllTests();
            setCheckedItems([]);
        }
    };

    const passCount = checkedItems.length;
    const isAllPassed = passCount === TOTAL_TESTS;

    return (
        <section className="kn-container">
            <header className="kn-page__header" style={{ marginBottom: 'var(--space-6)' }}>
                <h1 className="kn-page__heading">System Verification</h1>
                <div className={`kn-banner ${isAllPassed ? 'kn-banner--success' : 'kn-banner--warning'}`} style={{ marginTop: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                        <div>
                            <p className="kn-banner__text" style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                                Tests Passed: {passCount} / {TOTAL_TESTS}
                            </p>
                            {!isAllPassed && (
                                <p className="kn-banner__text" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                    Resolve all issues before shipping.
                                </p>
                            )}
                        </div>
                        <button className="kn-btn kn-btn--sm kn-btn-secondary" onClick={resetTests}>
                            Reset Test Status
                        </button>
                    </div>
                </div>
            </header>

            <div className="kn-digest-card" style={{ overflow: 'visible', maxWidth: '800px', width: '100%' }}>
                <div className="kn-digest-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {TEST_ITEMS.map((item) => (
                        <div key={item.id} className="kn-digest-item" style={{ padding: 'var(--space-4)', position: 'relative', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', width: '100%' }}>
                                <input
                                    type="checkbox"
                                    id={item.id}
                                    checked={checkedItems.includes(item.id)}
                                    onChange={() => toggleItem(item.id)}
                                    style={{ width: '20px', height: '20px', cursor: 'pointer', flexShrink: 0 }}
                                />
                                <label
                                    htmlFor={item.id}
                                    style={{
                                        fontSize: '1.05rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        color: checkedItems.includes(item.id) ? 'var(--color-text-muted)' : 'var(--color-text)',
                                        textDecoration: checkedItems.includes(item.id) ? 'line-through' : 'none',
                                        flex: 1
                                    }}
                                >
                                    {item.label}
                                </label>

                                <div className="kn-test-tooltip-container" style={{ position: 'relative', display: 'inline-flex' }}>
                                    <span
                                        className="kn-test-info-icon"
                                        style={{
                                            cursor: 'help',
                                            color: 'var(--color-primary)',
                                            fontSize: '0.8rem',
                                            width: '20px',
                                            height: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '50%',
                                            border: '1px solid var(--color-primary)',
                                            opacity: 0.7
                                        }}
                                    >
                                        i
                                    </span>
                                    <div className="kn-test-tooltip">
                                        <strong>How to test:</strong><br />
                                        {item.howTo}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
