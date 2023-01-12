// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

// ** Icons Imports
const FormLayoutsBasic = () => {
  return (
    <Card>
      <CardHeader title='Thêm tài khoản tiktok' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Email'
                placeholder='Nhập email'
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Mật khẩu'
                placeholder='Nhập mật khẩu'
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='Xu tiktok'
                label='Xu tiktok'
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button fullWidth type='submit' variant='contained'>
                  Thêm
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsBasic
