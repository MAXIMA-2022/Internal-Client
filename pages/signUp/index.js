/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
import {
    Flex, Text, Box, Button, Image, Stack, Link, Select,
    Input, InputGroup, InputLeftAddon, InputRightAddon
} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'  
import {useEffect, useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
  
  const signUp = () => {
    const { register, handleSubmit, formState:{errors} } = useForm()
    const [divisi, setDivisi] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(async ()=>{
      if(sessionStorage.getItem('token')!==null){
        router.push('/')
      } else{
        const divisi = await axios.get('https://api.mxm.one/api/divisi')
        setDivisi(divisi.data)
      }
    }, [])

    const onSubmit = async (data)=>{
      try{
        setLoading(true)
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("nim_coor", data.nim_coor)
        formData.append("email", data.email)
        formData.append("divisiID", data.divisi)
        formData.append("password", data.password)

        await axios.post('https://api.mxm.one/api/coordinator/acc/signUp', formData)

        Swal.fire(
          'Pendaftaran Berhasil!',
          'Silahkan menunggu verifikasi dari Admin Maxima 2022',
          'success'
        )
        setLoading(false)
      } catch(err){
        setLoading(false)
        Swal.fire({
          title: `${err.response.data.message}`,
          icon: 'error',
        })
      }
    }
  
    return (
      <Flex bgColor={'#171c26'} h={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <Flex w={'45vh'} borderRadius={10} bgColor={'white'} direction={'column'} pr={3} pl={3} pb={3}>
          <Flex mb={10} justifyContent={'center'} alignItems={'center'} w={'100%'}>
            <Image src='/Logo_MXM.png' w={'90px'} h={'90px'}></Image>
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={10}>
              <InputGroup>
                <InputLeftAddon textColor={'white'} w={'100px'} bgColor={'#19282F'}>NIM</InputLeftAddon>
                <Input {...register('nim_coor', {required: "NIM harap diisi"})} type={'number'} borderColor={'black'} textColor={'black'} _hover={{bgColor: '#313552', textColor:'white'}} placeholder={'34995'} _placeholder={{color: 'gray.500'}}></Input>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon textColor={'white'} w={'100px'} bgColor={'#19282F'}>Name</InputLeftAddon>
                <Input {...register('name', {required: "Nama harap diisi"})} type={'text'} borderColor={'black'} textColor={'black'} _hover={{bgColor: '#313552', textColor:'white'}} placeholder={'Ed Sheeran'} _placeholder={{color: 'gray.500'}}></Input>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon textColor={'white'} w={'100px'} bgColor={'#19282F'}>Email</InputLeftAddon>
                <Input {...register('email', {required: "Nama harap diisi"})} type={'email'} borderColor={'black'} textColor={'black'} _hover={{bgColor: '#313552', textColor:'white'}} placeholder={'ed@student.umn.ac.id'} _placeholder={{color: 'gray.500'}}></Input>
              </InputGroup>
                <Select placeholder='Pilih Divisi' borderColor={'black'} textColor={'black'} _hover={{bgColor: '#313552', textColor:'white'}} {...register('divisi', {required: "Divisi harap dipilih"})}>
                  {divisi.map((d)=>(
                    <option style={{background: "#19282F", color: "white"}} value={d.id}>{d.divisi}</option>
                  ))}
                </Select>
              <InputGroup>
                <InputLeftAddon textColor={'white'} w={'100px'} bgColor={'#19282F'}>Password</InputLeftAddon>
                <Input {...register('password', {required: "Password harap diisi"})} type={'password'} borderColor={'black'} textColor={'black'} _hover={{bgColor: '#313552', textColor:'white'}} placeholder={'********'} _placeholder={{color: 'gray.500'}}></Input>
              </InputGroup>
              <Flex justifyContent={'center'} direction={'column'} alignItems={'center'}>
                {loading === false ? 
                <Button textColor={'white'} type={'submit'} mb={3} w={'100px'} bgColor={'#171c26'} _hover={{bgColor: '#313552'}}>Register</Button>   
                :
                <Button textColor={'white'} isLoading mb={3} w={'100px'} bgColor={'#171c26'} _hover={{bgColor: '#313552'}}>Register</Button>
                }
                <Text fontSize={'12px'} textColor={'gray.400'}>Sudah ada akun? <Link textColor={'#d01c1f'} href={'/signIn'}>login</Link></Text>
              </Flex>
            </Stack>
          </form>
        </Flex>
      </Flex>
    );
  }
   
  export default signUp;