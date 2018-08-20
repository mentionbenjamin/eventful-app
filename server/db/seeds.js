use saved_events;

db.dropDatabase();

db.events.insertMany([
  {
    name: "Fringe Event 2",
    venue: "Edinbrugh"
  }
])
