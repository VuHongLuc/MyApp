import "./Table.css"
import { useContext, useState } from "react";
import { ModalContext } from "../../Context/ModalProvider.js";

function Table() {
  console.log("Table render");

  const MContext = useContext(ModalContext);

  const handleEdit = (student) => {
    MContext.setIsEditMode(true);
    MContext.setShowModal(true);
    MContext.setCurrentStudent({ id: student.id, name: student.name, age: student.age, class1: student.class1, phone: student.phone });
  }

  const handleDelete = (x) => {
    // MContext.setListStudent(MContext.listStudent.filter(st => st.id !== student.id))
    // console.log(x);

    fetch(`https://localhost:7025/api/MyLop/DeleteStudent?id=${x}`,
      {
        method: 'DELETE',
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
      })
      .then(() => MContext.fetchData())
      .catch(function (res) { console.log(res) })
  }

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th className="col-stt">STT</th>
          <th className="col-name">Tên</th>
          <th className="col-age">Tuổi</th>
          <th className="col-class">Lớp</th>
          <th className="col-phone">SĐT</th>
          <th className="col-mng">Quản lý</th>
        </tr>
      </thead>
      <tbody>
        {MContext.listStudent.map((student, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.class1}</td>
            <td>{student.phone}</td>
            <td className="btn-table">
              <button type="button" className="btn btn-management btn-edit" onClick={() => handleEdit(student)}>Edit</button>
              <button type="button" className="btn btn-management btn-delete" onClick={() => handleDelete(student.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
