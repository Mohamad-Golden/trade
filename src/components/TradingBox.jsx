import React, { useState } from "react";
import Tabs from "./Tabs";
import { Button, Slider } from "@mui/material";
import { BiWallet } from "react-icons/bi";
import TextInput from "./TextInput";
import { useQuery } from "@tanstack/react-query";
import {
  addCommas,
  digitsEnToFa,
  numberToWords,
} from "@persian-tools/persian-tools";
import { getTradeData } from "@/services";
import roundNumber from "@/utils";
import BalanceError from "./BalanceError";

export default function TradingBox({ title }) {
  const balance = 200000000;
  const [tradeData, setTradeData] = useState({
    price: "",
    gold: "",
    priceEn: "",
  });
  const tradeQuery = useQuery({
    queryKey: ["tradeData"],
    queryFn: getTradeData,
    refetchInterval: 15000,
  });
  const perGramPrice = roundNumber(tradeQuery.data?.data?.data.price.buy / 10);

  function handlePrice({ formattedValue, value }) {
    const gold = roundNumber(parseFloat(value) / perGramPrice, 3);
    setTradeData((prev) => ({
      ...prev,
      price: formattedValue,
      priceEn: value,
      gold: value.length > 5 ? digitsEnToFa(addCommas(gold)) : "",
    }));
  }

  function handleGold({ formattedValue, value }) {
    const price = roundNumber(parseFloat(value) * perGramPrice);
    setTradeData((prev) => ({
      ...prev,
      gold: formattedValue,
      price: value ? digitsEnToFa(addCommas(price)) : "",
      priceEn: value ? price : "",
    }));
  }
  const lowBalance = balance < parseFloat(tradeData.priceEn);

  return (
    <div className="bg-[#373943] relative flex flex-col p-[18px] rounded-2xl w-[480px] font-custom">
      <span className="absolute right-0 -translate-y-full -top-3 text-4xl">
        {title}
      </span>
      <div className="mt-3 bg-[#494C5A] px-3 py-6 rounded-2xl flex flex-col gap-y-3 ">
        <Tabs />
        <div className="px-3">
          <div className="flex justify-between">
            <span>{"قیمت خرید"}</span>
            <div className="">
              <span>{digitsEnToFa(addCommas(perGramPrice))}</span>{" "}
              <span>تومان</span>
            </div>
          </div>
          <span className="text-xs">(هر گرم طلای ۱۸ عیار)</span>
        </div>
        <div>
          <TextInput
            label="ارزش کل"
            adornment={"تومان"}
            onChange={handlePrice}
            value={tradeData.price}
            maxLength={14}
            integerOnly
          />
          <div className="min-h-12 mb-3 text-center">
            {tradeData.priceEn
              ? numberToWords(tradeData.priceEn) + " تومان"
              : null}
          </div>
          <TextInput
            label="مقدار طلا"
            adornment={"گرم"}
            maxLength={8}
            onChange={handleGold}
            value={tradeData.gold}
            numberOnly
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-3 mt-3 px-5">
        <Slider
          onChange={(e, value) => {
            const price = (value * balance) / 100;
            handlePrice({
              value: price.toString(),
              formattedValue: digitsEnToFa(addCommas(price)),
            });
          }}
          valueLabelFormat={(value) => digitsEnToFa(value) + "٪"}
          valueLabelDisplay="auto"
          value={
            tradeData.price
              ? (parseFloat(tradeData.priceEn) / balance) * 100
              : 0
          }
          shiftStep={10}
          step={10}
          marks
          min={0}
          max={100}
        />
        <div className="flex select-none items-center gap-x-3">
          <span>
            <BiWallet size={20} />
          </span>
          <span>موجودی کیف پول: {digitsEnToFa(addCommas(balance))} تومان</span>
        </div>
        <BalanceError visible={lowBalance} />
        <Button
          style={{
            borderRadius: "8px",
            fontSize: "1.25rem",
            marginInline: 12,
          }}
          color={lowBalance ? "warning" : "success"}
          variant="contained"
        >
          {lowBalance ? "افزایش موجودی" : "خرید"}
        </Button>
      </div>
    </div>
  );
}
