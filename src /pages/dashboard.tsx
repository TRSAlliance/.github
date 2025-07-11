// /src/pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [loading, user]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'coldVeilLogs'));
      return onSnapshot(q, (snap) =>
        setLogs(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">TRS/ColdVeil Dashboard</h1>
      <button
        onClick={() => auth.signOut()}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
      <div className="mt-6 space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="bg-white p-4 shadow rounded">
            <p><strong>User:</strong> {log.userId}</p>
            <p><strong>Action:</strong> {log.action}</p>
            <p><strong>Metadata:</strong> {JSON.stringify(log.metadata)}</p>
            <p><strong>Time:</strong> {new Date(log.timestamp.toDate()).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
