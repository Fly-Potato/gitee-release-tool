import { TokenInfo, UserInfo } from "@/types/user";
import { create } from "zustand";

type UserInfoState = {
  /**
   * 用户信息
   */
  userInfo: UserInfo | null;
  /**
   * token信息
   */
  tokenInfo: TokenInfo | null;
  /**
   * 是否已认证
   */
  authenticated: boolean;
};

export const useUserInfoStore = create<UserInfoState>()(() => ({
  userInfo: null,
  tokenInfo: null,
  authenticated: false,
}));

/**
 * 设置用户信息
 * @param userInfo
 */
export const setUserInfo = (userInfo: UserInfo) => {
  useUserInfoStore.setState(() => ({ userInfo: userInfo }));
};

/**
 * 设置token信息
 */
export const setTokenInfo = (tokenInfo: TokenInfo) => {
  useUserInfoStore.setState(() => ({ authenticated: true }));
  useUserInfoStore.setState(() => ({ tokenInfo: tokenInfo }));
};
