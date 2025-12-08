import { Form, Input } from "antd";

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [form] = Form.useForm<LoginForm>();

  const onLogin = (values: LoginForm) => {
    console.log(values);
  };

  return (
    <div>
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
    </div>
  );
}
