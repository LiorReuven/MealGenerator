import React, { useRef } from 'react';
import {
  Image,
  Box,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  List,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const MealSectionDesign = (props) => {
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  console.log(props.video);

  return (
    <>
      <Heading mt="70px" textAlign="center" marginBottom="20px">
        {props.mealTitle}
      </Heading>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab onClick={executeScroll}>Picture & Description</Tab>
          <Tab>Ingredients</Tab>
          <Tab>Instructions</Tab>
          <Tab>Video guide</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box
              boxSize="sm"
              display="flex"
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              width="100%"
            >
              <Image
                width={['60%', '70%', '70%', '50%']}
                mr="10px"
                height="auto"
                ref={myRef}
                objectFit="cover"
                maxH="80%"
                src={props.mealImage}
                alt={props.mealTitle}
              />
              <Flex direction="column">
                <List spacing="60px">
                  <ListItem
                    color="orange.400"
                    fontSize={['15px', '15px', '15px', '20px']}
                    fontWeight="bold"
                  >
                    Category:
                    <Text
                      color={useColorModeValue('black', 'white')}
                      as="span"
                      fontWeight="normal"
                    >
                      {` ${props.category}`}
                    </Text>
                  </ListItem>
                  <ListItem
                    color="orange.400"
                    fontSize={['15px', '15px', '15px', '20px']}
                    fontWeight="bold"
                  >
                    Origin:
                    <Text
                      color={useColorModeValue('black', 'white')}
                      as="span"
                      fontWeight="normal"
                    >
                      {` ${props.origin}`}
                    </Text>
                  </ListItem>
                  <ListItem
                    color="orange.400"
                    fontSize={['15px', '15px', '15px', '20px']}
                    fontWeight="bold"
                  >
                    Tags:
                    <Text
                      color={useColorModeValue('black', 'white')}
                      as="span"
                      fontWeight="normal"
                    >
                      {props.tags ? ` ${props.tags}` : ' None'}
                    </Text>
                  </ListItem>
                </List>
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel pb="50px">
            <Flex justifyContent="center">
              <UnorderedList
                marginLeft="50px"
                spacing="5px"
                sx={{ columnCount: '2', columnGap: '100px' }}
              >
                {props.ingredients.map((ingredient, index) => {
                  return <ListItem key={index}>{ingredient}</ListItem>;
                })}
              </UnorderedList>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Text whiteSpace="pre-wrap" fontSize="1.3rem">
              {props.instructions}
            </Text>
          </TabPanel>
          <TabPanel>
            <Box
              as="iframe"
              src={props.video.replace('watch?v=', 'embed/')}
              width="100%"
              sx={{
                aspectRatio: '16/9',
              }}
              allowFullScreen
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default MealSectionDesign;
