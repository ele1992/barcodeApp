import { StyleSheet } from "react-native"
import { useState } from "react"
import {
	Box,
	Heading,
	FlatList,
	Text,
	VStack,
	HStack,
	Spacer
} from "native-base"
import { FridgeProps, RootTabScreenProps } from "../types"

export default function TabOneScreen({ products }: FridgeProps) {
	console.log(products)
	return (
		<Box>
			<Heading fontSize={"lg"} p="4" pb="3">
				Produce
			</Heading>
			<FlatList
				data={products}
				renderItem={({ item, index }) => (
					<Box
						key={index}
						borderBottomWidth={"6"}
						borderColor={"warmGray.200"}
						backgroundColor={"light.50"}
						m={1}
						pl="5"
						pr="5"
						py="2"
						borderRadius={5}
					>
						<HStack space={3} justifyContent={"space-between"}>
							<Text>{item.name}</Text>
							<Text>{item.amount}</Text>
						</HStack>
						<Spacer />
						<Text fontSize={"sm"}>{item.expiration}</Text>
					</Box>
				)}
			/>
		</Box>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		fontSize: 20,
		fontWeight: "bold"
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%"
	}
})
