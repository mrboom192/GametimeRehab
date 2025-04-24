import { View, Text, ScrollView, Linking } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { TextRegular, TextSemiBold } from "@/src/components/StyledText";
import BackButton from "@/src/components/buttons/BackButton";

const Terms = () => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFF" }}
      contentContainerStyle={{
        flexDirection: "column",
        backgroundColor: "#FFF",
        padding: 16,
        paddingBottom: 128,
        gap: 8,
      }}
      overScrollMode="never" // android only
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerShadowVisible: false,
          headerTitle: () => (
            <TextRegular style={{ color: "#2C2C2C", fontSize: 24 }}>
              Terms of Service
            </TextRegular>
          ),
          headerLeft: () => <BackButton />,
        }}
      />
      <TextSemiBold>Terms & Conditions</TextSemiBold>

      <TextRegular style={{ marginTop: 10 }}>
        These terms and conditions apply to the Gametime Rehab app (hereby
        referred to as "Application") for mobile devices that was created by
        Gametime Rehab (hereby referred to as "Service Provider") as a Freemium
        service.
      </TextRegular>

      <TextRegular style={{ marginTop: 10 }}>
        Upon downloading or utilizing the Application, you are automatically
        agreeing to the following terms. It is strongly advised that you
        thoroughly read and understand these terms prior to using the
        Application. Unauthorized copying, modification of the Application, any
        part of the Application, or our trademarks is strictly prohibited. Any
        attempts to extract the source code of the Application, translate the
        Application into other languages, or create derivative versions are not
        permitted. All intellectual property rights related to the Application
        remain the property of the Service Provider.
      </TextRegular>

      <TextRegular style={{ marginTop: 10 }}>
        The Service Provider is dedicated to ensuring that the Application is as
        beneficial and efficient as possible. As such, they reserve the right to
        modify the Application or charge for their services at any time and for
        any reason. Any charges will be clearly communicated.
      </TextRegular>

      <TextRegular style={{ marginTop: 10 }}>
        The Application stores and processes personal data that you have
        provided to deliver the Service. You are responsible for maintaining
        security of your phone and access to the Application. Jailbreaking or
        rooting your device is strongly discouraged as it may expose your phone
        to risks and cause the Application to malfunction.
      </TextRegular>

      <TextRegular style={{ marginTop: 10 }}>
        Please note that the Application uses third-party services that have
        their own Terms and Conditions. See below:
      </TextRegular>

      <TextRegular
        onPress={() => Linking.openURL("https://policies.google.com/terms")}
        style={{ color: "blue" }}
      >
        • Google Play Services
      </TextRegular>
      <TextRegular
        onPress={() =>
          Linking.openURL("https://www.google.com/analytics/terms/")
        }
        style={{ color: "blue" }}
      >
        • Google Analytics for Firebase
      </TextRegular>
      <TextRegular
        onPress={() =>
          Linking.openURL("https://firebase.google.com/terms/crashlytics")
        }
        style={{ color: "blue" }}
      >
        • Firebase Crashlytics
      </TextRegular>
      <TextRegular
        onPress={() => Linking.openURL("https://expo.io/terms")}
        style={{ color: "blue" }}
      >
        • Expo
      </TextRegular>

      <TextRegular style={{ marginTop: 10 }}>
        The Service Provider is not responsible for functionality issues related
        to internet access. You may experience reduced functionality if your
        device lacks Wi-Fi or data coverage.
      </TextRegular>

      <TextRegular style={{ marginTop: 10 }}>
        If using the Application outside a Wi-Fi area, data charges may apply.
        You are responsible for any charges, including roaming fees. If you're
        not the bill payer, permission is assumed.
      </TextRegular>

      <TextRegular style={{ marginTop: 10 }}>
        The Service Provider is not responsible if your device runs out of
        battery and prevents access to the Application.
      </TextRegular>

      <TextRegular style={{ marginTop: 10 }}>
        While the Service Provider strives to keep the Application accurate and
        updated, they rely on third-party data. They accept no liability for
        losses resulting from reliance on such data.
      </TextRegular>

      <TextRegular style={{ marginTop: 10 }}>
        The Application may be updated in the future to comply with changes in
        operating systems. You agree to accept updates when offered. The Service
        Provider may cease providing the Application without notice. If so, you
        must stop using it and delete it from your device.
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>
        Changes to These Terms and Conditions
      </TextSemiBold>
      <TextRegular style={{ marginTop: 10 }}>
        These Terms and Conditions may be updated from time to time. You are
        advised to review this page regularly. Changes will be posted here.
      </TextRegular>

      <TextRegular style={{ marginTop: 10 }}>
        These terms and conditions are effective as of 2025-04-24.
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>Contact Us</TextSemiBold>
      <TextRegular style={{ marginTop: 10 }}>
        If you have any questions or suggestions about the Terms and Conditions,
        please contact the Service Provider at support@gametimerehab.com.
      </TextRegular>
    </ScrollView>
  );
};

export default Terms;
