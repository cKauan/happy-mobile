import React from "react";
import OnBoarding from "react-native-onboarding-swiper";
import { Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import EarthImage from "../assets/earth.png";
import KidsImage from "../assets/kids.png";
import { useNavigation } from "@react-navigation/native";

const OnBoardingScreen = () => {
    const navigation = useNavigation();

    async function handleDoneOnBoarding() {
        try {
            await AsyncStorage.setItem("onboarding_done", "true");
            navigation.navigate("OrphanagesMap");
        } catch (err) {
            // saving error
            console.log(err);
        }
    }

    return (
        <OnBoarding
            NextButtonComponent={NextButton}
            SkipButtonComponent={skipButton}
            DoneButtonComponent={doneButton}
            onDone={handleDoneOnBoarding}
            onSkip={handleDoneOnBoarding}
            containerStyles={{
                justifyContent: "space-evenly",
                maxHeight: "100%",
                alignItems: "center",
            }}
            bottomBarHeight={100}
            bottomBarColor="#F2F3F5"
            controlStatusBar={false}
            imageContainerStyles={styles.imageContainer}
            pages={[
                {
                    backgroundColor: "#F2F3F5",
                    image: <Image source={EarthImage} />,
                    title: "Leve felicidade para o mundo",
                    titleStyles: styles.titleStyles,
                    subTitleStyles: styles.subTitleStyles,
                    subtitle:
                        "Visite orfanatos e mude o dia de muitas crianças.",
                },
                {
                    backgroundColor: "#F2F3F5",
                    image: (
                        <Image source={KidsImage} style={{ marginTop: 25 }} />
                    ),
                    title: "Escolha um orfanato no mapa e faça uma visita",
                    titleStyles: styles.secondTitleStyles,
                    subtitle: "",
                },
            ]}
        />
    );
};

const NextButton = ({ ...props }) => {
    return (
        <RectButton style={styles.controlButton} {...props}>
            <Feather name="arrow-right" size={20} color="#15B6D6" />
        </RectButton>
    );
};
const skipButton = ({ ...props }) => {
    return (
        <RectButton style={styles.controlButton} {...props}>
            <Feather name="x" size={20} color="#15B6D6" />
        </RectButton>
    );
};
const doneButton = ({ ...props }) => {
    return (
        <RectButton style={styles.controlButton} {...props}>
            <Feather name="check" size={20} color="#15B6D6" />
        </RectButton>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        padding: 20,
    },
    titleStyles: {
        fontSize: 44,
        fontFamily: "Nunito_800ExtraBold",
        color: "#0089A5",
        textAlign: "left",
        lineHeight: 46,
        paddingHorizontal: 20,
        marginTop: -50,
    },
    subTitleStyles: {
        fontSize: 20,
        fontFamily: "Nunito_600SemiBold",
        color: "#5C8599",
        textAlign: "left",
        paddingHorizontal: 20,
    },
    controlButton: {
        backgroundColor: "#D1EDF2",
        padding: 20,
        borderRadius: 20,
        marginHorizontal: 30,
    },
    secondTitleStyles: {
        fontSize: 30,
        fontFamily: "Nunito_800ExtraBold",
        color: "#0089A5",
        textAlign: "right",
        marginTop: -20,
        paddingHorizontal: 20,
    },
});

export default OnBoardingScreen;
