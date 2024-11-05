import "./Modal.css";
import { ModalContext } from "../../Context/ModalProvider";
import { useContext, useRef } from "react";

function Modal() {
    const MContext = useContext(ModalContext);

    const nameRef = useRef();
    const ageRef = useRef();
    const classRef = useRef();
    const phoneRef = useRef();

    console.log("Modal render");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const nameRegex = /^[\p{L}\s]+$/u;
        const phoneRegex = /^(0|\+84)\d{9}$/;

        if (!nameRegex.test(nameRef.current.value)) {
            alert("Tên không đúng");
        } else if (ageRef.current.value < 0 || ageRef.current.value > 120) {
            alert("Tuổi không đúng");
        } else if (!phoneRegex.test(phoneRef.current.value)) {
            alert("Số điện thoại không đúng");
        } else if (MContext.isEditMode) {
            const studentData = {
                name: nameRef.current.value,
                age: parseInt(ageRef.current.value),
                class1: classRef.current.value,
                phone: phoneRef.current.value
            };

            fetch(`https://localhost:7025/api/MyLop/UpdateStudent?id=${MContext.currentStudent.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(studentData)
                })
                .then(() => MContext.fetchData())
                .catch(function (res) { console.log(res) })
        } else {
            const studentData = {
                name: nameRef.current.value,
                age: parseInt(ageRef.current.value),
                class1: classRef.current.value,
                phone: phoneRef.current.value
            };

            fetch("https://localhost:7025/api/MyLop/AddNewStudent",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(studentData)
                })
                .then(() => MContext.fetchData())
                .catch(function (res) { console.log(res) })
        }

    }

    return (
        <div className="form-modal">
            <form
                onSubmit={handleFormSubmit}
            >
                <h2>{MContext.isEditMode ? 'Chỉnh Sửa Sinh Viên' : 'Thêm Sinh Viên'}</h2>
                <label>
                    Tên:
                    <input
                        type="text"
                        name="name"
                        defaultValue={MContext.currentStudent.name}
                        ref={nameRef}
                        required
                    />
                </label>
                <label>
                    Tuổi:
                    <input
                        type="number"
                        name="age"
                        defaultValue={MContext.currentStudent.age}
                        ref={ageRef}
                        required
                    />
                </label>
                <label>
                    Lớp:
                    <input
                        type="text"
                        name="class"
                        defaultValue={MContext.currentStudent.class1}
                        ref={classRef}
                        required
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        defaultValue={MContext.currentStudent.phone}
                        ref={phoneRef}
                        required
                    />
                </label>
                <div className="btn-group">
                    <button className="btn btn-save" type="submit">{MContext.isEditMode ? 'Save' : 'Add'}</button>
                    <button className="btn btn-cancel" type="button" onClick={() => MContext.setShowModal(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default Modal;
