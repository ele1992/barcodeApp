/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import BarcodeScannerScreen from "../screens/BarcodescannerScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import LoginScreen from "../screens/LoginScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
  addProduct,
  products,
}: {
  addProduct: (newProduct: any) => void;
  products: any[];
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <RootNavigator
        products={products}
        addProduct={(newProduct: any) => addProduct(newProduct)}
      />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({
  products,
  addProduct,
}: {
  products: any[];
  addProduct: (newProduct: any) => void;
}) {
  const nav = () => (
    <BottomTabNavigator
      products={products}
      addProduct={(newProduct: any) => addProduct(newProduct)}
    />
  );
  const modal = () => (
    <ModalScreen addProduct={(newProduct: any) => addProduct(newProduct)} />
  );
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Root"
        component={nav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Add" component={modal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({
  products,
  addProduct,
}: {
  products: any[];
  addProduct: (newProduct: any) => void;
}) {
  const colorScheme = useColorScheme();
  const fridgeComponent = () => <TabOneScreen products={products} />;
  const barcodeComponent = () => (
    <BarcodeScannerScreen
      addProduct={(newProduct: any) => addProduct(newProduct)}
    />
  );
  return (
    <BottomTab.Navigator
      initialRouteName="Fridge"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Fridge"
        component={fridgeComponent}
        options={({ navigation }: RootTabScreenProps<"Fridge">) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="apple" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Add")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="plus-square"
                size={50}
                color="#9AF"
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="BarcodeScanner"
        component={barcodeComponent}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="video-camera" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
