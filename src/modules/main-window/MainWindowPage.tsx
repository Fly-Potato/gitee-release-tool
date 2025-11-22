import { useUserInfoStore } from "@/store/user";
import LoginButton from "./buttons/LoginButton";
import useListenLogin from "./hooks/listeners/useListenLogin";

const useListeners = () => {
  useListenLogin();
};

export default function MainWindowPage() {
  useListeners();

  const userInfo = useUserInfoStore((state) => state.userInfo);
  return (
    <div className="flex w-full justify-between">
      <div>{!userInfo && <LoginButton />}</div>
      <div>{userInfo && <div>{userInfo.name}</div>}</div>
    </div>
  );
}
