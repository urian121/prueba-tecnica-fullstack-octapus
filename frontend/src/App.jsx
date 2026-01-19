import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import AlertsInbox from './components/AlertsInbox';
import AlertDetail from './components/AlertDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AlertsInbox />}>
          <Route path="alerts/:id" element={<AlertDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
