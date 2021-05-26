import React ,{useEffect,useState}from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import {  Modal ,message} from 'antd';
import { updateUser,checkUser} from '@/services/user';
import Skeleton from '@ant-design/pro-skeleton';

export default function Edit(props) {

    const {isModalVisible,isShowModal,actionRef,editId} = props
  const [initialValues,setInitialValues] = useState(undefined)

    
    useEffect(async ()=>{
       // 发送请求，获取用户详情
       if(editId !==undefined){
        const response =  await checkUser(editId)
        setInitialValues({
          name:response.name,
          email:response.email
        })
       
      }
    })
    
    const editUser = async values => {
        const response = await updateUser(editId,values)
        if (response.status === undefined) {
          // 刷新表格
          actionRef.current?.reload();
          message.success('更新成功');
          isShowModal(false);
    
        }
      }


    return (
        <Modal title="编辑用户" visible={isModalVisible} onCancel={()=>isShowModal(false)} footer={null} destroyOnClose={true}>

          {
            initialValues===undefined ? <Skeleton type="list" /> :
            <ProForm
        initialValues={initialValues}
          onFinish={values =>
            editUser(values)

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

          }
        
        
      </Modal>
    )
}

