import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer,Tooltip } from 'recharts';
import { cancelRequest, getData } from '../../helpers/http';
import { Spinner,Button } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import styles from '../../App.module.scss'
import pageStyles from './PageTwo.module.scss'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#A52A2A','#FF4500','#808000','#7FFF00','#00FFFF','#1E90FF','#8A2BE2'];

const PageTwo = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getData()
        .then(responseData => {
          console.log(responseData);
          const formattedData = responseData.map(item => ({ name: item.name, value: +item.height }));
          if (responseData) setData(formattedData);
        })
        .catch(error => {
          console.error(error);
        });
      setIsLoading(false);
    }, 3000);

  }, []);

  const handleRouteChange = () =>  {
    cancelRequest();
    history.push('/')
  }
  return (
    <div>
      <h1>Page Two</h1>

    <Button variant='primary' className={`${styles.floatRight} my-2`} onClick={handleRouteChange} style={{zIndex:5}}>Page One</Button>
      {!isLoading && data?.length > 0 ? (
        <ResponsiveContainer width='100%' height={200} className={pageStyles.chartWrapper}>
          <PieChart width={400} height={200} className="mt-5">
            <Pie data={data} cx='50%' cy='50%' labelLine={false} label outerRadius={80} fill='#8884d8' dataKey='value'>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className='my-5 text-center'>
          {' '}
          <Spinner animation='border' variant='secondary' />
        </div>
      )}
    </div>
  );
};

export default PageTwo;
