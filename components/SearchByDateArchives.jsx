'use client'
import {useContext,useState,useEffect} from 'react'
import DatePicker from "./DatePicker";
import { SearchArrayDataProvider } from './SearchArrayProvider';
const SearchByDateArchives = () => {

    const [date,setDate] =  useState("");
    const searchArchivesData = useContext(SearchArrayDataProvider);

    useEffect(() => {

      if(date !== ''){
      const convertedDate = new Date(date);
  
      // Extract the month, day, and year
      const month = String(convertedDate.getMonth() + 1).padStart(2, '0');
      const day = String(convertedDate.getDate()).padStart(2, '0');
      const year = String(convertedDate.getFullYear()).slice(-2);
  
      // Format the date as MM-DD-YY
      const formattedDate = `${month}-${day}-${year}`;
  
  
      searchArchivesData.setSearchDataArchives(formattedDate);
      }
  
  
    },[date])
      
  return (
    <div  className='flex items-center gap-3'>

            <DatePicker date={date} setDate={setDate}/>

    </div>
  )
}

export default SearchByDateArchives