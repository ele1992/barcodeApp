import { Center, Stack, Input, Image, Button } from "native-base"
const LoginScreen = ({ navigation }: any) => {
	return (
		<Center>
			<Image
				mt={100}
				mb={10}
				source={{
					uri: "https://images.unsplash.com/photo-1562919479-b0c98b0d7f8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1306&q=80"
				}}
				alt="fridge"
				size={300}
				borderRadius={100}
			/>
			<Stack mt={3} w="85%" space={4}>
				<Input placeholder="Email"></Input>
				<Input secureTextEntry={true} placeholder="Password"></Input>
				<Button onPress={() => navigation.navigate("Root")}>Press Me</Button>
			</Stack>
		</Center>
	)
}
export default LoginScreen
