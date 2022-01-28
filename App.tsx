import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NativeBaseProvider, extendTheme } from "native-base"

import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"

export default function App() {
	const isLoadingComplete = useCachedResources()
	const colorScheme = useColorScheme()
	const [products, setProducts] = useState([
		{ name: "apple", expiration: "01-02-2033", amount: "5" },
		{ name: "chickenbreast", expiration: "03-02-2022", amount: "10" },
		{ name: "milk", expiration: "12-01-2020", amount: "1" },
		{ name: "broccoli", expiration: "-", amount: "0.52" }
	])
	const newColorTheme = {
		brand: { 900: "#8287af", 800: "#7c83db", 700: "#b3bef6" }
	}
	const addProduct = (newProduct: any) => {
		setProducts([...products, newProduct])
	}
	const theme = extendTheme({ colors: newColorTheme })
	if (!isLoadingComplete) {
		return null
	} else {
		return (
			<SafeAreaProvider>
				<NativeBaseProvider theme={theme}>
					<Navigation
						addProduct={(newProduct: any) => addProduct(newProduct)}
						products={products}
						colorScheme={colorScheme}
					/>
					<StatusBar />
				</NativeBaseProvider>
			</SafeAreaProvider>
		)
	}
}
