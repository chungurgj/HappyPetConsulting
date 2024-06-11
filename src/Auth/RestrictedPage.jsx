import axios from "axios"
import { useEffect, useState } from "react"
import { useName } from "../components/contexts/NameContext"
import { Outlet, useNavigate } from "react-router-dom"

const RestrictedPage = () => {
    const [validCons, setValidCons] = useState([])
    const [valid, setValid] = useState(false)

    const { id } = useName()
    const navigate = useNavigate()
    
    useEffect(() => {
        const current = new Date()
        const curDay = current.getDate()
        const curMonth = current.getMonth() +1
        const curYear = current.getFullYear()

        const checkConsultation = async () => {
            try {
                const response = await axios.get(`https://localhost:7176/api/Consultation/today-consultation?date=${curMonth}%2F${curDay}%2F${curYear}&userId=${id}`)

                const myvalidCons = response.data.filter(cons => {
                    return cons.done === false && cons.type_Id === 2
                })
                setValidCons(myvalidCons)

                if (myvalidCons.length > 0) {
                    console.log("Valid consultation found:", myvalidCons)
                    setValid(true)
                } else {
                    console.log("No valid consultation found")
                    setValid(false)
                }
            } catch (err) {
                console.error("Error checking consultation:", err)
            }
        }

        checkConsultation()
    }, [id])

    useEffect(()=>{
        console.log('valid ',valid)
    },[valid])
    return (
        <>
            {valid === true ? <Outlet /> : navigate('/notvalid/video')}
        </>
    )
}

export default RestrictedPage
