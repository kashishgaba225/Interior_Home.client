import React, { useState } from 'react'
import Logo from '../../assets/Logo.png'
import { ImCross } from "react-icons/im";
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import Search from './Search';


export default function Navbar() {
    const Menu = [
        { name: "Design Ideas", href: "/DesignIdeas" },
        { name: "Shop Interiors ", href: "/ShopInteriors" },
        { name: "Projects", href: "/Projects " },
        { name: "Trade", href: "/Trade " },
        { name: "Catalog", href: "/Catalog " },

    ];

    const [Login, SetLogin] = useState(false)
    const [Bar, setBar] = useState(false);
    return (
        <div>

            <nav className='flex justify-between w-full items-center px-4 py-3 bg-purple-900  mg:px-8 lg:16 shadow-lg text-white  '>

                {/* left div */}
                <div className='flex justify-center items-center space-x-6'>
                    <h1 className='text-2xl font-bold text-white'><img className='h-[50px] w-[150px]' src={Logo} alt="" /></h1>
                    <ul className=' hidden space-x-6 lg:flex ' >
                        {Menu.map((item, key) => {
                            return (
                                <li key={key}>
                                    <Link to={item.href} className='rounded-md hover:bg-purple-500 px-2 py-1'> {item.name}</Link></li>
                            )
                        })}
                    </ul>


                </div>

                <div className='lg:hidden'><Search /></div>


                {/* right div */}
                <div className='flex items-center space-x-4'>


                    <div className='hidden lg:flex'><Search /></div>
                    {Login ? (
                        <Dropdown />
                    ) :
                        (
                            <Link to='/signup'>                            <button className='rounded-lg ring-2 ring-purple-950 px-3 py-2 text-white transition-colors hover:bg-purple-400'>LogIn/SignIn</button>
                            </Link>)}

                    <button onClick={() => setBar(!Bar)} className='md:hidden text-white hover:text-neutral-400'>
                        {Bar ? <ImCross className='text-2xl' />
                            : <FaBars className='text-3xl' />}
                    </button>

                </div>

                <div className={`absolute top-18 right-0 w-full bg-purple-950 md:hidden ${Bar ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                    <ul className='flex flex-col items-center  space-y-4 p-4'>
                        {Menu.map((item, key) => (
                            <li key={key} className='hover:scale-110 duration-300'>
                                <Link to={item.href} className='rounded-md text-xl font-semibold px-3 py-2 text-neutral-200 transition-colors hover:bg-purple-500 hover:text-white'>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>


            </nav>
        </div>
    )
}
