import React, {PureComponent} from 'react';
import {PieChart, Pie, ResponsiveContainer} from 'recharts';
import {Card, Col} from 'react-bootstrap';
import HeartOutlineIcon from 'mdi-react/HeartOutlineIcon';

const data = [{value: 68, fill: '#ff4861'},
    {value: 32, fill: '#eeeeee'}];

export default class HeartRate extends PureComponent {
    render() {
        return (
            <Col md={12} xl={3} lg={6} sm={12} xs={12}>
                <Card>
                    <Card.Body className='dashboard__health-chart-card'>
                        <div className='card__title'>
                            <h5 className='bold-text'>Growls</h5>
                        </div>
                        <div className='dashboard__health-chart'>
                            <ResponsiveContainer height={180}>
                                <PieChart>
                                    <Pie data={data} dataKey='value' cy={85} innerRadius={80} outerRadius={90}/>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className='dashboard__health-chart-info'>
                                <HeartOutlineIcon style={{fill: '#ff4861'}}/>
                                <p className='dashboard__health-chart-number'>96</p>
                                <p className='dashboard__health-chart-units'>b/min</p>
                            </div>
                        </div>
                        <p className='dashboard__goal'>Reference: 58-120</p>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}
