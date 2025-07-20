import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6E9",
  },
  topImageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  topImage: {
  width: "100%",
  height: 150,
  borderRadius: 2, 
},
  HelloContainer: {

  },
  HelloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "600",
    color: "black",
    textShadowColor: "#aaa",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  SignInText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 400,
    color: "black",
  },
  inputContainer: {
    backgroundColor: "#FFF6E9",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 35,
    marginTop: 40,
    borderRadius: 20, // стало меньше
    // Тень для iOS
    shadowColor: "#E0B07B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    // Тень для Android
    elevation: 12,
    paddingHorizontal: 10,
    paddingVertical: 8, // чуть больше
  },
  input: {
    height: 20, // увеличено
    width: "80%",
    borderColor: "gray",
    margin: 8,
    paddingHorizontal: 10,
    color: "black",
    fontSize: 16,
    backgroundColor: "transparent",
  },
  ForgotPass: {
    textAlign: "right",
    fontSize: 16,
    fontWeight: 400,
    color: "#A67C52", // тёплый коричневый оттенок
    marginTop: 20,
    marginRight: 35,
  },
  signInContainer: {
    alignItems: "flex-end",
    marginRight: 35,
    marginTop: 24,
  },
  SignInButton: {
    backgroundColor: "#C98A47", // более тёмный тёплый оттенок
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 24,
    // Тень для iOS
    shadowColor: "#A67C52",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    // Тень для Android
    elevation: 8,
  },
  SignInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  SignUpText: {
    marginTop: 100,
    textAlign: "center",
    fontSize: 15,
    fontWeight: 400,
    color: "black",
  },
  LeftVectorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  LeftVectorImage: {
    height: 230,
    width: 150,
  },
  CreateAccountText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "600",
    color: "black",
    textShadowColor: "#aaa",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  topImageSignUpContainer: {
    alignItems: "flex-start",
    marginBottom: 0,
    marginTop: 0,
    justifyContent: "flex-start",
    width: "100%", // чтобы изображение занимало всю ширину
  },
  topSignUpImage: {
  width: "50%",      // задайте нужную ширину
  height: 100,     // задайте нужную высоту
  borderRadius: 2,
  alignSelf: "flex-start", // прижимает к левому краю внутри контейнера
},
  SignUpLeftVectorImageContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  SignUpLeftVectorImage: {
    height: 300,
    width: 200,
    marginBottom: 0, // убирает отступ снизу
    borderRadius: 2, // добавляет скругление
  },
  ForgotPasstopImage: {
    width: "100%",
    height: 150,
    borderRadius: 2, 
},
topImageHomePage: {
  width: "100%",
  height: 190,
  borderRadius: 2,
},
 CardContainer: {
  alignItems: "center",
  width: "100%",
  height: 90,
 },
 cardContainer: {
    width: 200,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    perspective: 1000, // важно для 3D flip
  },
  card: {
    marginTop: 70,
    width: 280,
    height: 300,
    position: "absolute",
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  cardFront: {
    backgroundColor: "#C98A47",
  },
  cardBack: {
    backgroundColor: "#A67C52",
  },
  cardText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "100%",
  },
  containerMyCustomTabbar: {
      flexDirection: "row",
      height: 70,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: "center",
      justifyContent: "space-around",
  },
  MainContainerMyCustomTabbar: {
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  CheackAnswerContainer: {
    alignItems: "center",
    marginTop: 150,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  CheckAnswerButton: {
    backgroundColor: "#C98A47", // более тёмный тёплый оттенок
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 40,
    // Тень для iOS
    shadowColor: "#A67C52",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    // Тень для Android
    elevation: 8,
  },
  CheckButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  AnswerInputContainer: {
    backgroundColor: "#FFF6E9",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 35,
    marginTop: 40,
    borderRadius: 20, // стало меньше
    // Тень для iOS
    shadowColor: "#E0B07B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    // Тень для Android
    elevation: 12,
    paddingHorizontal: 10,
    paddingVertical: 8, // чуть больше
  },
  CardTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default styles;