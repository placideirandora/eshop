import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  OnBoarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  AddProduct: undefined;
  ProductDetail: {product: Product};
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

type ProductCategory =
  | 'Electronics'
  | 'Clothing'
  | 'Beauty'
  | 'Sports & Outdoors'
  | 'Home & Kitchen'
  | 'Toys & Games';

export type Product = {
  id: string;
  title: string;
  price: number;
  shortDescription: string;
  category: ProductCategory;
  image: string;
  manufacturingDate: string;
};

export type AccountType = 'client' | 'seller' | undefined;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: AccountType;
  token: string;
};
