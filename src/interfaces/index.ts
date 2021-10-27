export interface IUser {
  id: number;
  email: string;
  name: string;
  about_me: string;
  role_id: number;
  role: IRole;
  phone: string;
  avatar: string;
  follows: number[];
  comment_replies_notification?: boolean;
  comment_rating_notification?: boolean;
  special_report_notification?: boolean;
  created_at: string;
}
export interface IRole {
  id: number;
  name: string,
  slug: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string | null;
}
export interface IPost {
  id: number;
  views_count: number;
  comments_count: number;
  title: string;
  image: string;
  micro_image: string;
  description: string;
  meta_description: string;
  rating: number;
  category: ICategory;
  user: IUser;
  tags: ITag[];
  slug: string;
  created_at: string;
  updated_at: string;
  published_at: string;
}
export interface ICategory {
  id: number;
  name: string;
  image: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  slug: string;
}
export interface ITag {
  id: number;
  name: string;
  slug: string;
  locale: string;
  meta_title?: string;
  meta_description?: string;
  views_count: string;
  created_at: string;
}
export interface IComment {
  id: number;
  rating: number;
  text: string;
  image?: string;
  created_at: string;
  reply_user: IUser;
  parent_id: number;
  parent: IComment[];
  children: IComment[];
  user: IUser;
  post?: IPost;
}
export interface INotificationState {
  id: number;
  notification: string;
  type: string;
  created_at: string;
  user: IUser;
  foreign_user: IUser;
  post: IPost;
}
export interface ICurrency {
  Ccy: 'USD' | 'RUB' | 'EUR';
  Diff: number;
  Rate: number;
}
export interface IWeather {
  id: string;
  city: string;
  data: {
    icon: string;
    temp: number
  };
}
export interface INotification {
  message: string;
  success: boolean | null;
}