'use client'
import axios from "axios"
import Loader from "./Loader"
// Default values shown  
import { FiEdit } from "react-icons/fi";
import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"


const UpdateModal = ({ name, email, gender, address, contact, category, id }) => {
    const { toast } = useToast()
    const [loading,setLoading] = useState(false);
    const [updateData, setUpdateData] = useState({
        name: "",
        email: "",
        gender: "",
        address: "",
        category: "",
        contactNumber: "",
    });

    // Initialize state with props
    useEffect(() => {
        setUpdateData({
            name: name || "",
            email: email || "",
            gender: gender || "",
            address: address || "",
            category: category || "",
            contactNumber: contact || "",
        });
    }, [name, email, gender, address, contact, category]);

    const handleGenderChange = (value) => {
        setUpdateData({ ...updateData, gender: value });
    };

    const handleAddressChange = (value) => {
        setUpdateData({ ...updateData, address: value });
    };

    const handleCategoryChange = (value) => {
        setUpdateData({ ...updateData, category: value });
    };

    const handleUpdate = async () => {

        setLoading(true);
        try {
            await axios.patch(`/api/user/${id}`, updateData);
            toast({
                title: "User Successfully Updated",
                description: "Friday, February 10, 2023 at 5:57 PM",
              })

              setLoading(false);

        } catch (e) {
            alert(e.message);
        }
    };



    return (
        <Dialog>
            <DialogTrigger className="text-lg"><FiEdit/></DialogTrigger>
            <DialogContent className={'w-[1000px] flex flex-col gap-5'}>
                <DialogHeader>
                    <DialogTitle>Update Form</DialogTitle>
                </DialogHeader>

                <div className="w-full grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            value={updateData.name}
                            placeholder='Enter Name'
                            onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            value={updateData.email}
                            placeholder='Enter Email'
                            onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={updateData.gender} onValueChange={handleGenderChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="address">Address</Label>
                        <Select value={updateData.address} onValueChange={handleAddressChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Manila">Manila</SelectItem>
                                <SelectItem value="Cavite">Cavite</SelectItem>
                                <SelectItem value="Pasay">Pasay</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="category">Category</Label>
                        <Select value={updateData.category} onValueChange={handleCategoryChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="occupational">Occupational</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                  

                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input
                            value={updateData.contactNumber}
                            placeholder='Enter Contact Number'
                            onChange={(e) => setUpdateData({ ...updateData, contactNumber: e.target.value })}
                        />
                    </div>

                    <Button asChild>
                        <button onClick={handleUpdate} className="w-full col-span-2 hover:bg-red-800 bg-red-600 rounded text-white">
                            {loading ? <Loader/> : "Update Trainees Data"
                        }</button>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateModal;
