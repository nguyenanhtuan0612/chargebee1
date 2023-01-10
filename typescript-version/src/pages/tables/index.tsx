// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import { Button, Modal } from '@mui/material'
import { Box } from 'mdi-material-ui'
import { useState } from 'react'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

const MUITable = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Quản lý tài khoản' titleTypographyProps={{ variant: 'h6' }} />
          <div>
            <Button onClick={handleOpen}>Thêm tài khoản</Button>
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
          </div>
          <TableStickyHeader />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
