import React from "react";
import Button from "@mui/material/Button";

export default function Tabs() {
  return (
    <div className="bg-[#2A2C34] flex p-[10px] rounded-2xl text-xl">
      <Button
        className="grow"
        style={{
          fontSize: "1.25rem",
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        variant="contained"
      >
        خرید
      </Button>
      <Button className="grow" variant="">
        فروش
      </Button>
    </div>
  );
}
