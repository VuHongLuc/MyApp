import { useState, createContext, useEffect } from "react";

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentStudent, setCurrentStudent] = useState({id:'', name: '', age: '', class1: '', phone: '' })
    const [listStudent, setListStudent] = useState([]);

    useEffect(() => {
        fetchData();
        console.log("useEffect render");
        
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7025/api/MyLop/GetAll`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);
            
            setListStudent(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ModalContext.Provider value={{ showModal, setShowModal, isEditMode, setIsEditMode, currentStudent, setCurrentStudent, listStudent, setListStudent, fetchData }}>
            {children}
        </ModalContext.Provider>
    )

}

export { ModalProvider, ModalContext }