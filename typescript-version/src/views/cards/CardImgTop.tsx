// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardImgTop = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/top-top.jpg' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          Follow: 25.4k
        </Typography>
        <Typography variant='body1' sx={{ marginBottom: 2 }}>
          50.000 đ
        </Typography>
        <Typography variant='body2'>TÀI KHOẢN TIKTOK VIỆT CLONE CHẤT LƯỢNG - có Cookie</Typography>
      </CardContent>
    </Card>
  )
}

export default CardImgTop
