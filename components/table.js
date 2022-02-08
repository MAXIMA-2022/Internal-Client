/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import MaterialTable from 'material-table'
import { forwardRef, useEffect, useState } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import Swal from 'sweetalert2'

import {
  Flex, 
  Box, 
  Button, 
  Switch, 
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'

import Link from 'next/link'

import {
  ChevronDownIcon
} from '@chakra-ui/icons'
import axios from 'axios';
import {useRouter} from 'next/router'

const Table = ({data}) => {
  const [datamhs, setDataMhs] = useState([])
  const router = useRouter()

  let columns

  if(sessionStorage.getItem('divisi') === "bph"){
    columns = [
      {
        title: "NIM",
        field: "nim",
      },
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Email",
        field: "email",
      },
      {
        title: "Token",
        field: "token",
      },
      {
        title: "id",
        field: "id",
        hidden: true
      },
      {
        title: "Divisi",
        field: "divisi",
      },
    ]
  } else{
    columns = [
      {
        title: "NIM",
        field: "nim",
      },
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Email",
        field: "email",
      },
      {
        title: "Token",
        field: "token",
      },
      {
        title: "id",
        field: "id",
        hidden: true
      },
      {
        title: "form",
        field: "form",
      },
      {
        title: "interview",
        field: "interview",
      },
    ]
  }

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  }

  const statusForm = async (id)=>{
    try{
      const res = await axios.put(`https://api.mxm.one/api/divisi/registrants/formSelection/${id}`, "", {
        headers:{
          "x-access-token": sessionStorage.getItem('token')
        }
      })
      let lulusSeleksiForm = "Tidak Lulus"
      if(res.data.lulusSeleksiForm === 1){
        lulusSeleksiForm = "Lulus"
      } else if(res.data.lulusSeleksiForm === 0){
        lulusSeleksiForm = "Tidak Lulus"
      }
      Swal.fire(
        'Pengubahan Status Berhasil',
        `${lulusSeleksiForm}`,
        'success'
      )
      router.reload(window.location.pathname)
    }catch(err){
      Swal.fire({
        icon: 'error',
        text: `${err.response.data.message}`,
        title: 'Perubahan status Gagal',
      })
    }
  }

  const statusInterview = async (id)=>{
    try{
      const res = await axios.put(`https://api.mxm.one/api/divisi/registrants/interview/${id}`, "", {
        headers:{
          "x-access-token": sessionStorage.getItem('token')
        }
      })
      let lulusInterview = "Tidak Lulus"
      if(res.data.lulusInterview === 1){
        lulusInterview = "Lulus"
      } else if(res.data.lulusInterview === 0){
        lulusInterview = "Tidak Lulus"
      }
      Swal.fire(
        'Pengubahan Status Berhasil',
        `${lulusInterview}`,
        'success'
      )
      router.reload(window.location.pathname)
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
      <MaterialTable
        style={{zIndex: 1}}
        title="Registrant Tables"
        data={data}
        columns={columns}
        icons={tableIcons}
        options={{ 
          search: true, 
          paging: true, 
          exportButton: true,
          actionsColumnIndex: -1,
          toolbarButtonAlignment:"left" 
        }}
        localization={{
          header:{
            actions: "Menu"
          }
        }}
        actions={[
          {
            icon: 'check',
            tooltip: "Delete User",
          },
        ]}
        components={{
          Action: (props) => {
            if(props.action.icon === 'check'){
              return(
                <>
                {sessionStorage.getItem('divisi') === "bph" ? 
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    :
                  </MenuButton>
                  <MenuList textColor={'white'} bgColor={'#1a202c'} _hover={{textColor: 'white'}} >
                    <MenuItem _hover={{bgColor: "#1a202c"}}><Link href={`/${props.data.id}`}>Details</Link></MenuItem>
                  </MenuList>
                </Menu>
                :
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    :
                  </MenuButton>
                  <MenuList textColor={'white'} bgColor={'#1a202c'} _hover={{textColor: 'white'}} >
                    <MenuItem _hover={{bgColor: "#1a202c"}}><Link href={`/${props.data.id}`}>Details</Link></MenuItem>
                    <MenuItem onClick={()=>statusForm(props.data.id)} _hover={{bgColor: "#1a202c"}}>Ubah Status Form</MenuItem>
                    <MenuItem onClick={()=>statusInterview(props.data.id)} _hover={{bgColor: "#1a202c"}}>Ubah Status Interview</MenuItem>
                  </MenuList>
                </Menu>
                }
                </>
              )
            }
          }
        }}
      />
    </>
  );
}
 
export default Table;