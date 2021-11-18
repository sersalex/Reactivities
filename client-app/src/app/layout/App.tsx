import React, { Fragment, useEffect, useState } from 'react';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../../api';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { $api } from '../../services/api-service';
import NavBar from './NavBar';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    $api.apiActivitiesGet()
    .then(response => setActivities(response.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities}></ActivityDashboard>
      </Container>
    </Fragment>
  );
}

export default App;
