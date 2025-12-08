export type TokenInfo = {
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

export type UserInfo = {
  id: number;
  name: string;
  repos_url: string;
};
