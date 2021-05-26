import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, message, Skeleton } from 'antd';
import { updateUser, checkUser, addUser } from '@/services/user';


export default function CreatOrEdit(props) {
/**
 *  isModalVisible ,modal框是否显示。
 * isShowModal，操作modal框显示隐藏的方法。
 * actionRef，父组件传来的表格的引用，可以操作表格，比如刷新表格。
 * editId只有编辑的时候才有，添加的时候是undefined,通过editId，来判断是添加功能还是编辑功能
 */
  const { isModalVisible, isShowModal, actionRef, editId } = props 

  /**
   * 将表单初始化值设置成状态，在编辑的时候，获取数据之后，修改状态，状态改变组件重新渲染，骨架屏消失表单出现
   */
  const [initialValues, setInitialValues] = useState(undefined)

  const type = editId === undefined ? '添加' : '编辑'
  useEffect(async () => {
    // 发送请求，获取用户详情
    if (editId !== undefined) {
      const response = await checkUser(editId)
      setInitialValues({
        name: response.name,
        email: response.email
      })

    }
  })
  const handleSubmit = async values => {
    let response = {}
    if (editId === undefined) {// 执行添加
      response = await addUser(values)
    } else {// 执行编辑
      response = await updateUser(editId, values)
    }
    if (response.status === undefined) {
      // 刷新表格
      actionRef.current?.reload();
      message.success(`${type}成功`);
      isShowModal(false);

    }

  }
  return (
    <Modal title={`${type}用户`} visible={isModalVisible} onCancel={() => isShowModal(false)} footer={null} destroyOnClose={true}>

      {
        /**
         * 只有在编辑的情况下，要显示的数据还没有查询到，但是有editId，此时显示骨架屏
         */
        initialValues === undefined && editId !== undefined ? <Skeleton avatar paragraph={{ rows: 4 }} /> :
          <ProForm
            initialValues={initialValues}
            onFinish={values =>
              handleSubmit(values)

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
            
            {
            /**
             * 只有添加功能有密码，由于api在编辑情况下并不能修改密码
             */
            editId !== undefined ? '' :
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

            }

          </ProForm>

      }


    </Modal>
  )
}

