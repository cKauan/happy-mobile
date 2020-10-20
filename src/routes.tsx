import React, { useEffect, useState } from "react";
import { NavigationContainer as Router } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";
import OrphanageData from "./pages/CreateOrphanage/OrphanageData";
import SelectMapPosition from "./pages/CreateOrphanage/SelectMapPosition";
import Header from "./components/Header";
import OnBoardingScreen from "./pages/OnBoarding";
import AsyncStorage from "@react-native-community/async-storage";
import FailedCreateOrphanagePage from './pages/CreateOrphanage/Failed';
import SuccessCreateOrphanagePage from './pages/CreateOrphanage/Success';

const Routes = () => {
    const [onBoarding, setOnBoarding] = useState<boolean>(false);
    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem("onboarding_done") || false;
                if (Boolean(value) !== true) return setOnBoarding(true);
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);

    return (
        <Router>
            <Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "#f2f3f5" },
                }}
            >
                {onBoarding && (
                    <Screen name="OnBoarding" component={OnBoardingScreen} />
                )}

                <Screen name="OrphanagesMap" component={OrphanagesMap} />
            
                <Screen
                    name="OrphanageDetails"
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => (
                            <Header showCloseButton={false} title="Orfanato" />
                        ),
                    }}
                />
                <Screen
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />,
                    }}
                />
                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no mapa" />,
                    }}
                />
                <Screen name="FailedCreateOrphanage" component={FailedCreateOrphanagePage} />
                <Screen name="SuccessCreateOrphanage" component={SuccessCreateOrphanagePage} />
            </Navigator>
        </Router>
    );
};
export default Routes;
