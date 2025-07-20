import { Animated } from "react-native";

/**
 * Анимация увеличения поля ввода при фокусе и возврата к исходному размеру при потере фокуса.
 * @param {Animated.Value} animatedValue - Animated.Value для поля ввода
 * @param {boolean} focused - true если фокус, false если блюр
 */
export const animateInputScale = (animatedValue, focused) => {
  Animated.spring(animatedValue, {
    toValue: focused ? 1.2 : 1,
    useNativeDriver: true,
  }).start();
};

/**
 * Анимация переворота карточки (flip card)
 * @param {Animated.Value} flipAnim - Animated.Value для flip
 * @param {boolean} flipped - текущее состояние (true/false)
 */
export const animateFlipCard = (flipAnim, flipped) => {
  Animated.spring(flipAnim, {
    toValue: flipped ? 0 : 180,
    useNativeDriver: true,
    friction: 8,
    tension: 10,
  }).start();
};

// ...existing code...

/**
 * Анимация увеличения/уменьшения иконки таббара
 * @param {Animated.Value} scaleAnim - Animated.Value для иконки
 * @param {boolean} focused - true если таб активен
 */
export const animateTabIcon = (scaleAnim, focused) => {
  Animated.spring(scaleAnim, {
    toValue: focused ? 1.2 : 1,
    useNativeDriver: true,
  }).start();
};
