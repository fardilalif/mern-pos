import React from "react";

const Receipt = React.forwardRef(({ receiptData }, ref) => {
  console.log(receiptData);

  return (
    <div ref={ref} className="grid gap-y-2">
      <h1>Receipt</h1>

      {/* <div className="flex items-center justify-between">
        {data.items.map((item) => (
          <div key={item._id} className="flex-1">
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
});

// Adding a display name for easier debugging
Receipt.displayName = "Receipt";

export default Receipt;
