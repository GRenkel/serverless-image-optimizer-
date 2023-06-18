import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
const LoginForm = ({ handleOnAuthentication, authenticationError, formRef, isLoading }) => {

  return (
    <Form
      form={formRef}
      name="signin"
      initialValues={{ remember: false }}
      onFinish={handleOnAuthentication}
      style={{ textAlign: 'center' }}
    >

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Informe seu email!' }, { type: 'email', message: 'Informe um e-mail válido!' }]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Informe sua senha!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Senha"
        />
      </Form.Item>

      {authenticationError && <label style={{ color: 'red' }}>{authenticationError}</label>}

      <Form.Item
        hasFeedback
      >
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          style={{ width: "100%" }}
        >
          Entrar
        </Button>
        Or <a href='signup'>Sign Up</a>
      </Form.Item>

    </Form>
  )
}

export default LoginForm;
