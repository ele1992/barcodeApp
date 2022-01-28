import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NativeBaseProvider, extendTheme } from "native-base"

import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"

export default function App() {
	const isLoadingComplete = useCachedResources()
	const colorScheme = useColorScheme()
	const newColorTheme = {
		brand: { 900: "#8287af", 800: "#7c83db", 700: "#b3bef6" }
	}
	const theme = extendTheme({ colors: newColorTheme })
	if (!isLoadingComplete) {
		return null
	} else {
		return (
			<SafeAreaProvider>
				<NativeBaseProvider theme={theme}>
					<Navigation colorScheme={colorScheme} />
					<StatusBar />
				</NativeBaseProvider>
			</SafeAreaProvider>
		)
	}
}
