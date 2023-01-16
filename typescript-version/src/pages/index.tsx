// ** MUI Imports
import Grid from '@mui/material/Grid';

// ** Icons Imports

// ** Custom Components Imports

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Account } from 'src/@core/models/UserInfo.model';
import StatisticsCard from 'src/views/dashboard/StatisticsCard';
import Trophy from 'src/views/dashboard/Trophy';
import Product from './products';

const Dashboard = () => {
  const [data, setData] = useState({
    totalAccSellLastMonth: 0,
    totalAmountSellLastMonth: 0,
    numUserCreatedThisMonth: 0,
    numAccCreateThisMonth: 0,
    numAccSoldThisMonth: 0,
    amountThisMonth: 0
  });
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleCloseLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    async function name() {
      const token = localStorage.getItem('token');
      await axios
        .get(`${process.env.apiUrl}/api/dataDashboard`, {
          headers: {
            authorization: 'Bearer ' + token
          }
        })
        .then(res => {
          handleCloseLoading();
          setData(res.data);
        })
        .catch(() => handleCloseLoading());
    }

    name();
  }, []);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy data={data} />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard data={data} />
        </Grid>

        {/* <Grid item xs={12} md={6} lg={6}>
          <WeeklyOverview />
        </Grid> */}

        {/* <Grid item xs={12} md={6} lg={6}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber=''
                title='Nạp nhiều tiền nhất tháng'
                subtitle='tuananhvd1998@gmail.comt'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardStatisticsVerticalComponent
                stats='78'
                title='Mua nhiều tài khoản nhất tháng'
                trend='negative'
                color='secondary'
                trendNumber=''
                subtitle='tuananhvd1998@gmail.com'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardStatisticsVerticalComponent
                stats='862 VND'
                trend='negative'
                trendNumber=''
                title='CTV mua nhiều tiền nhất tháng'
                subtitle='tuananhvd1998@gmail.com'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardStatisticsVerticalComponent
                stats='152,000 VND'
                color='warning'
                trend='negative'
                trendNumber=''
                subtitle='tuananhvd1998@gmail.com'
                title='KH mua nhiều tiền nhất tháng'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TotalEarning />
        </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid> */}
        {/* <Grid item xs={12}>
          <Table />
        </Grid> */}
      </Grid>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </ApexChartWrapper>
  );
};

const Home = () => {
  const [account, setAccount] = useState<Account>({ role: '', id: '', email: '', balance: 0 });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('account') || '{}');
    if (data) {
      setAccount(data);
    }
  }, []);

  return account.role === 'admin' ? <Dashboard /> : <Product />;
};

export default Home;
