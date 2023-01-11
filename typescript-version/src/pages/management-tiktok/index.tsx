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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

const ManagementTikTok = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Danh sách tài khoản tiktok' titleTypographyProps={{ variant: 'h6' }} />
          <Stack direction='row' justifyContent='flex-end' alignItems='flex-start' spacing={2} mb={4.5}>
            <Button onClick={handleOpen}>Thêm tài khoản</Button>
            <Button onClick={handleOpen}>Nhập excel</Button>
            <Modal
              keepMounted
              open={open}
              onClose={handleClose}
              aria-labelledby='keep-mounted-modal-title'
              aria-describedby='keep-mounted-modal-description'
            >
              <Box sx={style}>
                <Typography id='keep-mounted-modal-title' variant='h6' component='h2'>
                  Text in a modal
                </Typography>
                <Typography id='keep-mounted-modal-description' sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
              </Box>
            </Modal>
          </Stack>

          <TableStickyHeader />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ManagementTikTok
