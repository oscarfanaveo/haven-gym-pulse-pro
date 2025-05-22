
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialStats from "@/components/reports/FinancialStats";
import RevenueChart from "@/components/reports/RevenueChart";
import SubscriptionDistribution from "@/components/reports/SubscriptionDistribution";
import ProfitLossStatement from "@/components/reports/ProfitLossStatement";
import TopSellingProducts from "@/components/reports/TopSellingProducts";
import MembershipAnalysisPlaceholder from "@/components/reports/MembershipAnalysisPlaceholder";
import RetentionRate from "@/components/reports/RetentionRate";
import ChurnAnalysis from "@/components/reports/ChurnAnalysis";
import ReportsHeader from "@/components/reports/ReportsHeader";

const Reports = () => {
  return (
    <div className="space-y-6">
      <ReportsHeader />

      <FinancialStats 
        monthlyIncome="Bs 37,850"
        expenses="Bs 12,520"
        newMembers={24}
        cancellations={5}
      />

      <Tabs defaultValue="financial" className="w-full">
        <TabsList className="bg-haven-dark grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="financial" className="data-[state=active]:bg-haven-red">Financiero</TabsTrigger>
          <TabsTrigger value="membership" className="data-[state=active]:bg-haven-red">Membresías</TabsTrigger>
          <TabsTrigger value="retention" className="data-[state=active]:bg-haven-red">Retención</TabsTrigger>
        </TabsList>
        
        <TabsContent value="financial" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RevenueChart />
            <SubscriptionDistribution />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ProfitLossStatement />
            <TopSellingProducts />
          </div>
        </TabsContent>
        
        <TabsContent value="membership" className="mt-4">
          <MembershipAnalysisPlaceholder />
        </TabsContent>
        
        <TabsContent value="retention" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RetentionRate />
            <ChurnAnalysis />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
