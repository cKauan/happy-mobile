import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FailedPage = () => {
    const navigation = useNavigation();
    function handleGoBackHome() {
        navigation.navigate("OrphanagesMap");
    }
    function handleGoBack() {
        navigation.goBack();
    }
    return (
        <>
            <StatusBar hidden={true}/>
            <View style={styles.failedContainer}>
                <View style={styles.failedIconContainer}>
                    <Feather name="x" color="#FF669D" size={32} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.failedTitle}>Cancelar cadastro</Text>
                    <Text style={styles.failedSubTitle}>
                        Tem certeza que quer cancelar esse cadastro?
                    </Text>
                </View>

                <View style={styles.failedButtonsContainer}>
                    <View style={styles.cancelFailedButtonBorder}>
                        <RectButton
                            style={styles.cancelFailedButton}
                            onPress={handleGoBack}
                        >
                            <Text style={styles.failedButtonsText}>Não</Text>
                        </RectButton>
                    </View>
                    <RectButton
                        style={styles.confirmFailedButton}
                        onPress={handleGoBackHome}
                    >
                        <Text style={styles.failedButtonsText}>Sim</Text>
                    </RectButton>
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    failedContainer: {
        flex: 1,
        backgroundColor: "#FF669D",
        justifyContent: "center",
        alignItems: "center",
    },
    failedIconContainer: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        marginBottom: 15,
        borderRadius: 20,
    },
    textContainer: {
        alignItems: "center",
    },
    failedTitle: {
        fontSize: 32,
        fontFamily: "Nunito_800ExtraBold",
        color: "#fff",
    },
    failedSubTitle: {
        fontSize: 20,
        fontFamily: "Nunito_600SemiBold",
        color: "#FFF",
        maxWidth: "60%",
        textAlign: "center",
        marginVertical: 20,
    },
    failedButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "85%",
    },
    confirmFailedButton: {
        paddingVertical: 20,
        paddingHorizontal: 50,
        backgroundColor: "#D6487B",
        marginVertical: 10,
        borderRadius: 20,
    },
    cancelFailedButtonBorder: {
        borderColor: "#D6487B",
        borderWidth: 2,
        marginVertical: 10,
        borderRadius: 20,
    },
    cancelFailedButton: {
        paddingVertical: 20,
        paddingHorizontal: 50,
    },
    failedButtonsText: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "Nunito_800ExtraBold",
    },
});

export default FailedPage;
