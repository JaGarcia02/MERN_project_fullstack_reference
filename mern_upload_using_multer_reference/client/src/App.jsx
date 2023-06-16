import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7894")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <h1>Image Uploading react</h1>
      {data.map((singleData) => {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(singleData.img.data.data))
        );
        return (
          <>
            <img src={`data:image/png;base64,${base64String}`} />
            {/*   */}
          </>
        );
      })}
    </div>
  );
};

export default App;
