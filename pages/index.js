/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import {Flex, Text, Box, Button} from '@chakra-ui/react'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Home() {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
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
        setData(data)
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
    <Flex>
            
    </Flex>
  )
}
