import React, {useEffect,useState}from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { fetchDashBoard } from '@/services/dashboard';

export default function DashBoard() {


    // 定义组件状态，组件状态的改变就会引起组件的重新渲染，由于请求获取数据慢
   let [data,setData] = useState({})
    
    // 定义组件状态，状态改变会引起组件重新渲染
    useEffect(async () => {
      // 发送请求获取数据
    const resData = await fetchDashBoard()
    setData(resData)
    
    }, [])
    return (
        <div>
           <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic
            title="用户数"
            value={data.users_count}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="商品数"
            value={data.goods_count}
            precision={0}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="订单数"
            value={data.order_count}
            precision={0}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            
          />
        </Card>
      </Col>
    </Row>
        </div>
    )
}


