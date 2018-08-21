use saved_events;

db.dropDatabase();

db.eventsdv.insertMany([
  {
    name: "Fringe Event 2",
    venue: "Edinbrugh"
  }
])
