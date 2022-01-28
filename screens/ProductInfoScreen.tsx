import {
  Text,
  Heading,
  VStack,
  AspectRatio,
  Box,
  Center,
  HStack,
  Stack,
  Image,
  Badge,
  Button,
} from "native-base";
import React from "react";

const ProductInfoScreen = (props: any) => {
  const {
    name,
    image,
    type,
    barcode,
    quantity,
    categories,
    certificates,
    allergies,
  } = props.barcodeData;

  const allergiesList = () => {
    if (allergies) {
      return (
        <VStack justifyContent="space-evenly">
          <Center>
            <Text
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
            >
              Allergies{" "}
            </Text>
          </Center>
          {allergies.map((cat: string, index: React.Key | null | undefined) => {
            return <Badge key={index}>{cat}</Badge>;
          })}
        </VStack>
      );
    }
  };

  const certificatesList = () => {
    if (certificates) {
      return (
        <VStack justifyContent="space-evenly">
          <Center>
            <Text
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
            >
              Certificates{" "}
            </Text>
          </Center>
          {certificates.map(
            (cat: string, index: React.Key | null | undefined) => {
              return <Badge key={index}>{cat}</Badge>;
            }
          )}
        </VStack>
      );
    }
  };

  const categoriesList = () => {
    if (categories) {
      return (
        <VStack justifyContent="space-evenly">
          <Center>
            <Text
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
            >
              Categories{" "}
            </Text>
          </Center>
          {categories.map(
            (cat: string, index: React.Key | null | undefined) => {
              return <Badge key={index}>{cat}</Badge>;
            }
          )}
        </VStack>
      );
    }
  };
  return (
    <Box alignItems="center">
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio w="100%">
            <Image
              source={{
                uri: image,
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {name}
            </Heading>
            <Badge colorScheme="info">{type}</Badge>
          </Stack>
          <HStack justifyContent="space-between">
            <Text
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
            >
              Barcode:{" "}
            </Text>
            <Text>{barcode}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
            >
              Quantity:{" "}
            </Text>
            <Text>{quantity}</Text>
          </HStack>
          <VStack>
            {categoriesList()}
            {certificatesList()}
            {allergiesList()}
          </VStack>
        </Stack>
        <Button>Add to fridge</Button>
      </Box>
    </Box>
  );
};

export default ProductInfoScreen;
