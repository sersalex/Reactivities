import React, { useEffect, useState } from 'react';
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../../api';
import { $api } from '../../services/api-service';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    $api.apiActivitiesGet()
    .then(response => setActivities(response.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities"/>
      <header className="App-header">
        <List>
          {activities.map(a => (
            <List.Item key={a.title}>{a.title}</List.Item>
          ))}
        </List>
      </header>
    </div>
  );
}

export default App;
