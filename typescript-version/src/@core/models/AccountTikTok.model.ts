export interface AccountTikTok {
  id: number;
  username: string;
  tiktokCoin: number;
  follower: number;
  like: number;
  ownedBy: string;
  title: string;
  subTitle: string;
  price: number;
  status?: any;
}

export interface SubPack {
  link: string;
  name: string;
  price: number;
}
