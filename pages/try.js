import { useEffect, useState } from "react";

import { Box, Text, Center, VStack, Spinner, Link, } from "@chakra-ui/react";
import * as tmPose from "@teachablemachine/pose";

export default function Home() {
  const [model, setModel] = useState(null);
  const [postureMessage, setPostureMessage] = useState(null);
  const [cameraGood, setCameraGood] = useState(false);

  const startPose = async () => {
    getCanvas();

    const camera = document.getElementById("hiddenCanvas");

    const ctx = camera.getContext("2d").getImageData(0, 0, 640, 480);

    const { posenetOutput } = await model.estimatePose(ctx, true);

    const prediction = await model.predict(posenetOutput);

    if (prediction[0].probability > prediction[1].probability) {
      setMessage(false);
    }
    if (prediction[1].probability > prediction[0].probability) {
      setMessage(true);
    }

    startPose();
  };

  const startWebcam = async () => {
    const modelURL = "model/model.json";
    const metadataURL = "model/metadata.json";
    const model = await tmPose.load(modelURL, metadataURL);

    setModel(model);

    const video = document.querySelector("video");
    const canvas = (window.canvas = document.querySelector("canvas"));

    canvas.width = 480;
    canvas.height = 360;

    function handleSuccess(stream) {
      window.stream = stream;
      video.srcObject = stream;
      setCameraGood(true);
    }

    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then(handleSuccess);
  };

  const getCanvas = () => {
    const video = document.querySelector("video");
    const canvas = (window.canvas = document.querySelector("canvas"));
    canvas.width = 480;
    canvas.height = 360;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  };

  const setMessage = (isSlouching) => {
    if (isSlouching === true) {
      setPostureMessage("🚨 Bruh fix your posture Get up 🚨");
    }
    if (isSlouching === false) {
      setPostureMessage("✅ Good Job you look cute ✅");
    }
  };

  useEffect(() => {
    startWebcam();
  }, []);
  useEffect(() => {
    if (cameraGood == true) {
      startPose();
    }
  }, [cameraGood]);
  return (
  
    <Center h="100vh" pt={{ base: 12, md: 0 }} mx={{ base: 8, md: 0 }}>
      <Box>
      <VStack spacing={2}>
          <Text w={{ base: 80, md: 96 }} pb={2} fontSize="3xl" textAlign="center" color="facebook.500">
            Made for you by {" "} 
            <Link href="https://arib.lol"><b>Arib</b></Link> and {" "}
            <Link href="https://aleem.lol"><b>Aleem</b></Link>
          </Text>
          </VStack>
        <Box  rounded="lg" display={cameraGood ? "block" : "none"}>
          <Box rounded="lg" as="video" playsInline autoPlay></Box>
          <Box display="none">
            <canvas id="hiddenCanvas"></canvas>
          </Box>
        </Box>
        <Center
          display={cameraGood ? "none" : "flex"}
          rounded="lg"
          h={{ base: "20rem", md: "30rem" }}
          w={{ base: "19rem", md: "37rem" }}
          bg="blue.300"
        >
          <VStack spacing={2}>
            <Spinner size="xl" />
            <Text>Stealing your data... JK</Text>
          </VStack>
        </Center>
        <Box pt={4} rounded="md">
          {postureMessage ? (
            <Box
              py={2}
              px={{ base: 6, md: 16 }}
              rounded="full"
              
              _hover={{ bg: "facebook.300" }}
              onClick={() => {
                startPose();
              }}
              cursor="pointer"
              bg="facebook.500"
            >
              <Text
                textAlign="center"
                textColor="white"
                fontSize={{ base: "xl", md: "3xl" }}
              >
                {postureMessage}
              </Text>
            </Box>
          ) : (
            <Box
              py={2}
              px={{ base: 6, md: 16 }}
              rounded="full"
              _hover={{ bg: "gray.9000" }}
              onClick={() => {
                startPose();
              }}
              cursor="pointer"
              bg="black"
            >
              <Text
                textAlign="center"
                textColor="white"
                fontSize={{ base: "xl", md: "3xl" }}
              >
                model loading...
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Center>
  );
}
