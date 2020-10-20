import React from "react";
import { Text, View, StyleSheet, Image, StatusBar } from "react-native";
import successGirl from "../../assets/success-girl.png";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const SuccessScreen = () => {
    const navigation = useNavigation();
    function handleNavigateToHome() {
        navigation.navigate("OrphanagesMap")
    }
    return (
        <>
        <StatusBar hidden={true}/>
        <View style={styles.successContainer}>
            <Image source={successGirl} />
            <View>
                <Text style={styles.successTitle}>Ebaaa!</Text>
                <Text style={styles.successSubTitle}>
                    Cadastro concluído com sucesso :)
                </Text>
            </View>
            <RectButton style={styles.successButton} onPress={handleNavigateToHome}>
                <Text style={styles.successButtonText}>Ok</Text>
            </RectButton>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    successContainer: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#39CC82",
    },
    successTitle: {
        fontSize: 40,
        fontFamily: "Nunito_800ExtraBold",
        color: "#FFFFFF",
        textAlign: "center",
    },
    successSubTitle: {
        fontSize: 20,
        fontFamily: "Nunito_600SemiBold",
        color: "#fff",
    },
    successButton: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        backgroundColor: "#19C06D",
        borderRadius: 20,
    },
    successButtonText: {
        color: "#FFF",
        fontFamily: "Nunito_700Bold",
        fontSize: 16,
    },
});

export default SuccessScreen;
