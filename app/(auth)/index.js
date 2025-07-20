import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Image, ImageBackground, Pressable, Text, TextInput, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { animateInputScale } from "./animations";
import styles from "./styles"; // Предполагается, что стили находятся в файле styles.js


const LoginScreen = () => {
  const router = useRouter();
  const usernameScale = useRef(new Animated.Value(1)).current;
  const passwordScale = useRef(new Animated.Value(1)).current;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.0.121:8001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ username, password})
      });
      const data = await response.json();
      if (response.ok) {
        router.push("/(auth)/HomeScreens/HomePage");
      }
      else {
        alert(data.message || "Login failed");
      }
    } catch (e) {
      alert("Server error");
    } finally {
      setLoading(false)
    }
   };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require("./assets/Vector1.png")}
          style={styles.topImage}
        />
      </View>
      <View style={styles.HelloContainer}>
        <Text style={styles.HelloText}>Hello</Text>
      </View>
      <View>
        <Text style={styles.SignInText}>Sign in to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5
          name="user"
          size={17}
          color="gray"
        />
        <Animated.View style={{ flex: 1, alignItems: "center", transform: [{ scale: usernameScale }] }}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#A67C52" // тёплый коричневый оттенок для placeholder
            onFocus={() => animateInputScale(usernameScale, true)}
            onBlur={() => animateInputScale(usernameScale, false)}
          />
        </Animated.View>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <FontAwesome5
            name="lock"
            size={17}
            color="gray"
          />
          <Animated.View style={{ flex: 1, alignItems: "center", transform: [{ scale: passwordScale }] }}>  
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#A67C52" // тёплый коричнеыывый оттенок для placeholder
              onFocus={() => animateInputScale(passwordScale, true)}
              onBlur={() => animateInputScale(passwordScale, false)}
            />
          </Animated.View>
        </View>
      </View>
      <View>
        <Pressable onPress={() => router.push("/(auth)/ForgotPasswordScreen")}>  
          <Text style={styles.ForgotPass}>Forgot your password?</Text>
        </Pressable>
      </View>
      <View style={styles.signInContainer}>
          <View style={styles.SignInButton}>
          <Pressable onPress={handleLogin}>
            <Text style={styles.SignInButtonText}>Sign in!</Text>
          </Pressable>
          </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 24 }}>
        <Text style={styles.SignUpText}> Don`t have an account? </Text>
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
}



export default LoginScreen;
