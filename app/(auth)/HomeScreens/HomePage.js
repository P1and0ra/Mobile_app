import { Image, View } from "react-native";
import FlipCard from "../../commponents/._Flip_card";
import styles from "../styles";



const HomePageScreen = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require("../assets/Vector9.png")} 
                    style={styles.topImageHomePage}
                />
            </View>
            <View style={styles.CardContainer}>
                <View>
                    <FlipCard/>
                </View>
            </View>
        </View>
    );
};

export default HomePageScreen;