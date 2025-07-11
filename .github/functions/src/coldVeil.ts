import * as functions from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';
import * as cors from 'cors';

const corsHandler = cors({ origin: true });

export const logColdVeilAction = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const { userId, action, metadata = {} } = req.body;

    if (!userId || !action) {
      res.status(400).send('Missing userId or action');
      return;
    }

    const db = getFirestore();

    try {
      await db.collection('coldVeilLogs').add({
        userId,
        action,
        metadata,
        timestamp: new Date(),
      });
      res.status(200).send('Action logged');
    } catch (error) {
      console.error('Logging error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});
