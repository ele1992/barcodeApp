import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  Alert,
  Box,
  Center,
  CloseIcon,
  Heading,
  HStack,
  IconButton,
  Skeleton,
  VStack,
  Button,
  Text,
  View,
  Divider,
  ScrollView,
  Flex,
  Spacer,
} from "native-base";
import ProductInfoScreen from "./ProductInfoScreen";

export default function BarcodeScannerScreen({
  addProduct,
}: {
  addProduct: (newProduct: any) => void;
}) {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [searchingBarcode, setSearchingBarcode] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState({ data: "", type: "" });
  const [barcodeData, setBarcodeData] = useState<any>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const findBarcode = async (input: BarcodeInput) => {
    setSearchingBarcode(true);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ barcode: input.data, type: input.type }),
      };
      const response = await fetch(
        "http://192.168.100.6:4000/findbarcode",
        options
      );
      const json = await response.json();
      setBarcodeData(json);
    } catch (error) {
      console.error(error);
    } finally {
      const stopSearching = () => {
        setShowAlert(false);
        setSearchingBarcode(false);
      };
      setTimeout(stopSearching, 5000);
    }
  };

  interface BarcodeInput {
    type: string;
    data: string;
  }
  const handleBarCodeScanned = (input: BarcodeInput) => {
    setBarcodeInput({ data: input.data, type: input.type });
    setScanned(true);
    setShowAlert(true);
    findBarcode(input);
  };

  const productInformation = () => {
    if (searchingBarcode) {
      return (
        <Center w="100%">
          <VStack
            w="100%"
            maxW="400"
            borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
              borderColor: "coolGray.500",
            }}
            _light={{
              borderColor: "coolGray.200",
            }}
          >
            <Skeleton h="80" />
            <Skeleton.Text px="20" />
            <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
          </VStack>
        </Center>
      );
    }
    if (barcodeData && !searchingBarcode) {
      return (
        <VStack justifyContent="space-between" space={6} mt={4}>
          <ProductInfoScreen
            barcodeData={barcodeData}
            addProduct={(newProduct: any) => addProduct(newProduct)}
          />
          <Button onPress={() => setScanned(false)}>Scan Again</Button>
        </VStack>
      );
    }
  };

  const alert = () => {
    if (showAlert) {
      return (
        <Center mt={4} mb={4}>
          <Alert shadow={2} maxW="400" w="100%" colorScheme="success">
            <VStack space={1} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack space={2} flexShrink={1} alignItems="center">
                  <Alert.Icon />
                  <Heading
                    fontSize="md"
                    fontWeight="medium"
                    color="coolGray.800"
                  >
                    Found a barcode!
                  </Heading>
                </HStack>
                <IconButton
                  variant="unstyled"
                  icon={<CloseIcon size="3" color="coolGray.600" />}
                  onPress={() => setScanned(false)}
                />
              </HStack>
              <Box
                pl="6"
                _text={{
                  color: "coolGray.600",
                }}
              >
                {`A barcode has been found, now searching for product information!\n\nBarcode ${barcodeInput.data} of type ${barcodeInput.type}`}
              </Box>
            </VStack>
          </Alert>
          <Divider mx="20"></Divider>
        </Center>
      );
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (scanned === true) {
    return (
      <Box flex={1}>
        <ScrollView>
          <Flex alignItems="center" justifyContent="space-between">
            {alert()}
            <Spacer></Spacer>
            {productInformation()}
          </Flex>
        </ScrollView>
      </Box>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button onPress={() => setScanned(false)}>Scan Again</Button>}
    </View>
  );
}

/* @hide const styles = StyleSheet.create({ ... }); */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
/* @end */
