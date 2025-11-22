import { TokenInfo, UserInfo } from "@/types/user";
import { create } from "zustand";
type TokenInfoState = {
  tokenInfo: TokenInfo | null;
  setTokenInfo: (tokenInfo: TokenInfo | null) => void;
};

export const useTokenInfoStore = create<TokenInfoState>((set) => ({
  tokenInfo: null,
  setTokenInfo: (tokenInfo) => set({ tokenInfo }),
}));

type UserInfoState = {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
};

export const useUserInfoStore = create<UserInfoState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
}));
