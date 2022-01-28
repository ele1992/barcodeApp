import { useState } from "react"
import {
	Box,
	Stack,
	Center,
	Input,
	Button,
	Heading,
	Select,
	CheckIcon,
	Text
} from "native-base"

export default function ModalScreen({
	addProduct,
	navigation
}: {
	navigation: any
	addProduct: (newProduct: any) => void
}) {
	const [name, setName] = useState("")
	const [expiration, setExpiration] = useState("")
	const [amount, setAmount] = useState("")
	console.log(navigation)
	return (
		<Box backgroundColor={"#FFF"} m={3} px={5} py={20} height={"70%"}>
			<Center>
				<Heading>Product toevoegen</Heading>
				<Stack mt={10} w={"80%"} space={4}>
					<Text>Naam</Text>
					<Input
						value={name}
						onChangeText={(value) => setName(value)}
						placeholder="Naam"
					></Input>
					<Text>Houdbaarheids datum</Text>
					<Input
						value={expiration}
						onChangeText={(value) => {
							setExpiration(value)
						}}
						placeholder="(DD-MM-YYYY)"
					></Input>
					<Text>Hoeveelheid</Text>
					<Input
						value={amount}
						onChangeText={(value) => setAmount(value)}
						placeholder="Hoeveelheid"
					></Input>
					<Button
						onPress={() => {
							const item = { name, expiration, amount }
							addProduct(item)
							navigation.navigate("Root")
						}}
					>
						Toevoegen
					</Button>
				</Stack>
			</Center>
		</Box>
	)
}
