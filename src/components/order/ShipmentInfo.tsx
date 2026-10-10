import { MapPin, Truck, Copy, Check } from "lucide-react";
import { useState } from "react";

export interface ShipmentInfoProps {
  recipient: {
    fullName: string;
    phone: string;
    address: string;
  };
  carrier: {
    name: string;
    trackingCode: string;
    hotline: string;
    shipperName?: string;
    shipperPhone?: string;
    estimatedDelivery?: string;
  };
}

export function ShipmentInfo({ recipient, carrier }: ShipmentInfoProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(carrier.trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-sm">
        <h3 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5 mb-3">
          <MapPin size={15} className="text-primary" />
          <span>Địa chỉ nhận hàng</span>
        </h3>
        <div className="space-y-1 text-xs">
          <p className="font-bold text-sm text-foreground">
            {recipient.fullName}{" "}
            <span className="font-normal text-muted-foreground">
              ({recipient.phone})
            </span>
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {recipient.address}
          </p>
        </div>
      </div>

      <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-sm">
        <h3 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5 mb-3">
          <Truck size={15} className="text-primary" />
          <span>Đơn vị vận chuyển</span>
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Đơn vị:</span>
            <span className="font-bold text-foreground">{carrier.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Mã vận đơn:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-foreground">
                {carrier.trackingCode}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1 hover:bg-muted rounded text-primary transition-all cursor-pointer"
                title="Sao chép"
              >
                {copied ? (
                  <Check size={12} className="text-emerald-500" />
                ) : (
                  <Copy size={12} />
                )}
              </button>
            </div>
          </div>
          {carrier.shipperName && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Bưu tá:</span>
              <span className="font-semibold text-foreground">
                {carrier.shipperName} ({carrier.shipperPhone})
              </span>
            </div>
          )}
          <div className="flex items-center justify-between pt-1 border-t border-border/50">
            <span className="text-muted-foreground">Hotline hỗ trợ:</span>
            <span className="font-bold text-primary">{carrier.hotline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
