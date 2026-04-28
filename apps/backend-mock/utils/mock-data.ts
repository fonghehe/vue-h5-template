export interface UserInfo {
  id: number;
  password: string;
  realName: string;
  avatar: string;
  roles: string[];
  username: string;
}

export interface ProductItem {
  id: number;
  title: string;
  imgUrl: string;
  price: string;
  vipPrice: string;
  shopDesc: string;
  delivery: string;
  shopName: string;
  description: string;
}

export const MOCK_USERS: UserInfo[] = [
  {
    id: 0,
    password: "123456",
    realName: "测试用户",
    avatar:
      "https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png",
    roles: ["user"],
    username: "user",
  },
  {
    id: 1,
    password: "123456",
    realName: "管理员",
    avatar:
      "https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png",
    roles: ["admin"],
    username: "admin",
  },
];

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: 1,
    imgUrl:
      "//img10.360buyimg.com/n2/s400x400_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg",
    title: "【活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水",
    price: "388",
    vipPrice: "378",
    shopDesc: "自营",
    delivery: "厂商配送",
    shopName: "阳澄湖大闸蟹自营店",
    description: "新鲜捕捞，顺丰冷链配送，保证鲜活到家。公蟹膏满黄肥，母蟹籽多肉嫩。",
  },
  {
    id: 2,
    imgUrl:
      "//m.360buyimg.com/mobilecms/s400x400_jfs/t1/181328/3/31476/203233/63b66ef1F60f5f0f8/f4e8c4b6df4194d6.jpg!q70.dpg.webp",
    title: "【礼券】湖塘烟雨 海鲜卡券海产提货礼品卡春节年夜饭年货生鲜过年海鲜礼盒大礼包",
    price: "598",
    vipPrice: "378",
    shopDesc: "自营",
    delivery: "厂商配送",
    shopName: "阳澄湖大闸蟹自营店",
    description: "精选海鲜礼盒，包含多种海产品，送礼体面大方。",
  },
  {
    id: 3,
    imgUrl:
      "//m.360buyimg.com/mobilecms/s400x400_jfs/t1/214199/39/25134/127357/63c2b3adFed9c98f4/54126e85c23d0893.jpg!q80.dpg",
    title:
      "苏泊尔（SUPOR） 电饭煲远红外加热IH本釜内胆 电饭锅4L智能预约家用煮饭锅一键柴火饭SF40HC81",
    price: "1759",
    vipPrice: "1749",
    shopDesc: "自营",
    delivery: "厂商配送",
    shopName: "苏泊尔官方自营店",
    description: "远红外加热，IH本釜内胆，4L大容量，一键柴火饭，智能预约。",
  },
  {
    id: 4,
    imgUrl:
      "//m.360buyimg.com/mobilecms/s1265x1265_jfs/t20280402/412326/20/12475/54533/69cf75afFc560cac6/0a02320320cce0f2.jpg!q70.dpg.webp",
    title: "Apple/苹果 iPhone 17 256GB 白色 支持移动联通电信5G 双卡双待手机",
    price: "5999",
    vipPrice: "5999",
    shopDesc: "自营",
    delivery: "京东物流",
    shopName: "华为官方自营店",
    description:
      "搭载A19芯片，6.1英寸超视网膜XDR显示屏，支持5G网络，双卡双待设计，提供卓越性能和流畅体验。",
  },
  {
    id: 5,
    imgUrl:
      "https://img10.360buyimg.com/pcpubliccms/s400x400_jfs/t1/414103/33/18764/70114/69eae2e4F9e33854b/00832ee3e88e35b0.jpg!q80.dpg",
    title: "戴森（Dyson）V12 Detect Slim 轻量智能无绳吸尘器 激光探测",
    price: "3990",
    vipPrice: "3890",
    shopDesc: "自营",
    delivery: "京东物流",
    shopName: "戴森官方旗舰店",
    description: "激光探测微尘，智能调节吸力，轻巧机身仅1.5kg。",
  },
];
