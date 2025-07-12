import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'stealthKeyLogs'), (snapshot) => {
      const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(entries);
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🛡️ Core Sentinel Dashboard</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id} className="bg-gray-800 p-3 rounded mb-2">
            <strong>Status:</strong> {log.status} <br />
            <strong>Key:</strong> {log.key?.slice(0, 10)}... <br />
            <strong>Time:</strong> {log.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
