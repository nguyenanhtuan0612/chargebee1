// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { AccountCashOutline } from 'mdi-material-ui'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Management Account',
      icon: AccountCogOutline,
      path: '/account-settings'
    },

    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    {
      sectionTitle: 'Danh mục các tài khoản'
    },
    {
      title: 'Live stream',
      icon: AccountCashOutline,
      path: '/cards'
    },
    {
      title: 'Idol',
      icon: AccountCashOutline,
      path: '/typography'
    },
    {
      title: 'Ẩm thực',
      path: '/icons',
      icon: AccountCashOutline
    },
    {
      title: 'Review phim',
      icon: AccountCashOutline,
      path: '/tables'
    },
    {
      title: 'Giải trí',
      icon: AccountCashOutline,
      path: '/form-layouts'
    }
  ]
}

export default navigation
