import React from 'react'
import { useSelector } from 'react-redux'
import {AiOutlineHeart} from 'react-icons/ai'
import {BsCart} from 'react-icons/bs'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const {totalItems} = useSelector(state=>state.cart)
    const navigate = useNavigate()
    const location = useLocation()
    const hideCart = location.pathname ==='/cart'
    console.log(location)
  return (
   <>
    <div className=''>
        <div className="navbar bg-base-100 lg:px-20 lg:py-10">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl italic">Travelholic</a>
  </div>
  <div className="flex-none gap-4">
    <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <AiOutlineHeart fontSize={32} />
          <span className="badge badge-sm indicator-item">0</span>
        </div>
      </label>
      <label tabIndex={0} className="btn btn-ghost btn-circle ">
        <div className="indicator ">
         <BsCart fontSize={32} />
          <span className="badge badge-sm indicator-item">{totalItems}</span>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">{totalItems} Items</span>
          {!hideCart && <div className="card-actions">
            <button className="btn btn-primary btn-block"  onClick={()=>navigate('/cart')}>View cart</button>
          </div>}
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://www.gannett-cdn.com/-mm-/98af83a6522a626b895754a392a1bf0316ef5874/c=0-326-5561-3468/local/-/media/2018/04/10/USATODAY/USATODAY/636589451156422133-XXX-JG-WOZNIAK-4-9-2018-JMG-06063-99065053.JPG?width=3200&height=1680&fit=crop" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    </div>
    <Outlet />
   </>
  )
}

export default Navbar