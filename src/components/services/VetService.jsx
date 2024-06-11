import axios from "axios"

let vetData = []

export const fetchData = async () =>{
    try{
        const response = await axios.get('https://localhost:7176/api/Auth/get-vets')
        vetData = response.data
    }
    catch(err){
        console.error(err)
    }
}

export const getVets = () =>{
    return vetData
}