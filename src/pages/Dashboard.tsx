
import { 
  Users, ShoppingBag, Dumbbell, TrendingUp, 
  DollarSign, Calendar, Clock, BarChart 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-white/60">Welcome to Haven Gym management system</p>
        </div>
        <p className="text-white/60 mt-2 md:mt-0">
          <Clock className="inline-block mr-1" size={16} />
          <span>Today, {new Date().toLocaleDateString()}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Total Members</p>
                <p className="text-2xl font-bold">254</p>
                <p className="text-xs text-green-500">+5% from last month</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-haven-red/20 flex items-center justify-center">
                <Users className="text-haven-red" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Monthly Revenue</p>
                <p className="text-2xl font-bold">Bs 37,850</p>
                <p className="text-xs text-green-500">+12% from last month</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-haven-red/20 flex items-center justify-center">
                <DollarSign className="text-haven-red" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Active Products</p>
                <p className="text-2xl font-bold">48</p>
                <p className="text-xs text-yellow-500">3 low in stock</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-haven-red/20 flex items-center justify-center">
                <ShoppingBag className="text-haven-red" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Retention Rate</p>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-xs text-green-500">+2% from last month</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-haven-red/20 flex items-center justify-center">
                <TrendingUp className="text-haven-red" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="haven-card lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly subscription revenue breakdown</CardDescription>
          </CardHeader>
          <CardContent className="h-72 flex items-center justify-center">
            <div className="text-center text-white/60">
              <BarChart size={64} className="mx-auto mb-4 text-haven-red" />
              <p>Revenue chart visualization will be displayed here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Today's special events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg bg-haven-red flex items-center justify-center">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Spinning Class</p>
                  <p className="text-sm text-white/60">10:00 AM - 11:00 AM</p>
                  <p className="text-xs text-white/60 mt-1">12 participants</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg bg-haven-red flex items-center justify-center">
                  <Dumbbell size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Group Training</p>
                  <p className="text-sm text-white/60">2:00 PM - 3:30 PM</p>
                  <p className="text-xs text-white/60 mt-1">8 participants</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg bg-haven-red flex items-center justify-center">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Dance Class</p>
                  <p className="text-sm text-white/60">6:00 PM - 7:00 PM</p>
                  <p className="text-xs text-white/60 mt-1">15 participants</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
