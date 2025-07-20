import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { animateTabIcon } from "../animations"; // если используете анимацию
import styles from "../styles";

function MyCustomTabBar({ state, descriptors, navigation }) {
  
  // Массив Animated.Value для каждой иконки
  const scales = useRef(state.routes.map((_, i) => new Animated.Value(state.index === i ? 1.2 : 1))).current;

  useEffect(() => {
    state.routes.forEach((_, i) => {
      if (typeof animateTabIcon === "function") {
        animateTabIcon(scales[i], state.index === i);
      }
    });
  }, [state.index]);

  return (
    <View style={ styles.MainContainerMyCustomTabbar}>
      <LinearGradient 
      colors={['#e8d4a5', '#d8a77d', '#c58b9a', '#a57fb8', '#8b95c9']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={ styles.containerMyCustomTabbar}>
        
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          let iconName = "home";
          if (route.name === "Settings") iconName = "settings";
          if (route.name === "AccountPage") iconName = "person";

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={{ alignItems: "center" }}
            >
              {scales
                ? <Animated.View style={{ transform: [{ scale: scales[index] }] }}>
                    <Ionicons
                      name={iconName}
                      size={20}
                      color={isFocused ? "#C98A47" : "white"}
                    />
                  </Animated.View>
                : <Ionicons
                    name={iconName}
                    size={29}
                    color={isFocused ? "#C98A47" : "white"}
                  />
              }
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </View>
  );
}

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "fade"
      }}
      tabBar={props => <MyCustomTabBar {...props} />}
    />
  );
}