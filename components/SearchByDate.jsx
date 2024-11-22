'use client'
import {useContext, useEffect, useState} from 'react'
import { SideNavigationProvider } from './SideNavigationProvider';
import { SearchArrayDataProvider } from "./SearchArrayProvider";
import DatePicker from "./DatePicker";
const SearchByDate = () => {
    const searchData = useContext(SearchArrayDataProvider);
    const [date,setDate] = useState('');


  useEffect(() => {

    if(date !== ''){
    const convertedDate = new Date(date);

    // Extract the month, day, and year
    const month = String(convertedDate.getMonth() + 1).padStart(2, '0');
    const day = String(convertedDate.getDate()).padStart(2, '0');
    const year = String(convertedDate.getFullYear()).slice(-2);

    // Format the date as MM-DD-YY
    const formattedDate = `${month}-${day}-${year}`;


    searchData.setSearchData(formattedDate);
    }


  },[date])
    

    
  return (
    <div  className='flex items-center gap-3'>
            <DatePicker date={date} setDate={setDate}/>
    </div>
  )
}

export default SearchByDate