import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Fillter from "./components/Fillter";
import Cards from "./components/Cards";
import { filterData, apiUrl } from "./data"
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";


const App = () => {

  const [courses, setCourses] = useState("");
  const [loading, setLoading] = useState(true); 

  const[category,setCategory] = useState(filterData[0].title)

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const output = await res.json();
      setCourses(output.data)

    } catch (error) {
      toast.error("Someting went wrong")
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar />
      </div>

      <div>
        <Fillter filterData={filterData} category={category} setCategory={setCategory} />
      </div>

      <div className="w11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
        {
          loading ? (<Spinner />) : (<Cards courses={courses} category ={category} />)
        }
      </div>

    </div>
  )
};

export default App;



