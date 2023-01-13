// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline';

// ** Type import
import { AccountCashOutline } from 'mdi-material-ui';
import { VerticalNavItemsType } from 'src/@core/layouts/types';
import { Account } from 'src/@core/models/UserInfo.model';
import { useEffect, useState } from 'react';

const Navigation = (): VerticalNavItemsType => {
  const [account, setAccount] = useState<Account>({ role: '', id: '', email: '', balance: 0 });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('account') || '');
    if (data) {
      setAccount(data);
    }
  }, []);

  const navbarAdmin = [
    {
      sectionTitle: 'Quản lý tài khoản'
    },
    {
      title: 'Tài khoản người dùng',
      icon: AccountCogOutline,
      path: '/management-accounts'
    },
    {
      title: 'Tài khoản tiktok',
      icon: AccountCogOutline,
      path: '/management-tiktok'
    },
    {
      sectionTitle: 'Danh mục các tài khoản'
    },
    {
      title: 'Có xu',
      icon: AccountCashOutline,
      path: '/products'
    }
  ];

  const navbarCustomer = [
    {
      title: 'Danh sách tài khoản Tiktok',
      icon: AccountCashOutline,
      path: '/'
    }
  ];

  return account.role === 'admin' ? navbarAdmin : navbarCustomer;
};

export default Navigation;
