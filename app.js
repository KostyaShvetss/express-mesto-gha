const {PORT = 3000, MONGO_URL = "mongodb://localhost:27017/mestodb"} = process.env;
const a = 4;
const b = 8;
const sum = (a, b) => {
  return a+b;
}

sum(a,b);
