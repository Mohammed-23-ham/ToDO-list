import React from 'react'

export default function List({ todos }) {



  return (
    <>
      <div className='list row-10 overflow-y-scroll d-flex justify-content-center align-items-center flex-column g-5'>
        <div className="list-items">
          {todos.map((todo, index) => {
            return (
              <div key={index} className='list-item d-flex justify-content-center align-items-center flex-row gap-1'>
                <p>{todo.text}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="btns d-flex justify-content-center align-items-center flex-row gap-1">
        <button className='btn btn-dark'><i className='fas fa-check'></i></button>
        <button className='btn btn-dark'><i className="fas fa-delete-left"></i></button>
      </div>
    </>
  )
}
