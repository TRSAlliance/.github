// /src/pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch ColdVeil logs in real-time
  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'coldVeilLogs'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const logData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLogs(logData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">TRS/ColdVeil Operator Dashboard</h1>
        <button
          onClick={() => auth.signOut()}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </header>
      <main className="p-6">
        <h2 className="text-xl mb-4">Welcome, {user.email}</h2>
        <section>
          <h3 className="text-lg font-bold">Action Logs</h3>
          <ul className="space-y-2">
            {logs.map((log) => (
              <li key={log.id} className="p-4 bg-white rounded shadow">
                <p>
                  <strong>User:</strong> {log.userId}
                </p>
                <p>
                  <strong>Action:</strong> {log.action}
                </p>
                <p>
                  <strong>Timestamp:</strong>{' '}
                  {new Date(log.timestamp.toDate()).toLocaleString()}
                </p>
                <p>
                  <strong>Metadata:</strong> {JSON.stringify(log.metadata)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
