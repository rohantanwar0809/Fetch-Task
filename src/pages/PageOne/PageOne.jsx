import React, { useState, useEffect } from 'react';
import { getData, cancelRequest } from '../../helpers/http';
import { useHistory } from 'react-router-dom';
import { Button, Table,Spinner } from 'react-bootstrap';
import styles from '../../App.module.scss'


const PageOne = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
      console.log('running');
    setIsLoading(true);
    setTimeout(() => {
      getData()
        .then(responseData => {
          console.log(responseData);
          const formattedData = responseData && responseData.map(item => ({ id: item?.birth_year, name: item.name, gender: item.gender, height: item.height, mass: item.mass }));
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
    history.push('page-two')
  }
  return (
    <div>
      <h1>Page One</h1>
        <Button variant='primary' className={`${styles.floatRight} my-2`} onClick={handleRouteChange}>Page Two</Button>

      {!isLoading && data?.length > 0 ? (
        <Table striped bordered size='sm' className='my-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Height</th>
              <th>Mass</th>
            </tr>
            {data.map((item, idx) => (
              <tr key={`${item.id}-${idx}`}>
                <td>{item.name}</td>
                <td>{item.gender}</td>
                <td>{item.height}</td>
                <td>{item.mass}</td>
              </tr>
            ))}
          </thead>
        </Table>
      ):<div className="my-5 text-center"> <Spinner animation="border" variant="secondary" /></div>}
    </div>
  );
};

export default PageOne;
