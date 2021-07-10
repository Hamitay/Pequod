import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ContainerList from './components/ContainerList';

const fetchContainerData = async () => {
  const containerData = await axios.get('http://localhost:5000/containers');
  return containerData.data;
};

const MainPage = () => {
  const [containers, setContainers] = useState([]);

  const populateContainers = async () => {
    const containersData = await fetchContainerData();
    setContainers(containersData);
  };

  useEffect(() => populateContainers(), []);

  return (
    <div>
      <ContainerList containers={containers}/>
    </div>
  );
};

export default MainPage;
