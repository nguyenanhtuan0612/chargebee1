// ** MUI Imports
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { AccountTikTok } from 'src/@core/models/AccountTikTok.model';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NumericFormat } from 'react-number-format';

interface PropsProduct {
  data: AccountTikTok;
}

const CardAppleWatch = (props: PropsProduct) => {
  const [exchangeRate, setExchangRate] = useState(0);

  useEffect(() => {
    async function fetch() {
      const url = 'http://localhost:5001/api/configs';
      const res = await axios.get(url);
      setExchangRate(res.data.exchangeRate);
    }

    fetch();
  }, []);

  const calculatePrice = (coin: number) => {
    const price = ((((coin * exchangeRate) / 100) % 1000) + 1) * 1000;

    return price;
  };

  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/image-default-tiktok.png' />
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Typography sx={{ marginBottom: 2 }}>
          Giá bán:
          <NumericFormat
            thousandSeparator
            suffix=' VND'
            value={props.data.price | calculatePrice(props.data.tiktokCoin) | 0}
            displayType={'text'}
          />
        </Typography>
        <Typography variant='body2'>
          Số xu: <NumericFormat thousandSeparator value={props.data.tiktokCoin | 0} displayType={'text'} />
        </Typography>
      </CardContent>
      <Button variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        Mua ngay
      </Button>
    </Card>
  );
};

export default CardAppleWatch;
