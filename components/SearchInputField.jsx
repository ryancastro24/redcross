'use client'
import {useContext} from 'react'
import { SideNavigationProvider } from './SideNavigationProvider';
import { SearchArrayDataProvider } from "./SearchArrayProvider";
import { Input } from "@/components/ui/input"
const SearchInputField = () => {

    const navigationData = useContext(SideNavigationProvider);
    const searchData = useContext(SearchArrayDataProvider);
  return (
    <>
          <Input 
          value={searchData.searchData} 
          onChange={(e) => searchData.setSearchData(e.target.value)} 
          onFocus={() => navigationData.setNavigation("list")} 
          placeholder="search..." 
          className="w-[400px]"
          />
    </>
  )
}

export default SearchInputField