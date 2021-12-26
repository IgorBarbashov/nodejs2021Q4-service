import { PORT } from './common/config';
import { app } from './app';

/**
 * Start REST service on the defined PORT
 */
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
