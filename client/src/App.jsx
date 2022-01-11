import { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import axios from "axios";
import "./App.css";

const App = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    image: "",
  });

  const [rsData, setrsData] = useState([]);

  const cd = () => {
    axios.get("http://localhost:3000/post").then((res) => {
      setrsData(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    cd();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/post", state).then((res) => {
      console.log("from submit", res.data);
      cd();
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input
            onChange={({ target }) =>
              setState({ ...state, email: target.value })
            }
          />
          <input
            onChange={({ target }) =>
              setState({ ...state, password: target.value })
            }
          />
          <FileBase64
            onDone={({ base64 }) => setState({ ...state, image: base64 })}
          />
          <input type="submit" />
        </form>
        {rsData.map((res) => (
          <div key={res.id}>
            <img src={res.image} height="100px" />
          </div>
        ))}
      </header>
    </div>
  );
};

export default App;
