import { useState } from "react";
import {
  Box,
  Stack,
  Center,
  Input,
  Button,
  Heading,
  Select,
  CheckIcon,
} from "native-base";

export default function ModalScreen({
  addProduct,
}: {
  addProduct: (newProduct: any) => void;
}) {
  const [name, setName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [quantity, setQuantity] = useState("");

  return (
    <Box backgroundColor={"#FFF"} m={3} px={5} py={20} height={"70%"}>
      <Center>
        <Heading>Product toevoegen</Heading>
        <Stack mt={10} w={"80%"} space={4}>
          <Input
            value={name}
            onChangeText={(value) => setName(value)}
            placeholder="Naam"
          ></Input>
          <Input
            value={expiration}
            onChangeText={(value) => {
              setExpiration(value);
            }}
            placeholder="Houdbaar tot"
          ></Input>
          <Input
            value={quantity}
            onChangeText={(value) => setQuantity(value)}
            placeholder="Hoeveelheid"
          ></Input>
          <Button
            onPress={() => {
              const item = { name, expiration, quantity };
              console.log(item);
            }}
          >
            Toevoegen
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
