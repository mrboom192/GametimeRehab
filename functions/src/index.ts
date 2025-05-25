import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";
import { logger } from "firebase-functions";

initializeApp();
const firestore = getFirestore();

export const onRoutineCompleted = onDocumentCreated(
  "activities/{id}",
  async (event) => {
    const snap = event.data;
    if (!snap) {
      logger.warn("No data in snapshot");
      return;
    }

    const activityData = snap.data();
    if (!activityData || activityData.type !== "completion") {
      return;
    }

    const actorUid = activityData.actor?.uid;
    if (!actorUid) {
      logger.warn("Activity document missing actor.uid");
      return;
    }

    const userRef = firestore.doc(`users/${actorUid}`);

    try {
      await firestore.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists) {
          logger.warn(`User document for ${actorUid} does not exist`);
          return;
        }

        const userData = userDoc.data() || {};
        const lastActivityTimestamp = userData.lastActivityDate || null;

        // Get today's timestamp range (start of day to end of day)
        const now = Timestamp.now();
        const todayStart = Timestamp.fromDate(new Date());
        todayStart.toDate().setHours(0, 0, 0, 0);
        const todayEnd = Timestamp.fromDate(new Date());
        todayEnd.toDate().setHours(23, 59, 59, 999);

        // If last activity was today, don't increment streak
        let currentStreak = userData.currentStreak || 0;
        if (
          !lastActivityTimestamp ||
          lastActivityTimestamp.toMillis() < todayStart.toMillis()
        ) {
          currentStreak += 1;
        }

        let personalBest = userData.personalBest || 0;
        if (currentStreak > personalBest) {
          personalBest = currentStreak;
        }

        transaction.update(userRef, {
          currentStreak,
          personalBest,
          lastActivityDate: now,
        });
      });

      logger.info(`Updated streak for user ${actorUid}`);
    } catch (error) {
      logger.error("Error updating streak:", error);
    }
  }
);
