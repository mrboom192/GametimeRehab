import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function SignupScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-4">
      <Text className="text-black text-2xl font-bold text-center mb-4">
        Create Your Account
      </Text>
      <Text className="text-slate-500 text-center text-base mb-8">
        Create your Gametime Rehab account to start. Athletes follow recovery
        programs, and trainers curate them—track progress and collaborate
        seamlessly.
      </Text>

      <Link href="/athlete-signup" asChild>
        <Pressable className="bg-slate-300 rounded-lg w-4/5 py-3 items-center mb-4">
          <Text className="text-black text-lg font-bold">Athlete</Text>
        </Pressable>
      </Link>
      <Link href="/trainer-signup" asChild>
        <Pressable className="bg-slate-300 rounded-lg w-4/5 py-3 items-center">
          <Text className="text-black text-lg font-bold">Trainer</Text>
        </Pressable>
      </Link>
    </View>
  );
}
