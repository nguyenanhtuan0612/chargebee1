// ** React Imports
import { ReactElement } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import CellphoneLink from 'mdi-material-ui/CellphoneLink';
import AccountOutline from 'mdi-material-ui/AccountOutline';

// ** Types
import { ThemeColor } from 'src/@core/layouts/types';

interface DataType {
  stats: string;
  title: string;
  color: ThemeColor;
  icon: ReactElement;
}

const renderStats = (salesData: DataType[]) => {
  return salesData.map((item: DataType, index: number) => (
    <Grid item xs={12} sm={6} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

interface Props {
  data: {
    totalAccSellLastMonth: number;
    totalAmountSellLastMonth: number;
    numUserCreatedThisMonth: number;
    numAccCreateThisMonth: number;
    numAccSoldThisMonth: number;
    amountThisMonth: number;
  };
}

const StatisticsCard = (props: Props) => {
  const trend = props.data.totalAmountSellLastMonth <= props.data.amountThisMonth ? 'tăng' : 'giảm';
  let change = 0;
  if (props.data.totalAmountSellLastMonth <= props.data.amountThisMonth) {
    if (props.data.totalAmountSellLastMonth == 0) {
      change = 100;
    } else {
      change = Math.floor((props.data.amountThisMonth / props.data.totalAmountSellLastMonth) * 100);
    }
  }

  const salesData: DataType[] = [
    {
      stats: props.data.numAccCreateThisMonth.toLocaleString('en-US'),
      color: 'warning',
      title: 'Số tài khoản đã tạo',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: props.data.numAccSoldThisMonth.toLocaleString('en-US'),
      title: 'Số tài khoản đã đã bán',
      color: 'primary',
      icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: props.data.amountThisMonth.toLocaleString('en-US') + ' VND',
      color: 'info',
      title: 'Tổng doanh thu',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: props.data.numUserCreatedThisMonth.toLocaleString('en-US'),
      title: 'Số lượng người dùng mới',
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    }
  ];

  return (
    <Card>
      <CardHeader
        title='Tình hình kinh doanh'
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Doanh thu {trend} {change.toLocaleString('en-US')}%
            </Box>{' '}
            😎 so với tháng trước
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 1]}>
          {renderStats(salesData)}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
