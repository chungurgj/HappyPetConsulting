import { createContext, useState ,useContext, useEffect} from "react"
import axios from "axios"
import { useName } from "./NameContext"
const PetContext = createContext()



export const PetProvider = ({ children }) => {
  const { id } = useName();
  const [petData, setPetData] = useState();

  const [hasPet, setHasPet] = useState(() => {
    return localStorage.getItem('hasPet');
  });

  const [petDataSaved, setPetDataSaved] = useState(() => {
    return localStorage.getItem("petData");
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7176/api/Pet`);
        console.log("JAAOOOO ", response.data);
        setPetData(response.data.filter(pet => pet.owner_Id === id));
        if (response.data.filter(pet => pet.owner_Id === id).length !== 0) {
          localStorage.setItem('hasPet', true);
          setHasPet(true);
        } else {
          localStorage.setItem('hasPet', false);
          setHasPet(false);
        }
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    fetchData();
  }, [id]);

  const addPetData = (value) => {
    localStorage.setItem('petData', value);
    setPetDataSaved(value);
  }

  return (
    <PetContext.Provider value={{ petDataSaved, addPetData, hasPet }}>
      {children}
    </PetContext.Provider>
  );
}


export const usePet = () =>{
    return useContext(PetContext)
}