import React from 'react'

export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand link-light fw-bolder" href='/'>WeCare</a>
            <div>
            <span className="material-icons align-middle link-light">call</span>
                <a className='btn btn-link link-light' href='tel:082-233-447' role='button'>Call us: 08 2233447</a>
            </div>
          </div>
        </nav>
    </div>
  )
}
