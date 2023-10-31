import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';

function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'Plan099',
    price: '9.99',
    description: ['10 courses', 'Email support'],
    buttonText: 'Subscribe now',
    buttonVariant: 'outlined',
    frequency: 'year',
    link: 'https://legendsonlyhkt.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Plan099-USD-Yearly&subscription_items[quantity][0]=1&layout=in_app'
  },
  {
    title: 'Plan499',
    price: '49.99',
    description: ['50 courses', 'Phone & email support'],
    buttonText: 'Subscribe now',
    buttonVariant: 'outlined',
    frequency: 'year',
    link: 'https://legendsonlyhkt.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Plan499-USD-Yearly&subscription_items[quantity][0]=1&layout=in_app'
  },
  {
    title: 'Plan999',
    price: '99.99',
    description: ['100 courses', 'Phone & email support'],
    buttonText: 'Subscribe now',
    buttonVariant: 'outlined',
    frequency: 'year',
    link: 'https://legendsonlyhkt.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Plan999-USD-Yearly&subscription_items[quantity][0]=1&layout=in_app'
  },
  {
    title: 'Plan1999',
    price: '199.90',
    description: ['200 courses', 'Priority email support'],
    buttonText: 'Subscribe now',
    buttonVariant: 'outlined',
    frequency: 'year',
    link: 'https://legendsonlyhkt.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Plan199-USD-Yearly&subscription_items[quantity][0]=1&layout=in_app'
  },
  {
    title: 'Plan4999',
    price: '499.00',
    description: ['500 courses', 'Phone & email support'],
    buttonText: 'Subscribe now',
    buttonVariant: 'outlined',
    frequency: 'year',
    link: 'https://legendsonlyhkt.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Plan4999-USD-Yearly&subscription_items[quantity][0]=1&layout=in_app'
  },
  {
    title: 'Vip-Now',
    price: '15.00',
    description: ['50 courses', 'Phone & email support'],
    buttonText: 'Subscribe now',
    buttonVariant: 'outlined',
    frequency: 'week',
    link: 'https://legendsonlyhkt.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Vip-Now-USD-Weekly&subscription_items[quantity][0]=1&layout=in_app'
  }
];
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations']
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one']
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource']
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use']
  }
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
  const router = useRouter();

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position='static'
        color='default'
        elevation={0}
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        {/* <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            Company name
          </Typography>
          <nav>
            <Link variant='button' color='text.primary' href='#' sx={{ my: 1, mx: 1.5 }}>
              Features
            </Link>
            <Link variant='button' color='text.primary' href='#' sx={{ my: 1, mx: 1.5 }}>
              Enterprise
            </Link>
            <Link variant='button' color='text.primary' href='#' sx={{ my: 1, mx: 1.5 }}>
              Support
            </Link>
          </nav>
          <Button href='#' variant='outlined' sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar> */}
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth='sm' component='main' sx={{ pt: 8, pb: 6 }}>
        <Typography component='h1' variant='h2' align='center' color='text.primary' gutterBottom>
          Pricing
        </Typography>
        {/* <Typography variant='h5' align='center' color='text.secondary' component='p'>
          Quickly build an effective pricing table for your potential customers with this layout. It&apos;s built with
          default MUI components with little customization.
        </Typography> */}
      </Container>
      {/* End hero unit */}
      <Container maxWidth='md' component='main'>
        <Grid container spacing={5} alignItems='flex' mb={4}>
          {tiers.map(tier => (
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center'
                  }}
                  sx={{
                    backgroundColor: theme =>
                      theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2
                    }}
                  >
                    <Typography fontFamily={'Inter'} component='h2' variant='h3' color='text.primary'>
                      ${tier.price}
                    </Typography>
                    <Typography fontFamily={'Inter'} variant='h6' color='text.secondary'>
                      /{tier.frequency}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map(line => (
                      <Typography component='li' variant='subtitle1' align='center' key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      router.push(tier.link);
                    }}
                    fullWidth
                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      {/* <Container
        maxWidth='md'
        component='footer'
        sx={{
          borderTop: theme => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6]
        }}
      >
        <Grid container spacing={4} justifyContent='space-evenly'>
          {footers.map(footer => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant='h6' color='text.primary' gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href='#' variant='subtitle1' color='text.secondary'>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container> */}
      {/* End footer */}
    </ThemeProvider>
  );
}
