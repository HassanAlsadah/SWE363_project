import React,{useState}from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import { RiTeamFill } from "react-icons/ri";


export const SidebarData =[
    {
        title : 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title : 'Projects',
        path: '/projects',
        icon: <RiTeamFill/>,
        cName: 'nav-text'
    }, 
    {
        title : 'My Tasks',
        path: '/tasks',
        icon: <FaIcons.FaTasks/>,
        cName: 'nav-text'
    }, 
    {
        title : 'Chat',
        path: '/chat',
        icon: <IoIcons.IoMdChatbubbles/>,
        cName: 'nav-text'
    },
    {
        title : 'Settings',
        path: '/setting',
        icon: <IoIcons.IoIosSettings/>,
        cName: 'nav-text'
    },

]