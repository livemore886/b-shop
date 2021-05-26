import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Avatar, Switch, message } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { addUser, getUserList, lockUser } from '@/services/user';
import Creat from './components/Creat';
import Edit from './components/Edit';
import CreatOrEdit from './components/CreatOrEdit';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};


export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [editId, setEditId] = useState(undefined);

  const isShowModal = (show,id=undefined) => {
    setEditId(id)
    setIsModalVisible(show);
  };
  
  // const isShowModalEdit = (show,id) => {
  //   setIsModalVisibleEdit(show);
  //   setEditId(id)
  // };
  // 表格的ref，便于自定义操作表格
  const actionRef = useRef<ActionType>();

  const createUser = async values => {
    const response = await addUser(values)
    if (response.status === undefined) {
      // 刷新表格
      actionRef.current?.reload();
      message.success('添加成功');
      setIsModalVisible(false);

    }
  }

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '头像',
      dataIndex: 'avatar_url',
      hideInSearch: true,
      render: (_, record) => <Avatar src={record.avatar_url} size={32} icon={<UserOutlined />} />
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '是否禁用',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (_, record) => <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={record.is_locked === 0}
        onChange={async () => {
          const response = await lockUser(record.id)
          if (response.status === undefined) {
            message.success('操作成功')
          } else {
            message.error('操作失败')
          }
  
        }} />
    },
    {
      title: '创建时间',
      dataIndex: 'creat_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      render: (_, record) => <a onClick={ () => isShowModal(true,record.id)}>编辑</a>
    },
  ];
  
  

  return (
    <PageContainer>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) =>
          getUserList(params)
        }

        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}

        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => isShowModal(true)}>
            新建
          </Button>,

        ]}
      />
     
        
        { 
        // modal框隐藏的时候不挂在组件，显示的时候挂在组件，这样是为了触发子组件的生命周期，生命周期里执行数据查询操作
           !isModalVisible ? '' 
           :
           <CreatOrEdit
           isModalVisible={isModalVisible}
           isShowModal={isShowModal}
           actionRef={actionRef} 
           editId={editId}/>
        }
       
    </PageContainer>
  );
};



