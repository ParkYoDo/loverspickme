export interface userState {
  uid?: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  postcode?: number;
  address?: string;
  detailaddress?: string;
  wish?: string[];
  cart?: { item: string; count: number | { item: number; count: number }[] }[];
  order?: {
    orderQueue: { item: string; count: number | { item: number; count: number }[] }[];
    price: number;
    receiverPostCode: number;
    receiverAddress: string;
    receiverDetailAddress: string;
    receiverDeliveryMemo: string;
    receiverName: string;
    receiverPhone: string;
    time: string;
  }[];
}

export interface productState {
  id?: string;
  name?: string;
  price?: number;
  new?: boolean;
  best?: boolean;
  image?: string;
  detailImage?: string[];
  option?: string[];
}

export type orderQueueState = {
  order: { item: string; count: number | { item: number; count: number }[] }[];
  time: string;
  price: number;
  receiverName: string;
  receiverPhone: string;
  receiverPostCode: number;
  receiverAddress: string;
  receiverDetailAddress: string;
  receiverDeliveryMemo: string;
  item: string;
  count: number | { item: number; count: number }[];
}[];

export interface kakaoLoginUserInterface {
  uid?: string;
  image?: string;
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  detailaddress?: string;
}

export interface noticeInterface {
  firstNotice: string[];
  lastNotice: string[];
}

export interface optionInferface {
  item: string;
  count: number | { item: number; count: number }[];
  [key: string]: string | number | { item: number; count: number }[];
}

export interface selectOptionInterface {
  item: number;
  count: number;
}

export interface commentInterface {
  id: string;
  name: string;
  productId: string;
  time: Date;
  title: string;
  writerUid: string;
  content: string;
}

export interface inquiryInterface extends commentInterface {}

export interface receiverInfoInterface {
  receiverName: string;
  receiverPhone: string;
  receiverPostCode: number;
  receiverAddress: string;
  receiverDetailAddress: string;
  receiverDeliveryMemo: string;
  selfDeliveryMemoContent: string;
}

export interface errorCodeInterface {
  emailErr?: string;
  passwordErr?: string;
  nameErr?: string;
  phoneErr?: string;
  addressErr?: string;
  detailAddressErr?: string;
}

export interface inputInterface {
  image?: string;
  email?: string;
  password?: string;
  checkpassword?: string;
  name?: string;
  phone?: string;
  postcode?: number;
  address?: string;
  detailaddress?: string;
}
