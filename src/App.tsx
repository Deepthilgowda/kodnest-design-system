/**
 * KodNest Premium Build System — Layout Shell
 * Demonstrates the global layout structure.
 */

function App() {
  return (
    <div className="kn-layout">
      {/* Top Bar */}
      <header className="kn-topbar">
        <span className="kn-topbar__project">Project Name</span>
        <span className="kn-topbar__progress">Step 1 / 4</span>
        <span className="kn-topbar__status">
          <span className="kn-badge kn-badge--in-progress">In Progress</span>
        </span>
      </header>

      {/* Context Header */}
      <section className="kn-context-header">
        <h1 className="kn-context-header__headline">Context Headline</h1>
        <p className="kn-context-header__subtext">One-line subtext describing the purpose of this step.</p>
      </section>

      {/* Workspace */}
      <main className="kn-workspace">
        <div className="kn-workspace__primary">
          <div className="kn-card">Primary workspace — main product interaction</div>
        </div>
        <aside className="kn-workspace__panel">
          <p className="kn-panel__explanation">Short step explanation goes here.</p>
          <pre className="kn-panel__prompt-box">Copyable prompt content</pre>
          <div className="kn-panel__actions">
            <button type="button" className="kn-btn kn-btn-primary">Copy</button>
            <button type="button" className="kn-btn kn-btn-secondary">Build in Lovable</button>
            <button type="button" className="kn-btn kn-btn-secondary">It Worked</button>
            <button type="button" className="kn-btn kn-btn-secondary">Error</button>
            <button type="button" className="kn-btn kn-btn-secondary">Add Screenshot</button>
          </div>
        </aside>
      </main>

      {/* Proof Footer */}
      <footer className="kn-proof-footer">
        <div className="kn-proof-footer__checklist">
          <label className="kn-checkbox-item">
            <input type="checkbox" />
            <span>UI Built</span>
          </label>
          <label className="kn-checkbox-item">
            <input type="checkbox" />
            <span>Logic Working</span>
          </label>
          <label className="kn-checkbox-item">
            <input type="checkbox" />
            <span>Test Passed</span>
          </label>
          <label className="kn-checkbox-item">
            <input type="checkbox" />
            <span>Deployed</span>
          </label>
        </div>
      </footer>
    </div>
  )
}

export default App
