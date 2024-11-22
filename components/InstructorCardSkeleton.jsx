import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const InstructorCardSkeleton = () => {
  return (
    <div className='relative h-56 w-[450px] rounded'>
    <Skeleton className="h-full w-full rounded bg-[#b7b7b7]" />
         
    <div className='absolute top-5 left-5'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-14 w-14 rounded-full bg-[#878585]'/>
         <div className='flex flex-col gap-2'>
          <Skeleton className='h-5 w-64 rounded bg-[#878585]'/>
          <Skeleton className='h-5 w-64 rounded bg-[#878585]'/>
         </div>
        </div>
    </div>


   <div className='absolute top-24 left-5'>
    <div className='flex flex-col gap-2'>
          <Skeleton className='h-2 w-96 rounded bg-[#989898]'/>
          <Skeleton className='h-2 w-96 rounded bg-[#989898]'/>
          <Skeleton className='h-2 w-96 rounded bg-[#989898]'/>
      </div>
    </div>

    
   <div className='absolute top-44 left-5'>
    <div className='flex items-center gap-2'>
          <Skeleton className='h-2  w-10 rounded bg-[#989898]'/>
          <Skeleton className='h-2  w-36 rounded bg-[#989898]'/>
          
      </div>
    </div>
  </div>
  

  
  )
}

export default InstructorCardSkeleton