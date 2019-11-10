import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";

const eventsFromDashboard = [
  {
    id: "1",
    title: "Welcome to the Meat Show",
    date: "2018-03-27T11:00:00+00:00",
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
    date: "2018-03-28T14:00:00+00:00",
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
    isOpen: false
  };

  handleIsOpenToggle = () => {
    this.setState(({ isOpen }) => ({
      //destructured prevState.isOpen -> !prevState.isOpen
      isOpen: !isOpen //toggle button
    }));
  };

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/kamo_k.png";
    this.setState(({ events }) => ({
      events: [...events, newEvent], //spread operator... - takes array of events, and spreads them out
      isOpen: false
    }));
  };

  render() {
    const { events, isOpen } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleIsOpenToggle}
            positive
            content="Create Event"
          />
          {isOpen && (
            <EventForm
              createEvent={this.handleCreateEvent}
              cancelFormOpen={this.handleIsOpenToggle}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
