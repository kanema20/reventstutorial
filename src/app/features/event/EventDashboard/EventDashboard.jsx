import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";

const eventsFromDashboard = [
  {
    id: "1",
    title: "Welcome to the Meat Show",
    date: "2019-11-27",
    category: "culture",
    description: "Just dont fight it.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Striking Vipers",
    hostPhotoURL:
      "https://media.licdn.com/dms/image/C4D03AQFciQFAI1KhQw/profile-displayphoto-shrink_200_200/0?e=1579132800&v=beta&t=mZYg2ny5gOmqCNPE_3r7_wQnFuqMMYYzaiPvNPNRtdQ",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL:
          "https://media.licdn.com/dms/image/C4E03AQE7bRwKe79xmg/profile-displayphoto-shrink_200_200/0?e=1579132800&v=beta&t=hVGDauE-wiSqiotJz_CRVvTOMPX6zS1IdxPPVLDPWxk"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Trip to the Pyramids of Egypt",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Billy",
    hostPhotoURL:
      "https://cust-images.grenadine.co/grenadine/image/upload/c_fill,f_jpg,g_face,h_368,w_368/v0/StargatetotheCosmos/oqlm_50.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL:
          "https://media.licdn.com/dms/image/C4E03AQE7bRwKe79xmg/profile-displayphoto-shrink_200_200/0?e=1579132800&v=beta&t=hVGDauE-wiSqiotJz_CRVvTOMPX6zS1IdxPPVLDPWxk"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];

class EventDashboard extends Component {
  state = {
    events: eventsFromDashboard,
    isOpen: false,
    selectedEvent: null
  };

  // handleIsOpenToggle = () => {
  //   this.setState(({ isOpen }) => ({
  //     //destructured prevState.isOpen -> !prevState.isOpen
  //     isOpen: !isOpen //toggle button
  //   }));
  // };

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    });
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/kamo_k.png";
    this.setState(({ events }) => ({
      events: [...events, newEvent], //spread operator... - takes array of events, and spreads them out
      isOpen: false
    }));
  };

  handleSelectEvent = (evt, event) => {
    console.log(evt);
    console.log(event);
    this.setState({
      selectedEvent: event,
      isOpen: true
    });
  };

  handleUpdateEvent = updatedEvent => {
    this.setState(({ events }) => ({
      events: events.map(event => {
        //this event currently lives inside our state
        if (event.id === updatedEvent.id) {
          return { ...updatedEvent };
        } else {
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null
    }));
  };

  handleDeleteEvent = id => {
    this.setState(({ events }) => ({
      events: events.filter(e => e.id !== id) //creates new array - returns the events w specified filter
    })); //previous state events
  };

  render() {
    const { events, isOpen, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            selectEvent={this.handleSelectEvent}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleCreateFormOpen}
            positive
            content="Create Event"
          />
          {isOpen && (
            <EventForm
              key={selectedEvent ? selectedEvent.id : 0}
              updateEvent={this.handleUpdateEvent}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              cancelFormOpen={this.handleFormCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
