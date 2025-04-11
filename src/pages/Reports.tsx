
import { useState } from "react";
import { CalendarIcon, DownloadIcon, TrendingUp, TrendingDown, DollarSign, Users, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const Reports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Reports & Analytics</h2>
          <p className="text-white/60">Track gym performance and financial data</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="border-white/10 hover:bg-haven-dark"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "MMMM yyyy") : "Pick a month"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-haven-gray border-white/10">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="bg-haven-gray text-white"
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" className="border-white/10 hover:bg-haven-dark">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-haven-red hover:bg-haven-red/90">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Monthly Revenue</p>
                <p className="text-2xl font-bold">Bs 37,850</p>
                <p className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12% from last month
                </p>
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
                <p className="text-sm text-white/60">Expenses</p>
                <p className="text-2xl font-bold">Bs 12,520</p>
                <p className="text-xs text-red-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +8% from last month
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <DollarSign className="text-red-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">New Members</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +15% from last month
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Users className="text-blue-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Cancellations</p>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-red-500 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" /> -10% from last month
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Users className="text-yellow-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="financial" className="w-full">
        <TabsList className="bg-haven-dark grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="financial" className="data-[state=active]:bg-haven-red">Financial</TabsTrigger>
          <TabsTrigger value="membership" className="data-[state=active]:bg-haven-red">Membership</TabsTrigger>
          <TabsTrigger value="retention" className="data-[state=active]:bg-haven-red">Retention</TabsTrigger>
        </TabsList>
        
        <TabsContent value="financial" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="haven-card lg:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Revenue Breakdown</CardTitle>
                    <CardDescription>Monthly revenue by subscription type</CardDescription>
                  </div>
                  <Select defaultValue="6months">
                    <SelectTrigger className="w-[180px] bg-haven-dark border-white/10">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent className="bg-haven-gray border-white/10">
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="3months">3 months</SelectItem>
                      <SelectItem value="6months">6 months</SelectItem>
                      <SelectItem value="year">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="h-72 flex items-center justify-center">
                <div className="text-center text-white/60">
                  <TrendingUp size={64} className="mx-auto mb-4 text-haven-red" />
                  <p>Revenue chart visualization will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="haven-card">
              <CardHeader className="pb-2">
                <CardTitle>Subscription Distribution</CardTitle>
                <CardDescription>Current active memberships</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Basic Plan</span>
                    <span className="text-sm font-bold">36 (14%)</span>
                  </div>
                  <div className="w-full bg-haven-dark rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "14%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Regular Plan</span>
                    <span className="text-sm font-bold">128 (50%)</span>
                  </div>
                  <div className="w-full bg-haven-dark rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Premium Plan</span>
                    <span className="text-sm font-bold">75 (30%)</span>
                  </div>
                  <div className="w-full bg-haven-dark rounded-full h-2">
                    <div className="bg-haven-red h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Temporary Plan</span>
                    <span className="text-sm font-bold">15 (6%)</span>
                  </div>
                  <div className="w-full bg-haven-dark rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "6%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="haven-card">
              <CardHeader className="pb-2">
                <CardTitle>Monthly Profit & Loss</CardTitle>
                <CardDescription>Financial performance tracking</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-medium">Total Revenue</span>
                    <span className="font-bold">Bs 37,850</span>
                  </div>
                  
                  <div>
                    <div className="text-sm text-white/60 mb-1">Revenue Breakdown</div>
                    <div className="space-y-2 pl-2 border-l border-white/10">
                      <div className="flex justify-between">
                        <span className="text-sm">Membership Subscriptions</span>
                        <span className="text-sm">Bs 32,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Product Sales</span>
                        <span className="text-sm">Bs 3,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Special Events</span>
                        <span className="text-sm">Bs 2,200</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-medium">Total Expenses</span>
                    <span className="font-bold">Bs 12,520</span>
                  </div>
                  
                  <div>
                    <div className="text-sm text-white/60 mb-1">Expense Breakdown</div>
                    <div className="space-y-2 pl-2 border-l border-white/10">
                      <div className="flex justify-between">
                        <span className="text-sm">Rent & Utilities</span>
                        <span className="text-sm">Bs 7,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Staff Salaries</span>
                        <span className="text-sm">Bs 3,800</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Equipment Maintenance</span>
                        <span className="text-sm">Bs 620</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Other Expenses</span>
                        <span className="text-sm">Bs 600</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="font-medium">Net Profit</span>
                    <span className="font-bold text-green-500">Bs 25,330</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="haven-card">
              <CardHeader className="pb-2">
                <CardTitle>Product Sales Performance</CardTitle>
                <CardDescription>Top selling products this month</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Whey Protein Powder</h4>
                        <span className="font-bold">Bs 5,600</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <span>16 units sold</span>
                        <span>350 Bs / unit</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-silver/20 flex items-center justify-center">
                      <span className="text-white/80 font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Pre-Workout Supplement</h4>
                        <span className="font-bold">Bs 3,300</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <span>15 units sold</span>
                        <span>220 Bs / unit</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <span className="text-amber-400 font-bold">3</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Protein Bars</h4>
                        <span className="font-bold">Bs 1,650</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <span>110 units sold</span>
                        <span>15 Bs / unit</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-haven-dark flex items-center justify-center">
                      <span className="text-white/60 font-bold">4</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Gym Gloves</h4>
                        <span className="font-bold">Bs 1,320</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <span>11 units sold</span>
                        <span>120 Bs / unit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="membership" className="mt-4">
          <Card className="haven-card">
            <CardHeader className="pb-2">
              <CardTitle>Membership Analytics</CardTitle>
              <CardDescription>Tracking member growth and activity</CardDescription>
            </CardHeader>
            <CardContent className="p-6 min-h-[400px] flex items-center justify-center">
              <div className="text-center text-white/60">
                <Users size={64} className="mx-auto mb-4 text-haven-red" />
                <p className="text-xl font-medium mb-2">Membership Trends</p>
                <p>Visualize member acquisition and activity data</p>
                <Button className="mt-4 bg-haven-red hover:bg-haven-red/90">Generate Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="retention" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="haven-card">
              <CardHeader className="pb-2">
                <CardTitle>Retention Rate</CardTitle>
                <CardDescription>Member retention analysis</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl font-bold">92%</div>
                    <div className="text-sm text-white/60">Overall retention rate</div>
                  </div>
                  <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center">
                    <span className="text-green-500 font-bold">92%</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Basic Plan</span>
                      <span className="text-sm font-bold">85%</span>
                    </div>
                    <div className="w-full bg-haven-dark rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Regular Plan</span>
                      <span className="text-sm font-bold">94%</span>
                    </div>
                    <div className="w-full bg-haven-dark rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Premium Plan</span>
                      <span className="text-sm font-bold">98%</span>
                    </div>
                    <div className="w-full bg-haven-dark rounded-full h-2">
                      <div className="bg-haven-red h-2 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="haven-card">
              <CardHeader className="pb-2">
                <CardTitle>Churn Analysis</CardTitle>
                <CardDescription>Understanding membership cancellations</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="text-white/60 mb-2">Reasons for Cancellation</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Financial reasons</span>
                        <span>40%</span>
                      </div>
                      <div className="w-full bg-haven-dark rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Relocated</span>
                      <span>30%</span>
                    </div>
                    <div className="w-full bg-haven-dark rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Switched to competitor</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-haven-dark rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Not using membership</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-haven-dark rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Other reasons</span>
                      <span>5%</span>
                    </div>
                    <div className="w-full bg-haven-dark rounded-full h-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
