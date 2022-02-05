/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Flex, Text, Box, Button, Image, Stack, Link,
  Input, InputGroup, InputLeftAddon, InputRightAddon
} from '@chakra-ui/react'

import {useForm} from 'react-hook-form'
import {useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {useRouter} from 'next/router'

const signIn = () => {
  const { register, handleSubmit, formState:{errors} } = useForm()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data)=>{
    try{
      setLoading(true)
      const formData = new FormData()
      formData.append("nim_coor", data.nim_coor)
      formData.append("password", data.password)
  
      const res = await axios.post('https://api.mxm.one/api/coordinator/acc/signIn', formData)
    
      sessionStorage.setItem('name', res.data.name)
      sessionStorage.setItem('divisi', res.data.divisi)
      sessionStorage.setItem('divisiID', res.data.divisiID)
      sessionStorage.setItem('token', res.data.token)
      setLoading(false)
      router.push('/')
    } catch(err){
      setLoading(false)
      Swal.fire({
        title: `${err.response.data.message}`,
        text: `jika lupa password, silahkan hubungi Admin Maxima2022`,
        icon: 'error',
      })
    }
  }

  return (
    <Flex bgColor={'#171c26'} h={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <Flex h={'60vh'} w={'45vh'} borderRadius={10} bgColor={'white'} direction={'column'} p={3}>
        <Flex mb={10} justifyContent={'center'} alignItems={'center'} w={'100%'}>
          <Image src='/Logo_MXM.png' w={'90px'} h={'90px'}></Image>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={12}>
            <InputGroup>
              <InputLeftAddon textColor={'white'} w={'100px'} bgColor={'#19282F'}>NIM</InputLeftAddon>
              <Input {...register('nim_coor', {required: "NIM harap diisi"})} type={'number'} borderColor={'black'} textColor={'black'} _hover={{bgColor: '#313552', textColor:'white'}} placeholder={'34995'} _placeholder={{color: 'gray.500'}}></Input>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon textColor={'white'} w={'100px'} bgColor={'#19282F'}>Password</InputLeftAddon>
              <Input {...register('password', {required: "Password harap diisi"})} type={'password'} borderColor={'black'} textColor={'black'} _hover={{bgColor: '#313552', textColor:'white'}} placeholder={'********'} _placeholder={{color: 'gray.500'}}></Input>
            </InputGroup>
            <Flex justifyContent={'center'} direction={'column'} alignItems={'center'}>
              {loading === false ? 
              <Button textColor={'white'} type={'submit'} mb={3} w={'100px'} bgColor={'#171c26'} _hover={{bgColor: '#313552'}}>Login</Button>   
              :
              <Button textColor={'white'} isLoading mb={3} w={'100px'} bgColor={'#171c26'} _hover={{bgColor: '#313552'}}>Login</Button>
              }
              <Text fontSize={'12px'} textColor={'gray.400'}>Belum ada akun? <Link textColor={'#d01c1f'} href={'/signUp'}>register</Link></Text>
            </Flex>
          </Stack>
        </form>
      </Flex>
    </Flex>
  );
}
 
export default signIn;