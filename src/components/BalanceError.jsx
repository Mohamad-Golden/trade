import React from "react";
import { MdOutlineWarningAmber } from "react-icons/md";

export default function BalanceError({ visible }) {
  if (visible)
    return (
      <div className="bg-[#191207] px-3 py-4 flex gap-x-2 rounded-3xl text-sm">
        <MdOutlineWarningAmber size={20} className="text-[#F1AB1F] " />
        <span className="text-[#FFE2B7]">موجودی کیف پول کافی نیست.</span>
      </div>
    );
}
