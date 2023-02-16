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

export type Product = {
  id: number;
  title: string;
  price: number;
  shortDescription: string;
  category: string;
  image: string;
  manufacturingDate: string;
};
