import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_left", // вот здесь slide!
        gestureEnabled: true,
        headerShown: false, // скрыть заголовок
      }}
    />
  );
}
