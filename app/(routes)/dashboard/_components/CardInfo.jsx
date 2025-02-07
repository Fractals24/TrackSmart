import formatNumber from "@/utils";
import getFinancialAdvice from "@/utils/getFinancialAdvice";
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList, incomeList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");

  useEffect(() => {
    console.log('Initial lists:', { 
      budgetListLength: budgetList?.length,
      incomeListLength: incomeList?.length 
    });
    
    if (budgetList?.length > 0 || incomeList?.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    console.log('Current totals:', {
      totalBudget,
      totalIncome,
      totalSpend
    });

    const fetchFinancialAdvice = async () => {
      // Validate numbers and ensure they're positive
      const validBudget = Number(totalBudget) > 0;
      const validIncome = Number(totalIncome) > 0;
      const validSpend = Number(totalSpend) > 0;

      console.log('Validation results:', {
        validBudget,
        validIncome,
        validSpend
      });

      if (validBudget && validIncome && validSpend) {
        console.log('Fetching advice with values:', {
          totalBudget,
          totalIncome,
          totalSpend
        });
        
        const advice = await getFinancialAdvice(
          totalBudget,
          totalIncome,
          totalSpend
        );
        setFinancialAdvice(advice);
      } else {
        console.log('Skipping API call - invalid values');
      }
    };

    fetchFinancialAdvice();
  }, [totalBudget, totalIncome, totalSpend]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;

    console.log('Raw budgetList:', budgetList);
    console.log('Raw incomeList:', incomeList);

    budgetList?.forEach((element) => {
      const amount = Number(element.amount) || 0;
      const spend = Number(element.totalSpend) || 0;
      
      console.log('Processing budget item:', {
        rawAmount: element.amount,
        parsedAmount: amount,
        rawSpend: element.totalSpend,
        parsedSpend: spend
      });

      totalBudget_ += amount;
      totalSpend_ += spend;
    });

    incomeList?.forEach((element) => {
      const amount = Number(element.totalAmount) || 0;
      console.log('Processing income item:', {
        rawAmount: element.totalAmount,
        parsedAmount: amount
      });
      
      totalIncome_ += amount;
    });

    console.log('Final calculated values:', {
      totalBudget_,
      totalSpend_,
      totalIncome_
    });

    setTotalIncome(totalIncome_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div>
          <div className="p-7 border mt-4 -mb-1 rounded-2xl flex items-center justify-between">
            <div className="">
              <div className="flex mb-2 flex-row space-x-1 items-center ">
                <h2 className="text-md ">TrackSmart AI</h2>
                <Sparkles
                  className="rounded-full text-white w-10 h-10 p-2
    bg-gradient-to-r
    from-pink-500
    via-red-500
    to-yellow-500
    background-animate"
                />
              </div>
              <h2 className="font-light text-md">
                {financialAdvice || "Loading financial advice..."}
              </h2>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Budget</h2>
                <h2 className="font-bold text-2xl">
                ₹ {formatNumber(totalBudget)}
                </h2>
              </div>
              <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Spend</h2>
                <h2 className="font-bold text-2xl">
                ₹ {formatNumber(totalSpend)}
                </h2>
              </div>
              <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">No. Of Budget</h2>
                <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
              </div>
              <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of Income Streams</h2>
                <h2 className="font-bold text-2xl">
                ₹ {formatNumber(totalIncome)}
                </h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
