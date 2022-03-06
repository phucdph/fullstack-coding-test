export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
}

export interface IPost {
  id: string;
  image: string;
  title: string;
  content: string;
  created_at: string;
  description: string;
  est_reading_time: 1;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  updated_at: string;
}
