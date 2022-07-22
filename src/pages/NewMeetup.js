import NewMeetupForm from "../components/meetups/NewMeetupForm";
import {useNavigate} from 'react-router-dom';
const NewMeetupPage = (props) => {
  
    const navigate = useNavigate();

  function addMeetupHandler(meetupData){

    fetch('https://react-getting-started-ca136-default-rtdb.firebaseio.com/meetups.json', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-type': 'application/json'
      }
    }).then( ()=> {
      navigate('/');
    } );

  }

  return (
    <section>
      <h1>Add New Meet up</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
};

export default NewMeetupPage;
