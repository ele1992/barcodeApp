import { TextInput, SafeAreaView, StyleSheet, Button } from "react-native"
import { Input } from "native-base"
const LoginScreen = ({ navigation }: any) => {
	return (
		<SafeAreaView>
			<Input style={styles.input} placeholder="Email"></Input>
			<Input
				style={styles.input}
				secureTextEntry={true}
				placeholder="Password"
			></Input>
			<Button title="Press me" onPress={() => navigation.navigate("Root")} />
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 15
	}
})
export default LoginScreen
