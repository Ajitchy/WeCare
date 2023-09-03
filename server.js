const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom route for coach login
server.get('/coaches', (req, res) => {
  const { id, password } = req.query;
  console.log(`Received login request: ID=${id}, Password=${password}`);
  const coaches = router.db.get('coaches').value();

  const coach = coaches.find((coach) => coach.id === id && coach.password === password);

  if (coach) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

server.use(router);

server.listen(8080, () => {
  console.log('JSON Server is running on port 8080');
});
