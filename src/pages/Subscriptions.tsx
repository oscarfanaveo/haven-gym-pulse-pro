
import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Calendar, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock data for subscriptions
const subscriptionData = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    joinDate: "2023-10-15",
    plan: "Basic",
    status: "Active",
    price: "135 Bs"
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    joinDate: "2023-09-22",
    plan: "Regular",
    status: "Active",
    price: "160 Bs"
  },
  {
    id: "3",
    name: "Carlos Rodriguez",
    email: "carlos@example.com",
    joinDate: "2024-01-05",
    plan: "Premium",
    status: "Active",
    price: "200 Bs"
  },
  {
    id: "4",
    name: "Ana Martinez",
    email: "ana@example.com",
    joinDate: "2023-12-01",
    plan: "Temporary",
    status: "Expiring",
    price: "180 Bs"
  },
  {
    id: "5",
    name: "Luis Mendoza",
    email: "luis@example.com",
    joinDate: "2023-11-10",
    plan: "Basic",
    status: "Active",
    price: "135 Bs"
  },
];

const getPlanBadgeClass = (plan: string) => {
  switch (plan) {
    case "Basic":
      return "bg-blue-500/20 text-blue-400";
    case "Regular":
      return "bg-green-500/20 text-green-400";
    case "Premium":
      return "bg-haven-red/20 text-haven-red";
    case "Temporary":
      return "bg-purple-500/20 text-purple-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500/20 text-green-400";
    case "Expiring":
      return "bg-yellow-500/20 text-yellow-400";
    case "Inactive":
      return "bg-gray-500/20 text-gray-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const Subscriptions = () => {
  const [openNewMember, setOpenNewMember] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Subscriptions</h2>
          <p className="text-white/60">Manage member subscriptions and plans</p>
        </div>
        <Dialog open={openNewMember} onOpenChange={setOpenNewMember}>
          <DialogTrigger asChild>
            <Button className="bg-haven-red hover:bg-haven-red/90">
              <Plus className="mr-2 h-4 w-4" /> Add New Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-haven-gray text-white border-white/10">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription className="text-white/60">
                Fill out the form below to add a new gym member
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Full name"
                  className="col-span-3 bg-haven-dark border-white/10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Email address"
                  className="col-span-3 bg-haven-dark border-white/10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  placeholder="Phone number"
                  className="col-span-3 bg-haven-dark border-white/10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan" className="text-right">
                  Plan
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3 bg-haven-dark border-white/10">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent className="bg-haven-gray border-white/10">
                    <SelectItem value="basic">Basic (135 Bs)</SelectItem>
                    <SelectItem value="regular">Regular (160 Bs)</SelectItem>
                    <SelectItem value="premium">Premium (200 Bs)</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="joinDate" className="text-right">
                  Join Date
                </Label>
                <Input
                  id="joinDate"
                  type="date"
                  className="col-span-3 bg-haven-dark border-white/10"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenNewMember(false)} className="border-white/10 hover:bg-haven-dark">
                Cancel
              </Button>
              <Button className="bg-haven-red hover:bg-haven-red/90">
                Add Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="haven-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search members..."
                className="bg-haven-dark border-white/10 pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-white/10 hover:bg-haven-dark">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Select>
                <SelectTrigger className="w-[180px] bg-haven-dark border-white/10">
                  <SelectValue placeholder="All plans" />
                </SelectTrigger>
                <SelectContent className="bg-haven-gray border-white/10">
                  <SelectItem value="all">All plans</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Name</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptionData.map((member) => (
                  <TableRow key={member.id} className="border-white/10 hover:bg-haven-dark/70">
                    <TableCell className="font-medium">
                      <div>
                        <p>{member.name}</p>
                        <p className="text-xs text-white/60">{member.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-white/60" />
                        {new Date(member.joinDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPlanBadgeClass(member.plan)}`}>
                        {member.plan}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(member.status)}`}>
                        {member.status}
                      </span>
                    </TableCell>
                    <TableCell>{member.price}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-haven-gray border-white/10">
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <Eye className="h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <Edit className="h-4 w-4" /> Edit Member
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-red-500 cursor-pointer">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                <Users className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold">Basic Plan</h3>
              <p className="text-white/60 text-sm mb-3">3 times a week</p>
              <p className="text-2xl font-bold text-haven-red mb-3">135 Bs</p>
              <ul className="space-y-2 text-sm text-left mb-4">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                  Access to gym 3 days a week
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                  Basic machines usage
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                  Locker access
                </li>
              </ul>
              <Button variant="outline" className="w-full border-white/10 hover:bg-haven-dark">
                36 Members
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <Users className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-bold">Regular Plan</h3>
              <p className="text-white/60 text-sm mb-3">Full time access</p>
              <p className="text-2xl font-bold text-haven-red mb-3">160 Bs</p>
              <ul className="space-y-2 text-sm text-left mb-4">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                  Unlimited access to gym
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                  All machines usage
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                  Locker access
                </li>
              </ul>
              <Button variant="outline" className="w-full border-white/10 hover:bg-haven-dark">
                128 Members
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-haven-red/20 flex items-center justify-center mx-auto mb-3">
                <Users className="text-haven-red" size={24} />
              </div>
              <h3 className="text-xl font-bold">Premium Plan</h3>
              <p className="text-white/60 text-sm mb-3">Full access + classes</p>
              <p className="text-2xl font-bold text-haven-red mb-3">200 Bs</p>
              <ul className="space-y-2 text-sm text-left mb-4">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-haven-red mr-2"></div>
                  Unlimited access to gym
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-haven-red mr-2"></div>
                  All machines usage
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-haven-red mr-2"></div>
                  Complementary classes
                </li>
              </ul>
              <Button variant="outline" className="w-full border-white/10 hover:bg-haven-dark">
                75 Members
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                <Calendar className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold">Temporary Plan</h3>
              <p className="text-white/60 text-sm mb-3">Special events</p>
              <p className="text-2xl font-bold text-haven-red mb-3">Varies</p>
              <ul className="space-y-2 text-sm text-left mb-4">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                  Special class access
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                  Date-specific events
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                  Fixed duration
                </li>
              </ul>
              <Button variant="outline" className="w-full border-white/10 hover:bg-haven-dark">
                15 Members
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscriptions;
