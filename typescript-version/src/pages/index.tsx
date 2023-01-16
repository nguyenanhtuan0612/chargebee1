// ** MUI Imports
import Grid from '@mui/material/Grid';

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd';
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline';
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline';

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table';
import Trophy from 'src/views/dashboard/Trophy';
import TotalEarning from 'src/views/dashboard/TotalEarning';
import StatisticsCard from 'src/views/dashboard/StatisticsCard';
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview';
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw';
import SalesByCountries from 'src/views/dashboard/SalesByCountries';
import { useEffect, useState } from 'react';
import { Account } from 'src/@core/models/UserInfo.model';
import Product from './products';

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>

        {/* <Grid item xs={12} md={6} lg={6}>
          <WeeklyOverview />
        </Grid> */}
        <Grid item xs={12} md={6} lg={6}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber=''
                title='Nạp nhiều tiền nhất'
                subtitle='tuananhvd1998@gmail.comt'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardStatisticsVerticalComponent
                stats='78'
                title='Mua nhiều tài khoản nhất'
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
                title='CTV mua nhiều tiền nhất'
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
                title='KH mua nhiều tiền nhất'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
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
