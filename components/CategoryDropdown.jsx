'use client'
import {useContext} from 'react'
import { SideNavigationProvider } from './SideNavigationProvider';
import { SearchArrayDataProvider } from "./SearchArrayProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const CategoryDropdown = () => {

    
    const navigationData = useContext(SideNavigationProvider);
    const searchData = useContext(SearchArrayDataProvider);


    
const handleAddressChange = (value) => {
  searchData.setSearchData(value);
};

  return (
    <>



            <Select onValueChange={handleAddressChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="occupational">Occupational</SelectItem>
              </SelectContent>
            </Select>
    </>
  )
}

export default CategoryDropdown