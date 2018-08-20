use saved_events;

db.dropDatabase();

db.items.insertMany([
  {
    name: "Fringe Event 2",
    venue: "Edinbrugh"
  }
])
