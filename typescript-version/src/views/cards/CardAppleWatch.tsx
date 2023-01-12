// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { AccountTikTok } from 'src/@core/modals/AccountTikTok.model'

interface PropsProduct {
  data: AccountTikTok
}

const CardAppleWatch = (props: PropsProduct) => {
  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/image-default-tiktok.png' />
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Typography sx={{ marginBottom: 2 }}>{props.data.price | 0} đ</Typography>
        <Typography variant='body2'>Số xu: {props.data.tiktokCoin}</Typography>
      </CardContent>
      <Button variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        Mua ngay
      </Button>
    </Card>
  )
}

export default CardAppleWatch
