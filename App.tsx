
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';
import { TOOLS } from './constants/tools';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {TOOLS.map((tool) => (
            <Route
              key={tool.id}
              path={tool.path}
              element={<ToolPage tool={tool} />}
            />
          ))}
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
