import { LoginData, LoginType } from "../../types"
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useLoginMutation } from "../../service/api/auth.api";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/features/user.slice";
import { useNavigate } from "react-router-dom";
import { userDataValidation } from "../../validations/user.validation";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const onFinish: FormProps<LoginType>['onFinish'] = async (values) => {
        try {
            const result = await login(values) as LoginData
            if (result.data.status_code === 200) {
                navigate('/profile');
                dispatch(setToken(result.data.data.access));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full h-screen bg-gray-100 grid place-items-center">
            <div className="max-w-[450px] w-full bg-white p-4 rounded shadow">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item<LoginType>
                        label="Phone number"
                        name="phone_number"
                        rules={userDataValidation.phone_number}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<LoginType>
                        label="Password"
                        name="password"
                        rules={userDataValidation.password}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
}

export default Login;
