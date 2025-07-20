import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { ActivityIndicator, Animated, Image, ImageBackground, Pressable, Text, TextInput, View } from "react-native";
import { animateInputScale } from "./animations";
import styles from "./styles";

const SignUpScreen = () => {
    const router = useRouter();

    const usernameScale = useRef(new Animated.Value(1)).current;
    const passwordScale = useRef(new Animated.Value(1)).current;
    const emailScale = useRef(new Animated.Value(1)).current;

    const [UserName, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [loading, setLoading] = useState(false); // состояние загрузки

    //Функция отправки данных на сервер
    const handleRegister = async () => {
        setLoading(true); // показать Loader
        try {
            const response = await fetch("http://192.168.0.121:8001/register", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    username: UserName,
                    password: Password,
                    email: Email,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Registration successful!");
                router.push("/(auth)");
            }
            else {
                alert("Registration failed: " + data.message);
            }
        } catch (e) {
            alert("Error on server side: " + e.message);
        } finally {
            setLoading(false); // скрыть Loader
        }
    };

    return (
        <View style={styles.container}>
            {/* Loader поверх всего */}
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
            <View style={styles.topImageSignUpContainer}>
                <Image
                    source={require("./assets/Vector4.png")}
                    style={styles.topSignUpImage}
                />
            </View>
            <View style={styles.HelloContainer}>
                <Text style={styles.CreateAccountText}>Create account! </Text>
            </View>
            <View style={styles.inputContainer}>
                <FontAwesome5
                    name="user"
                    size={17}
                    color="gray"
                />
                <Animated.View style={{ flex:1, alignItems: "center" ,transform: [{ scale: usernameScale }] }}>    
                    <TextInput
                        placeholder="Username"
                        value={UserName}
                        onChangeText={setUsername}
                        style={styles.input}
                        placeholderTextColor="#A67C52" // тёплый коричневый оттенок для placeholder
                        onFocus={() => animateInputScale(usernameScale, true)}
                        onBlur={() => animateInputScale(usernameScale, false)}
                    />
                </Animated.View>
            </View>
            <View style={styles.inputContainer}>
                <FontAwesome5
                    name="lock"
                    size={17}
                    color="gray"
                />
                <Animated.View style={{ flex:1, alignItems: "center" ,transform: [{ scale: passwordScale }] }}>
                    <TextInput
                        placeholder="Password"
                        value={Password}
                        onChangeText={setPassword}
                        style={styles.input}
                        placeholderTextColor="#A67C52" // тёплый коричневый оттенок для placeholder
                        onFocus={() => { animateInputScale(passwordScale, true); }}
                        onBlur={() => { animateInputScale(passwordScale, false); }}
                    />
                </Animated.View> 
            </View>
            <View style={styles.inputContainer}>
                <FontAwesome5
                    name="envelope"
                    size={17}
                    color="gray"
                />
                <Animated.View style={{ flex:1, alignItems: "center" ,transform: [{ scale: emailScale }] }}>
                    <TextInput
                        placeholder="E-Mail"
                        value={Email}
                        onChangeText={setEmail}
                        style={styles.input}
                        placeholderTextColor="#A67C52" // тёплый коричневый оттенок для placeholder
                        onFocus={() => animateInputScale(emailScale, true)}
                        onBlur={() => animateInputScale(emailScale, false)}
                    />
                </Animated.View>
            </View>
            <View style={styles.signInContainer}>
                <View style={styles.SignInButton}>
                    <Pressable onPress={handleRegister}>
                        <Text style={styles.SignInButtonText}>Create</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 24 }}>
                <Text style={styles.SignUpText}>Already have an account? </Text>
                <Pressable onPress={() => router.push("/(auth)")}>
                    <Text style={[styles.SignUpText, {textDecorationLine: "underline", color: "#A67C52"}]}>Sign in</Text>
                </Pressable>
            </View>
            <View style={styles.SignUpLeftVectorImageContainer}>
                <ImageBackground source={require("./assets/Vector5.png")} style={styles.SignUpLeftVectorImage}/>
            </View>
        </View>
    );
}

export default SignUpScreen;