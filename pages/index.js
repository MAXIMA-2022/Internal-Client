/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import {Flex, Box, Button, Switch, FormLabel} from '@chakra-ui/react'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import Table from '../components/table'

export default function Home() {
  const [data, setData] = useState([])
  const [name, setName] = useState([])
  const [divisi, setDivisi] = useState('')
  const [divisiID, setDivisiID] = useState('')
  
  const route = useRouter()

  useEffect(async ()=>{
    try{    
      if(sessionStorage.getItem('token') === null){
        route.push('/signIn')
      }
      else{
        const data = await axios.get('https://api.mxm.one/api/divisi/registrants', {
          headers: {
            "x-access-token": sessionStorage.getItem('token')
          }
        })
        const mhs = []
        data['data'].map(d=>{
          let form
          let interview

          if(d.lulusSeleksiForm === 0){
            form = "Tidak Lulus"
          } else {
            form = "Lulus"
          }

          if(d.lulusInterview === 0){
            interview = "Tidak Lulus"
          } else {
            interview = "Lulus"
          }
          
          mhs.push({
            nim: d.nim_mhs,
            name: d.name,
            email: d.email,
            token: d.token,
            id: d.id,
            form: form,
            interview: interview,
            divisi: d.divisi
          })
        })
        setData(mhs)
        setName(sessionStorage.getItem('name'))
        setDivisi(sessionStorage.getItem('divisi'))
        setDivisiID(sessionStorage.getItem('divisiID'))
      }
    }catch(err){
      Swal.fire({
        icon: 'error',
        title: `${err.response.data.message}`,
      })
      route.push('/signIn')
    }
  }, [])

  return (
    <>
      <Navbar name={name} divisi={divisi}/>
      <Flex bgColor='white' borderColor={'red'} justifyContent={'center'} alignItems={'center'} direction={'column'} position={'absolute'} top={'90'} pt={"3.5%"} pb={"5%"} w={'100%'}>
        <Box w={'80%'}>
          <Table data={data}/>
        </Box>  
      </Flex> 
    </>
  )
}
