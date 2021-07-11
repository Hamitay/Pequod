import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import ContainerList from './components/ContainerList';
import PequodAppBar from './components/PequodAppBar';

const fetchContainerData = async () => {
  const containerData = await axios.get('http://pequod.hamitay.com/containers');
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
    <Fragment>
      <PequodAppBar />
      <ContainerList containers={containers} />
    </Fragment>
  );
};

export default MainPage;
