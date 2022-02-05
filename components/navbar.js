import {Flex, Text, Box, Button, Img} from '@chakra-ui/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-regular-svg-icons"
import Link from 'next/link'

const Navbar = ({name, divisi}) => {
  return (
    <Flex
    w={'100%'}
    border={'solid'}
    position={'fixed'}
    h={'90px'}
    bgColor={'#161c27'}
    >
      <Flex 
      // border={'solid'}
      w={'15%'}
      justifyContent={'center'}
      alignItems={'center'}>
          <Img src='/Logo_MXM.png'
          bgColor={'white'}
          borderRadius={50}
          h={'75px'}/>
      </Flex>
      <Flex 
      // border={'solid'}
      w={'50%'}
      color={'#fff'}
      fontWeight={'bold'}
      // justifyContent={'center'}
      ml={10}
      alignItems={'center'}
      fontSize={20}>
        <Flex>{name}</Flex>
        <Flex ml={20}>{divisi}</Flex>  
      </Flex>
      <Flex 
      // border={'solid'}
      w={'20%'}
      justifyContent={'center'}
      alignItems={'center'}
      ml={'400px'}
      color={'#fff'}
      >
          <Link href=''><a>
          <Button
          h={50}
          w={150}
          borderRadius={50}
          justifyContent={'center'}
          fontSize={'18px'}
          bg={'#1b4172'}
          leftIcon={<FontAwesomeIcon icon={faUserCircle}/>}
          mr={2}
          fontWeight={'bold'}
          >
            Logout
          </Button>
          </a></Link>
      </Flex>
    </Flex>
  );
}
 
export default Navbar;