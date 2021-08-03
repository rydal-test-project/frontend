import React from "react";


export default function Study() {
/*
  const [subjects] = useState([
    {
      name: 'Физическая культура',
      semesters: [1, 2, 3, 4]
    },
    {
      name: 'История',
      semesters: [1]
    },
    {
      name: 'Основы права',
      semesters: [2]
    },
    {
      name: 'АКС',
      semesters: [3]
    },
    {
      name: 'ТБД',
      semesters: [4]
    },
    {
      name: 'Иностранный язык',
      semesters: [1, 2, 3, 4]
    },
    {
      name: 'Высшая математика',
      semesters: [1, 2]
    },
    {
      name: 'Высшая математика',
      semesters: [1, 2, 3, 4]
    },
    {
      name: 'Основы теории алгоритмов',
      semesters: [4]
    }
  ]);
*/
  // todo: Доделать эту парашу так, что бы можно было получать по АПИ и выводить .has-link для td с ссылками

  return (
    <div className="container">
      <div className="study">
        <div className="study__table-container">
          <table className="study__table">
            <tbody>
            <tr>
              <th>Семестр №1</th>
              <th>Семестр №2</th>
              <th>Семестр №3</th>
              <th>Семестр №4</th>
            </tr>
            <tr>
              <td>История</td>
              <td>Основы права</td>
              <td>АКС</td>
              <td>ТБД</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}