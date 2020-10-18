import React, { useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Api from "../../services/Api";

interface OrphanageDataParams {
    position: { latitude: number; longitude: number };
}

export default function OrphanageData() {
    const route = useRoute();
    const {
        position: { latitude, longitude },
    } = route.params as OrphanageDataParams;
    const [name, setName] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [opening_hours, setOpeningHours] = useState<string>("");
    const [open_on_weekends, setOpenOnWeekends] = useState<boolean>(true);
    const [images, setImages] = useState<string[]>([]);
    const navigation = useNavigation();
    async function handleCreateOrphanage() {
        const data = {
            latitude,
            longitude,
            name,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        };
        console.log(data);

        const form = new FormData();
        form.append("name", name);
        form.append("about", about);
        form.append("instructions", instructions);
        form.append("latitude", String(latitude));
        form.append("longitude", String(longitude));
        form.append("opening_hours", opening_hours);
        form.append("open_on_weekends", String(open_on_weekends));
        images.forEach((image, index) =>
            form.append("images", {
                type: "image/jpg",
                url: image,
                name: `image_${index}.jog`,
            } as any)
        );

        await Api.post("orphanages", form);
        navigation.navigate("OrphanagesMap");
    }

    async function handleSelectImages() {
        const {
            status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
            return alert("Eita, precisamos acessar suas fotos...");
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (result.cancelled) return;
        const { uri: image } = result;
        setImages([...images, image]);
    }
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 24 }}
        >
            <Text style={styles.title}>Dados</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Sobre</Text>
            <TextInput
                style={[styles.input, { height: 110 }]}
                multiline
                value={about}
                onChangeText={setAbout}
            />

            {/* <Text style={styles.label}>Whatsapp</Text>
            <TextInput style={styles.input} /> */}

            <Text style={styles.label}>Fotos</Text>
            <View style={styles.uploadedImagesContainer}>
                {images.map((img) => (
                    <Image
                        key={img}
                        source={{ uri: img }}
                        style={styles.uploadedImages}
                    />
                ))}
            </View>
            <TouchableOpacity
                style={styles.imagesInput}
                onPress={handleSelectImages}
            >
                <Feather name="plus" size={24} color="#15B6D6" />
            </TouchableOpacity>

            <Text style={styles.title}>Visitação</Text>

            <Text style={styles.label}>Instruções</Text>
            <TextInput
                style={[styles.input, { height: 110 }]}
                multiline
                value={instructions}
                onChangeText={setInstructions}
            />

            <Text style={styles.label}>Horário de visitas</Text>
            <TextInput
                style={styles.input}
                value={opening_hours}
                onChangeText={setOpeningHours}
            />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Atende final de semana?</Text>
                <Switch
                    thumbColor="#fff"
                    trackColor={{ false: "#ccc", true: "#39CC83" }}
                    value={open_on_weekends}
                    onValueChange={setOpenOnWeekends}
                />
            </View>

            <RectButton
                style={styles.nextButton}
                onPress={handleCreateOrphanage}
            >
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </RectButton>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    title: {
        color: "#5c8599",
        fontSize: 24,
        fontFamily: "Nunito_700Bold",
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: "#D3E2E6",
    },

    label: {
        color: "#8fa7b3",
        fontFamily: "Nunito_600SemiBold",
        marginBottom: 8,
    },

    comment: {
        fontSize: 11,
        color: "#8fa7b3",
    },

    input: {
        backgroundColor: "#fff",
        borderWidth: 1.4,
        borderColor: "#d3e2e6",
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: "top",
    },
    uploadedImagesContainer: {
        flexDirection: "row",
    },
    uploadedImages: {
        width: 64,
        height: 64,
        borderRadius: 20,
        marginBottom: 32,
        marginRight: 8,
    },
    imagesInput: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderStyle: "dashed",
        borderColor: "#96D2F0",
        borderWidth: 1.4,
        borderRadius: 20,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 32,
    },

    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16,
    },

    nextButton: {
        backgroundColor: "#15c3d6",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        height: 56,
        marginTop: 32,
    },

    nextButtonText: {
        fontFamily: "Nunito_800ExtraBold",
        fontSize: 16,
        color: "#FFF",
    },
});
