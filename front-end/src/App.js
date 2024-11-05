import { useContext } from "react";
import "./App.css";
import Table from "./Components/Table/Table.js";
import { ModalContext } from "./Context/ModalProvider.js";
import Modal from "./Components/Modal/Modal.js";


function App() {

    const MContext = useContext(ModalContext);
    const handeAdd = () => {
        MContext.setShowModal(true);
        MContext.setCurrentStudent({id: '', name: '', age: '', class1: '', phone: '' });
        MContext.setIsEditMode(false);
    }
console.log("Main render");

    return (
        <div className="App">
            <h1>Bảng Quản Lý Sinh Viên</h1>
            <button className="btn add-button" onClick={handeAdd}>ADD</button>
            <Table></Table>
            {MContext.showModal && <Modal></Modal>}
        </div>
    );
}

export default App;
