import React from 'react'
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { noteState } from '../Atoms/noteAtom';

export default function Layout() {
  let [noteLength, setNoteLength]= useRecoilState(noteState);
  return (
    <>
    <div style={{backgroundColor:"#0DCAF0"}} className='w-100 p-2 text-white text-center fixed-top '>Notes App : {noteLength} </div>;

    <div className='mt-3'>
    <Outlet/>
    </div>
    
    </>
  )
}
