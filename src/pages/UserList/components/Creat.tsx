import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import {  Modal ,message} from 'antd';
import { addUser} from '@/services/user';

export default function Creat(props) {

    const {isModalVisible,isShowModal,actionRef} = props
    
    const createUser = async values => {
        const response = await addUser(values)
        if (response.status === undefined) {
          // 刷新表格
          actionRef.current?.reload();
          message.success('添加成功');
          isShowModal(false);
    
        }
      }
    return (
        <Modal title="添加用户" visible={isModalVisible} onCancel={()=>isShowModal(false)} footer={null} destroyOnClose={true}>
        <ProForm
          onFinish={values =>
            createUser(values)

          }

        >
          <ProFormText
            width="md"
            name="name"
            label="昵称"
            placeholder="请输入昵称"
            rules={[
              { required: true, message: '请输入昵称' }
            ]}
          />
          <ProFormText
            width="md"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            rules={[
              { required: true, type: 'email', message: '邮箱格式不正确' }
            ]}
          />
          <ProFormText.Password
            width="md"
            name="password"
            label="密码"
            placeholder="请输入密码"
            rules={[
              { required: true, message: '邮箱格式不正确' },
              { min: 6, message: '密码最小6位' }
            ]}
          />
        </ProForm>
      </Modal>
    )
}

