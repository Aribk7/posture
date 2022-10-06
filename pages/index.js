import Head from "next/head";
import { Box, Text, Link, Center, Heading, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head >
        <title color="facebook.700">Posture Up</title>
        <meta property="og:image" content="https://posture.so/posture.png" />
        <meta property="og:title" content="posture.so" />
        <meta
          property="og:description"
          content="posture.so is a web-app giving you not-so-friendly reminders about your posture."
        />
      </Head>
      <Center px={8} h="90vh">
        <VStack spacing={2}>
          <Heading color="facebook.700" fontSize="6xl">Posture Up</Heading>
          <Text w={{ base: 80, md: 96 }} pb={4} textAlign="center" color="facebook.500">
            A web-app giving you not-so-friendly reminders about your posture.
          </Text>
          <Box
            py={2}
            px={14}
            rounded="full"
            _hover={{ bg: "facebook.900" }}
            cursor="pointer"
            bg="facebook.500"
            onClick={() => {
              location.href = "/try";
            }}
          >
            <Text textColor="black" fontSize="3xl">
              try now
            </Text>
          </Box>
        </VStack>
      </Center>
      <Text px={2} textAlign="center">
        made with bad posture by{" "}
        <Link href="https://twitter.com/aleemrehmetula">@aleemrehmetula</Link>
      </Text>
    </>
  );
}
