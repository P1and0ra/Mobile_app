import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import ConfettiCannon from 'react-native-confetti-cannon';
import { animateFlipCard } from "../(auth)/animations";
import styles from "../(auth)/styles";



const FlipCard = () => {
    const flipAnim = useRef(new Animated.Value(0)).current;
    const [flipped, setFlipped] = useState(false);
    const [word, setWord] = useState(null);
    const [correct, setCorrect] = useState(false);
    const [userInput, setUserInput] = useState("")
    const [showCongrats, setShowCongrats] = useState(false);

    const frontInterpolate = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"],
    });
    const backInterpolate = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"],
    });

    useEffect(() => {
        loadRandomWord();
    }, []);


    const loadRandomWord = async () => {
    try {
        const response = await fetch('http://192.168.0.121:8001/random-word');
        const data = await response.json();
        setWord(data);
        setUserInput("");
        setCorrect(false);
    } catch (error) {
        Alert.alert("Failed to load word. Please try again.");
    }
};

    const checkUserAnswer = () => {
        const translate = userInput.trim().toLowerCase();
        if (translate === word.pl.toLowerCase()) {
            setCorrect(true);
            setShowCongrats(true);
            setTimeout(() => {
                setShowCongrats(false);
                ReloadNew();
            }, 4500);
        }
        else {
            Alert.alert("Incorrect")
            ReloadNew();
        }
    }

    const ReloadNew = () => {
        if(flipped) flipCard();
        setTimeout(() => {
            loadRandomWord();
        }, 500);
    }

    const flipCard = () => {
        animateFlipCard(flipAnim, flipped)
        setFlipped(!flipped)
    };
    if (!word) return null;
    

    return (
        <TouchableWithoutFeedback onPress={flipCard}>
            <View style={styles.CardContainer}>
                {/* Конфетти и поздравление */}
            {showCongrats && (
                <>
                    <ConfettiCannon
                        count={200}
                        origin={{ x: -20, y: 0 }}
                        autoStart={true}
                        fadeOut={true}
                        fallSpeed={4000}
                        explosionSpeed={400}
                    />
                </>
            )}
                <Animated.View style={[
                    styles.card,
                    { transform: [{rotateY: frontInterpolate}]},
                    styles.cardFront
                ]}>
                    <View style={styles.CardTextContainer}>
                        <Text style={styles.cardText}>
                            {word.en}
                        </Text>
                    </View>
                </Animated.View>
                <Animated.View style={[
                    styles.card,
                    styles.cardBack,
                    { transform: [{rotateY: backInterpolate}]},

                ]}>
                    <View style={styles.AnswerInputContainer}>
                        <TextInput
                            style={styles.input}
                            value={userInput}
                            onChangeText={setUserInput}
                            placeholder="On Polish..."
                            placeholderTextColor="#ccc"
                        />
                    </View>
                    <View style={styles.CheackAnswerContainer}>
                        <TouchableOpacity onPress={checkUserAnswer} style={styles.CheckAnswerButton}>
                            <Text style={styles.CheckButtonText}>Check</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};
export default FlipCard;