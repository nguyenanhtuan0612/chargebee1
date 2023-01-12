// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import { Button, Modal, Stack } from '@mui/material'
import { Box } from 'mdi-material-ui'
import { useState } from 'react'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import ModalRegister from 'src/@core/layouts/components/ModalRegister'
import axios from 'axios'

const stylePopup = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4
}

const ManagementTikTok = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const importExcel = (e: any) => {
    const formData = new FormData()
    formData.append('excel', e.target.files[0])
    const url = 'http://localhost:5001/api/tiktokAccount/importTiktokAccountCoin'
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6IjRkMzU2MDdhLWFjYWEtNDc3NS05OGVhLTliMWRkYTVlYjg3MCIsImlhdCI6MTY3MzA2Mjg5OCwiZXhwIjoxNzA0NTk4ODk4fQ.hjnpzFJWG52YXKhX_n_bm1TYH5z77k6wC3_NNcR5Ii8'
    const header = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }
    const data = axios
      .post(url, formData, header)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Danh sách tài khoản tiktok' titleTypographyProps={{ variant: 'h6' }} />
          <Stack direction='row' justifyContent='flex-end' alignItems='flex-start' spacing={2} mb={4.5}>
            <Button onClick={handleOpen}>Thêm tài khoản</Button>
            <Button variant='contained' component='label'>
              Nhập excel
              <input
                hidden
                type='file'
                accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                onChange={importExcel}
              />
            </Button>
          </Stack>

          <TableStickyHeader />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ManagementTikTok
