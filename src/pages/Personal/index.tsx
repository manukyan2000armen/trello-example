import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { User } from '../../store/type'
import st from './style.module.css'

function Personal() {
  const {arrUser,user} = useSelector((st:any) => st.users)
  const params = useParams()
  const navigate = useNavigate()

  
  
  return <>
  <div className={st.myTable}>
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left 	 text-gray-900 dark:text-gray-900">
        <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-800 dark:text-gray-800">
          <tr >
            <th >Name</th>
            <th scope="col" className="px-6 py-3">Surname</th>
            <th scope="col" className="px-6 py-3">Email</th>
          </tr>
        </thead>
        <tbody>
          {
            arrUser.map((elm:User) => {
              return <tr key={elm.id} className="text-md text-gray-700 border-solid border-2 border-indigo-300 bg-gray-100 dark:bg-gray-300 dark:text-gray-300">
                <td scope="col" className="px-6 py-3">{elm.name}</td>
                <td>{elm.surname}</td>
                <td>{elm.email}</td>
              </tr>
            })
          }
        </tbody>
      </table>

    </div>
    </div>
    </>
}

export default Personal