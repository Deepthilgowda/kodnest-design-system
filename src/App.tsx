/**
 * Job Notification Tracker — Route Shell
 * KodNest Premium Build System
 * Routes: / | /dashboard | /saved | /digest | /settings | /proof
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TopNav } from './components/TopNav';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { SavedPage } from './pages/SavedPage';
import { DigestPage } from './pages/DigestPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProofPage } from './pages/ProofPage';

function App() {
  return (
    <BrowserRouter>
      <div className="kn-layout kn-layout--job-tracker">
        <TopNav />
        <div className="kn-layout__content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/digest" element={<DigestPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/proof" element={<ProofPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
