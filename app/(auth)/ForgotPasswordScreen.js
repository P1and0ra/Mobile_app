import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { ActivityIndicator, Animated, Image, ImageBackground, Pressable, Text, TextInput, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { animateInputScale } from "./animations";
import styles from "./styles";

const ForgotPassScreen = () => {
  const router = useRouter();

  // Анимации
  const usernameScale = useRef(new Animated.Value(1)).current;
  const passwordScale = useRef(new Animated.Value(1)).current;

  // Состояния
  const [step, setStep] = useState("email"); // email -> code -> password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Отправка письма с кодом
  const handleSendEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.0.121:8001/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Verification code sent to your email!");
        setStep("code");
      } else {
        alert(data.message || "Error");
      }
    } catch (e) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  // Проверка кода
  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.0.121:8001/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Code verified! Now set a new password.");
        setStep("password");
      } else {
        alert(data.message || "Invalid code");
      }
    } catch (e) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  // Смена пароля
  const handleChangePassword = async () => {
    if (newPassword !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://192.168.0.121:8001/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Password changed! Now you can log in.");
        router.push("/(auth)");
      } else {
        alert(data.message || "Error");
      }
    } catch (e) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(255,255,255,0.5)",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}>
          <ActivityIndicator size="large" color="#A67C52" />
        </View>
      )}

      <View style={styles.topImageContainer}>
        <Image
          source={require("./assets/Vector8.png")}
          style={styles.ForgotPasstopImage}
        />
      </View>
      <View style={styles.HelloContainer}>
        <Text style={styles.HelloText}>Gutten Tag</Text>
      </View>
      <View>
        <Text style={styles.SignInText}>Recover your Password</Text>
      </View>

      {/* Шаг 1: Ввод email */}
      {step === "email" && (
        <>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="envelope" size={17} color="gray" />
            <Animated.View style={{ flex: 1, alignItems: "center", transform: [{ scale: usernameScale }] }}>
              <TextInput
                placeholder="Your E-Mail"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor="#A67C52"
                keyboardType="email-address"
                onFocus={() => animateInputScale(usernameScale, true)}
                onBlur={() => animateInputScale(usernameScale, false)}
              />
            </Animated.View>
          </View>
          <View style={styles.signInContainer}>
            <View style={styles.SignInButton}>
              <Pressable onPress={handleSendEmail}>
                <Text style={styles.SignInButtonText}>Send code</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}

      {/* Шаг 2: Ввод кода */}
      {step === "code" && (
        <>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="key" size={17} color="gray" />
            <Animated.View style={{ flex: 1, alignItems: "center", transform: [{ scale: usernameScale }] }}>
              <TextInput
                placeholder="Verification code"
                value={code}
                onChangeText={setCode}
                style={styles.input}
                placeholderTextColor="#A67C52"
                keyboardType="numeric"
                onFocus={() => animateInputScale(usernameScale, true)}
                onBlur={() => animateInputScale(usernameScale, false)}
              />
            </Animated.View>
          </View>
          <View style={styles.signInContainer}>
            <View style={styles.SignInButton}>
              <Pressable onPress={handleVerifyCode}>
                <Text style={styles.SignInButtonText}>Verify</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}

      {/* Шаг 3: Новый пароль */}
      {step === "password" && (
        <>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={17} color="gray" />
            <Animated.View style={{ flex: 1, alignItems: "center", transform: [{ scale: usernameScale }] }}>
              <TextInput
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.input}
                placeholderTextColor="#A67C52"
                secureTextEntry
                onFocus={() => animateInputScale(usernameScale, true)}
                onBlur={() => animateInputScale(usernameScale, false)}
              />
            </Animated.View>
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={17} color="gray" />
            <Animated.View style={{ flex: 1, alignItems: "center", transform: [{ scale: passwordScale }] }}>
              <TextInput
                placeholder="Repeat Password"
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                style={styles.input}
                placeholderTextColor="#A67C52"
                secureTextEntry
                onFocus={() => animateInputScale(passwordScale, true)}
                onBlur={() => animateInputScale(passwordScale, false)}
              />
            </Animated.View>
          </View>
          <View style={styles.signInContainer}>
            <View style={styles.SignInButton}>
              <Pressable onPress={handleChangePassword}>
                <Text style={styles.SignInButtonText}>Apply!</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}

      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 24 }}>
        <Text style={styles.SignUpText}>Don't have an account? </Text>
        <Pressable onPress={() => router.push("/(auth)/SignUpScreen")}>
          <Text style={[styles.SignUpText, { textDecorationLine: "underline", color: "#A67C52" }]}>
            Create
          </Text>
        </Pressable>
      </View>
      <View style={styles.LeftVectorContainer}>
        <ImageBackground source={require("./assets/Vector3.png")} style={styles.LeftVectorImage} />
      </View>
    </View>
  );
};

export default ForgotPassScreen;