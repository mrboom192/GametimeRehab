import { View, Text, ScrollView, Linking } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import BackButton from "@/src/components/buttons/BackButton";
import { TextRegular, TextSemiBold } from "@/src/components/StyledText";
import Colors from "@/src/constants/Colors";

const PrivacyPolicy = () => {
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
              Privacy Policy
            </TextRegular>
          ),
          headerLeft: () => <BackButton />,
        }}
      />
      <TextSemiBold>Privacy Policy</TextSemiBold>
      <TextRegular>
        This privacy policy applies to the Gametime Rehab app (hereby referred
        to as "Application") for mobile devices that was created by Gametime
        Rehab (hereby referred to as "Service Provider") as a Freemium service.
        This service is intended for use "AS IS".
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>
        Information Collection and Use
      </TextSemiBold>
      <TextRegular>
        The Application collects information when you download and use it. This
        information may include:
      </TextRegular>
      <TextRegular>
        {"\u2022"} Your device's Internet Protocol address (e.g., IP address)
      </TextRegular>
      <TextRegular>
        {"\u2022"} The pages of the Application that you visit, the time and
        date of your visit, the time spent on those pages
      </TextRegular>
      <TextRegular>{"\u2022"} The time spent on the Application</TextRegular>
      <TextRegular>
        {"\u2022"} The operating system you use on your mobile device
      </TextRegular>
      <TextRegular style={{ marginTop: 10 }}>
        The Application does not gather precise information about the location
        of your mobile device.
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>
        Use of Collected Information
      </TextSemiBold>
      <TextRegular>
        The Service Provider may use the information you provide to contact you
        occasionally with important information, required notices, and marketing
        promotions.
      </TextRegular>
      <TextRegular>
        For a better experience, while using the Application, the Service
        Provider may require you to provide certain personally identifiable
        information, including but not limited to email, name, gender, and phone
        number. This information will be retained and used as described in this
        Privacy Policy.
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>Third Party Access</TextSemiBold>
      <TextRegular>
        Only aggregated, anonymized data is periodically transmitted to external
        services to aid the Service Provider in improving the Application and
        their service. The Service Provider may share your information with
        third parties in the ways described in this privacy statement.
      </TextRegular>

      <TextRegular style={{ marginTop: 10 }}>
        The Application utilizes third-party services with their own Privacy
        Policies:
      </TextRegular>
      <TextRegular
        onPress={() =>
          Linking.openURL("https://www.google.com/policies/privacy/")
        }
        style={{ color: "blue" }}
      >
        • Google Play Services
      </TextRegular>
      <TextRegular
        onPress={() =>
          Linking.openURL("https://firebase.google.com/support/privacy")
        }
        style={{ color: "blue" }}
      >
        • Google Analytics for Firebase
      </TextRegular>
      <TextRegular
        onPress={() =>
          Linking.openURL("https://firebase.google.com/support/privacy/")
        }
        style={{ color: "blue" }}
      >
        • Firebase Crashlytics
      </TextRegular>
      <TextRegular
        onPress={() => Linking.openURL("https://expo.io/privacy")}
        style={{ color: "blue" }}
      >
        • Expo
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>
        Disclosure of Information
      </TextSemiBold>
      <TextRegular>
        The Service Provider may disclose User Provided and Automatically
        Collected Information:
      </TextRegular>
      <TextRegular>
        {"\u2022"} As required by law (e.g., subpoena or legal process)
      </TextRegular>
      <TextRegular>
        {"\u2022"} When disclosure is necessary to protect rights, safety,
        investigate fraud, or respond to a request
      </TextRegular>
      <TextRegular>
        {"\u2022"} With trusted service providers who operate on our behalf and
        adhere to this privacy policy
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>Opt-Out Rights</TextSemiBold>
      <TextRegular>
        You can stop all collection of information by uninstalling the
        Application through your device’s standard uninstall process.
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>
        Data Retention Policy
      </TextSemiBold>
      <TextRegular>
        The Service Provider will retain User Provided data for as long as you
        use the Application and for a reasonable time thereafter. To request
        data deletion, contact support@gametimerehab.com.
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>Children</TextSemiBold>
      <TextRegular>
        The Application does not address anyone under the age of 13. The Service
        Provider does not knowingly collect personally identifiable information
        from children under 13. If such information is discovered, it will be
        deleted immediately. Parents or guardians should contact
        support@gametimerehab.com if they believe a child has provided personal
        information.
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>Security</TextSemiBold>
      <TextRegular>
        The Service Provider is committed to safeguarding your information
        through physical, electronic, and procedural safeguards.
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>Changes</TextSemiBold>
      <TextRegular>
        This Privacy Policy may be updated periodically. Continued use of the
        Application implies consent to any changes. Check this page regularly
        for updates.
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>Your Consent</TextSemiBold>
      <TextRegular>
        By using the Application, you consent to the processing of your
        information as outlined in this Privacy Policy.
      </TextRegular>

      <TextSemiBold style={{ marginTop: 20 }}>Contact Us</TextSemiBold>
      <TextRegular>
        If you have any questions about this Privacy Policy, contact the Service
        Provider at support@gametimerehab.com.
      </TextRegular>
    </ScrollView>
  );
};

export default PrivacyPolicy;
