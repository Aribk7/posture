import Head from "next/head";
import { Box, Text, Link, Center, Heading, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head >
        <title color="facebook.00">Posture Up</title>
        <meta property="og:image" content="https://posture.so/posture.png" />
        <meta property="og:title" content="posture Up" />
        <meta
          property="og:description"
          content="posture.so is a web-app giving you not-so-friendly reminders about your posture."
        />
      </Head>
      <Center px={8} h="90vh">
        <VStack spacing={2}>
          <Heading color="facebook.600"  fontSize="8xl">Posture Up</Heading>
          <Text w={{ base: 80, md: 96 }} pb={5} fontSize="3xl" textAlign="center" color="facebook.500">
            A web-app giving you not-so-friendly reminders about your posture.
          </Text>
          <Box
            py={3}
            px={9}
            rounded="full"
            _hover={{ bg: "facebook.300" }}
            cursor="pointer"
            bg="facebook.400"
            onClick={() => {
              location.href = "/try";
            }}
          >
            <Text textColor="white" fontSize="3xl" >
              try now
            </Text>
          </Box>
        </VStack>
      </Center>
      <Text px={5} fontSize="2xl" textAlign="center" textColor="facebook.500">
        Built for{" "}
        <Link href="https://www.youtube.com/watch?v=fcZXfoB2f70"><b><u>@You</u></b></Link>
      </Text>
    </>
  );
}
