import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import loginRoutes from "./authentication/log_in.js";
import pinLoginRoutes from "./authentication/pin_log_in.js";
import signUpRoute from "./authentication/sign_up.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", signUpRoute);
app.use("/auth", loginRoutes);
app.use("/auth", pinLoginRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
