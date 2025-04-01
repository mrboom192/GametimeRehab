import { Text, ScrollView, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { Calendar } from "react-native-calendars";
import AchievementsCard from "@/src/components/AchievementsCard";
import RecoveryProgressBar from "@/src/components/RecoveryProgressBar";
import { useUser } from "@/src/contexts/UserContext";
import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { formatDistanceToNow } from "date-fns";
import Colors from "@/src/constants/Colors";

const Progress = () => {
  const [selected, setSelected] = useState("");
  const [activities, setActivities] = useState<any>([]);

  const { data } = useUser(); // contains current user info

  useEffect(() => {
    if (!data?.uid) return;

    const activityRef = collection(db, "activities");

    const q = query(
      activityRef,
      or(
        where("actorId", "==", data.uid),
        where("assigneeIds", "array-contains", data.uid)
      )
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => {
          // Sort by date first, so that stuff appears in order. Change to use firebase indexing later
          const aDate = (a as any).createdAt?.toDate?.()?.getTime?.() || 0;
          const bDate = (b as any).createdAt?.toDate?.()?.getTime?.() || 0;
          return bDate - aDate; // descending
        });
      setActivities(results);
    });

    return () => unsubscribe();
  }, [data?.uid]);

  // On calendar: black means they login and complete any assignment, outline means you skipped, multiple black days in a row would be a streak
  // Show 4 most recent achievements on achievements card

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFF" }}
      contentContainerClassName="flex-col bg-white p-5 gap-8"
    >
      <Tabs.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Text className="text-[#2C2C2C] text-4xl">Progress</Text>
          ),
        }}
      />

      {activities.map((activity: any) => {
        if (activity.type === "completion") {
          return (
            <CompletionActivityMessage
              key={activity.id}
              activity={activity}
              currentUserId={data.uid}
            />
          );
        }
      })}

      {/* <AchievementsCard />

      <Calendar
        // Customize the appearance of the calendar
        onDayPress={(day: { dateString: React.SetStateAction<string> }) => {
          setSelected(day.dateString);
        }}
        // Specify the current date
        // Callback that gets called when the user selects a day
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: "orange",
          },
        }}
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",
          todayBackgroundColor: "#F2754E",
          todayTextColor: "#FFF",
          // textSectionTitleColor: "#b6c1cd",
          // textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#27272A",
          selectedDayTextColor: "#FFF",
          // todayTextColor: "#00adf5",
          // dayTextColor: "#2d4150",
          // textDisabledColor: "#d9e1e8",
          // dotColor: "#00adf5",
          // selectedDotColor: "#ffffff",
          // arrowColor: "orange",
          // disabledArrowColor: "#d9e1e8",
          // monthTextColor: "blue",
          // indicatorColor: "blue",
          // textDayFontFamily: "monospace",
          // textMonthFontFamily: "monospace",
          // textDayHeaderFontFamily: "monospace",
          // textDayFontWeight: "300",
          // textMonthFontWeight: "bold",
          // textDayHeaderFontWeight: "300",
          // textDayFontSize: 16,
          // textMonthFontSize: 16,
          // textDayHeaderFontSize: 16,
        }}
      />
      <RecoveryProgressBar progress={23} color="#6F6E6E" />
      <RecoveryProgressBar
        progress={30}
        color="#78B16C"
        title="Current recovery pace"
      /> */}
    </ScrollView>
  );
};

export default Progress;

const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  } else if (seconds < 3600) {
    const mins = Math.round(seconds / 60);
    return `${mins} minute${mins !== 1 ? "s" : ""}`;
  } else {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.round((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  }
};

const CompletionActivityMessage: React.FC<{
  activity: any;
  currentUserId: string;
}> = ({ activity, currentUserId }) => {
  const actorName = `${activity.actor.firstName} ${activity.actor.lastName}`;
  const displayName = currentUserId === activity.actorId ? "You" : actorName;

  const timeAgo = formatDistanceToNow(
    activity.createdAt?.toDate?.() || new Date(),
    { addSuffix: true }
  );

  const start = activity.startedAt?.toDate?.();
  const end = activity.endedAt?.toDate?.();
  let durationText = "";

  if (start && end) {
    const secondsElapsed = Math.round((end.getTime() - start.getTime()) / 1000);
    durationText = formatDuration(secondsElapsed);
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderColor: Colors.faintGrey,
      }}
    >
      <Image
        source={{ uri: activity.actor.image }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 9999,
          marginRight: 10,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "dm" }}>
          <Text style={{ fontFamily: "dm-sb" }}>{displayName}</Text> completed{" "}
          <Text style={{ fontFamily: "dm-sb" }}>{activity.routineName}</Text>,
          lasting about {durationText}.
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "dm",
            color: Colors.grey2,
            marginTop: 4,
          }}
        >
          {timeAgo}
        </Text>
      </View>
    </View>
  );
};
