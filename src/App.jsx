import ItemList from "./components/ItemList";
import "./components/styles.css";

// use the following link to get the data
// `/doors` will give you all the doors.
const API_URI = `https://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  // Get the existing item from the server
  // const [items, setItems] = useState(null);
  // pass the item to UpdateItem as a prop

  return (
    <div className="app">
      <h1>Door Management System</h1>
      <ItemList />
    </div>
  );
}

export default App;
