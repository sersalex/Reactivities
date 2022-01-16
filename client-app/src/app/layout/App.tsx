import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../api';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import {v4 as uuid} from 'uuid'; 
import agent from '../../services/api-service';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode]= useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
    
      const mappedActivities = response.map(a => {
        a.date = a.date && a.date.split('T')[0];
        return a
      }) as Activity[]

      setActivities(mappedActivities)
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(a => a.id === id))
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true)
  }

  function handleFormClose() {
    setEditMode(false)
  }

  function handleCreateOrEditActivity(activity: Activity) {
    if (activity.id) {
      agent.Activities.update(activity.id).then(() => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
      })
    } else {
      activity.id = uuid()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
    }
  }
  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(a => a.id !== id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
