// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp';
import DotsVertical from 'mdi-material-ui/DotsVertical';

// ** Types
import { ThemeColor } from 'src/@core/layouts/types';

interface DataType {
  email: string;
  role: string;
  balance: string;
}

const data: DataType[] = [
  {
    email: 'tuananhvd1998@gmail.com',
    balance: '$24,895.65',
    role: 'Cộng tác viên'
  },
  {
    email: 'tuananhvd1998@gmail.com',
    balance: '$24,895.65',
    role: 'Cộng tác viên'
  },
  {
    email: 'tuananhvd1998@gmail.com',
    balance: '$24,895.65',
    role: 'Khách hàng'
  }
];

const TotalEarning = () => {
  return (
    <Card>
      <CardHeader
        title='Top số dư'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            $24,895
          </Typography>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 10 }}>
          CTV - tuananhvd1998@gmail.com
        </Typography>

        {data.map((item: DataType, index: number) => {
          return (
            <Box
              key={item.email}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 8.5 } : {})
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.email}
                  </Typography>
                  <Typography variant='caption'>{item.role}</Typography>
                </Box>

                <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  {item.balance}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TotalEarning;
