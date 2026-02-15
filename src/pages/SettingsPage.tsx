/**
 * Job Notification Tracker — Settings
 * Placeholder preference fields. No logic yet.
 */

export function SettingsPage() {
  return (
    <main className="kn-settings-page">
      <h1 className="kn-settings-page__heading">Settings</h1>
      <p className="kn-settings-page__subtext">
        Configure your job preferences. Logic will be added in the next step.
      </p>

      <div className="kn-settings-page__form">
        <div className="kn-form-field">
          <label className="kn-form-field__label" htmlFor="role-keywords">
            Role keywords
          </label>
          <input
            id="role-keywords"
            type="text"
            className="kn-input"
            placeholder="e.g. Frontend, React, TypeScript"
            readOnly
            aria-readonly
          />
        </div>

        <div className="kn-form-field">
          <label className="kn-form-field__label" htmlFor="locations">
            Preferred locations
          </label>
          <input
            id="locations"
            type="text"
            className="kn-input"
            placeholder="e.g. New York, Remote"
            readOnly
            aria-readonly
          />
        </div>

        <div className="kn-form-field">
          <label className="kn-form-field__label">Mode</label>
          <div className="kn-form-field__options">
            <label className="kn-form-field__option">
              <input type="radio" name="mode" value="remote" disabled />
              <span>Remote</span>
            </label>
            <label className="kn-form-field__option">
              <input type="radio" name="mode" value="hybrid" disabled />
              <span>Hybrid</span>
            </label>
            <label className="kn-form-field__option">
              <input type="radio" name="mode" value="onsite" disabled />
              <span>Onsite</span>
            </label>
          </div>
        </div>

        <div className="kn-form-field">
          <label className="kn-form-field__label" htmlFor="experience">
            Experience level
          </label>
          <input
            id="experience"
            type="text"
            className="kn-input"
            placeholder="e.g. Mid, Senior, Lead"
            readOnly
            aria-readonly
          />
        </div>
      </div>
    </main>
  );
}
