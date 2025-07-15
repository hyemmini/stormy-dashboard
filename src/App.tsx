import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import KpiDetailPage from './pages/KpiDetailPage';
import IssueAnalysisPage from './pages/IssueAnalysisPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="kpi/:kpiId" element={<KpiDetailPage />} />
        <Route path="issue-analysis" element={<IssueAnalysisPage />} />
      </Route>
    </Routes>
  );
};

export default App;
