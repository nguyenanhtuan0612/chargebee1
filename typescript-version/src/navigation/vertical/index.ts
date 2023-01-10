// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { AccountCashOutline } from 'mdi-material-ui'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
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
    },
  ]
}

export default navigation
