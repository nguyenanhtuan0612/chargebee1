// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardAppleWatch = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/top-top.jpg' />
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          Follow: 25.4k
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>50.000 đ</Typography>
        <Typography variant='body2'>TÀI KHOẢN TIKTOK VIỆT CLONE CHẤT LƯỢNG - có Cookie</Typography>
      </CardContent>
      <Button variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        Thêm vào giỏ hàng
      </Button>
    </Card>
  )
}

export default CardAppleWatch
