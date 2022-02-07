/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
import{
  Text, 
  Box, 
  Flex, 
  Input, 
  InputGroup, 
  InputLeftAddon, 
  Stack, 
  FormLabel, 
  Textarea, 
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

import {useRouter} from 'next/router'
import Navbar from '../components/navbar'

const Details = ({}) => {
  const router = useRouter()
  const id = router.query.id
  const [data, setData] = useState([])
  const [name, setName] = useState([])
  const [divisi, setDivisi] = useState('')
  const [interview, setInterview] = useState('')
  const [form, setForm] = useState('')

  useEffect(async ()=>{
    try{
      const res = await axios.get(`https://api.mxm.one/api/divisi/registrants/${id}`, {
        headers:{
          "x-access-token": sessionStorage.getItem('token')
        }
      })
      setData(res.data[0])

      if(res.data[0].lulusSeleksiForm === 1){
        setForm('Lulus')
      } else{
        setForm('Tidak Lulus')
      }

      if(res.data[0].lulusInterview === 1){
        setInterview('Lulus')
      } else{
        setInterview('Tidak Lulus')
      }

      setName(sessionStorage.getItem('name'))
      setDivisi(sessionStorage.getItem('divisi'))
    }catch(err){
      Swal.fire({
        icon: 'error',
        text: `${err.response.data.message}`,
        title: 'Perubahan status Gagal',
      })
    }
  }, [])

  const statusForm = async ()=>{
    try{
      const res = await axios.put(`https://api.mxm.one/api/divisi/registrants/formSelection/${id}`, "", {
        headers:{
          "x-access-token": sessionStorage.getItem('token')
        }
      })
      if(res.data.lulusSeleksiForm === 1){
        setForm("Lulus")
      } else if(res.data.lulusSeleksiForm === 0){
        setForm("Tidak Lulus")
      }
      Swal.fire(
        'Pengubahan Status Berhasil',
        ``,
        'success'
      )
    //router.reload(window.location.pathname)
    }catch(err){
      Swal.fire({
        icon: 'error',
        text: `${err.response.data.message}`,
        title: 'Perubahan status Gagal',
      })
    }
  }

  const statusInterview= async ()=>{
    try{
      const res = await axios.put(`https://api.mxm.one/api/divisi/registrants/interview/${id}`, "", {
        headers:{
          "x-access-token": sessionStorage.getItem('token')
        }
      })
      console.log(res)
      if(res.data.lulusInterview === 1){
        setInterview("Lulus")
      } else if(res.data.lulusInterview === 0){
        setInterview("Tidak Lulus")
      }
      Swal.fire(
        'Pengubahan Status Berhasil',
        ``,
        'success'
      )
    //router.reload(window.location.pathname)
    }catch(err){
      Swal.fire({
        icon: 'error',
        text: `${err.response.data.message}`,
        title: 'Perubahan status Gagal',
      })
    }
  }

  return (
    <>
     <Navbar name={name} divisi={divisi} status='on'/>
      <Flex bgColor='white' justifyContent={'space-evenly'} pt={5} pb={5} position={'absolute'} top={'90'} w={'100%'} >
        <Box 
          h={'82vh'} 
          overflow={'auto'} 
          css={{
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#FC4F4F',
              borderRadius: '30px',
            },
          }}
        >
          <Stack spacing={10}>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>NIM</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={data.nim_mhs} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>Nama</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={data.name} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>Email</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={data.email} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>NoHP</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={data.no_hp} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>Tempat Lahir</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={data.tempat_lahir} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>Tanggal Lahir</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={data.tanggal_lahir} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>Jenis Kelamin</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={data.jenis_kelamin === 'Male' ? "Laki-Laki" : "Perempuan"} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>Prodi</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={data.prodi} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>IPS</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={data.ips} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>Transkrip Nilai</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={data.transkrip} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>LINE / Instagram</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={`${data.line} / ${data.instagram}`} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>Token</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={data.token} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
            <Box>
                <FormLabel textColor={'black'} htmlFor='soal2'>Menurut kamu, apa arti dari “Miraculous Adventure”?</FormLabel>
                <Textarea disabled _disabled={{color: "white", bgColor: "#1a4173"}} bgColor={'#1a4173'} value={data.soal1} h={'100px'}/>
            </Box>
            <Box>
                <FormLabel textColor={'black'} htmlFor='soal2'>Apa harapanmu untuk MAXIMA 2022?</FormLabel>
                <Textarea disabled _disabled={{color: "white", bgColor: "#1a4173"}} bgColor={'#1a4173'} value={data.soal2} h={'100px'}/>
            </Box>
            <Box>
                <FormLabel textColor={'black'} htmlFor='soal2'>Pertanyaan Divisi</FormLabel>
                <Textarea disabled _disabled={{color: "white", bgColor: "#1a4173"}} bgColor={'#1a4173'} value={data.soal3} h={'100px'}/>
            </Box>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>PDF FILE</InputLeftAddon>
              <Input bgColor={'gray.200'} w={350} disabled value={data.portofolio} _disabled={{color: "white", bgColor: "#1a4173"}}/>
            </InputGroup>
          </Stack>
        </Box>  
        <Box>
          <Stack spacing={9}>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>Lulus Form</InputLeftAddon>
              <Input bgColor={'gray.200'} disabled value={form} _disabled={{color: "white", bgColor: "#1a4173"}} w={120}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={"150px"} textColor={'white'} bgColor={'#1a202c'}>Lulus Interview</InputLeftAddon>
              <Input bgColor={'gray.200'} disabled value={interview} _disabled={{color: "white", bgColor: "#1a4173"}} w={120}/>
            </InputGroup>
            <Flex justifyContent={'space-between'}>
            <Link href="/"><Button bgColor={'gray.700'} w={'50%'} mr={1} _hover={{bgColor: "gray.700"}} textColor='white'>Back</Button></Link>
              <Menu>
                <MenuButton bgColor={'gray.700'} w={'50%'} ml={1} _hover={{bgColor: "gray.700"}} as={Button} textColor="white">Change Status</MenuButton>
                <MenuList>
                  <MenuItem onClick={statusForm}>Ubah Status Form</MenuItem>
                  <MenuItem onClick={statusInterview}>Ubah Status Interview</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Stack>
        </Box>
      </Flex> 
    </>
  );
}
 
export default Details;