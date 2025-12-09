import { emitLoginEvent } from "@/events";
import useLogin from "@/hooks/mutations/useLogin";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Button, Form, Input } from "antd";
import { useEffect, useRef } from "react";

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const loginSuccessed = useRef(false);

  const [form] = Form.useForm<LoginForm>();
  const login = useLogin();
  const onLogin = (values: LoginForm) => {
    login.mutateAsync(values).then(async (tokenInfo) => {
      await emitLoginEvent("login::success", tokenInfo);
      loginSuccessed.current = true;
      getCurrentWebviewWindow().close();
    });
  };

  useEffect(() => {
    const window = getCurrentWebviewWindow();
    const listenFn = window.onCloseRequested((event) => {
      console.log("close requested");
      if (!loginSuccessed.current) {
        event.preventDefault();
      }
    });

    return () => {
      listenFn.then((unListen) => unListen());
    };
  }, []);

  return (
    <div className="p-5">
      <div className="text-center text-xl">登录</div>
      <Form form={form} onFinish={onLogin}>
        <Form.Item
          label="账号"
          name={"username"}
          required
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name={"password"}
          required
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
      <div className="flex w-full justify-center">
        <Button onClick={form.submit} type="primary" loading={login.isPending}>
          登录
        </Button>
      </div>
    </div>
  );
}
