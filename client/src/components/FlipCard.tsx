import { useState } from 'react';
import { RotateCw } from 'lucide-react';

interface FlipCardProps {
  carName: string;
  carImage: string;
  roi: string;
  period: string;
  mileage: string;
  condition: string;
  marketValue: string;
  tokenPrice: string;
  tokenSupply: string;
}

export default function FlipCard({
  carName,
  carImage,
  roi,
  period,
  mileage,
  condition,
  marketValue,
  tokenPrice,
  tokenSupply,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="relative w-full h-96 cursor-pointer perspective"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          perspective: '1000px',
        }}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front of card */}
          <div
            className="absolute w-full h-full bg-white border-2 border-[#D4AF37] rounded-lg p-6 flex flex-col justify-between"
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            <div>
              <img
                src={carImage}
                alt={carName}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-2xl font-bold text-[#0A1128] mb-2">
                {carName}
              </h3>
            </div>
            <div className="space-y-3 border-t border-[#E8E0D5] pt-4">
              <div className="flex justify-between items-center">
                <span className="text-[#0A1128] font-semibold">ROI</span>
                <span className="text-2xl font-bold text-[#D4AF37]">{roi}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#0A1128] font-semibold">Period</span>
                <span className="text-lg font-semibold text-[#0A1128]">
                  {period}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-[#0A1128] mt-4">
              <RotateCw size={16} />
              <span>Click to see details</span>
            </div>
          </div>

          {/* Back of card */}
          <div
            className="absolute w-full h-full bg-[#0A1128] border-2 border-[#D4AF37] rounded-lg p-6 flex flex-col justify-between"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div>
              <h4 className="text-xl font-bold text-[#D4AF37] mb-4 uppercase tracking-wide">
                Technical Details
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-[#F8F1E9] text-sm uppercase tracking-wide opacity-70">
                    Mileage
                  </p>
                  <p className="text-[#D4AF37] font-semibold text-lg">{mileage}</p>
                </div>
                <div>
                  <p className="text-[#F8F1E9] text-sm uppercase tracking-wide opacity-70">
                    Condition
                  </p>
                  <p className="text-[#D4AF37] font-semibold text-lg">{condition}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-[#D4AF37] border-opacity-30 pt-4">
              <div>
                <p className="text-[#F8F1E9] text-sm uppercase tracking-wide opacity-70">
                  Market Value
                </p>
                <p className="text-[#D4AF37] font-semibold text-lg">
                  {marketValue}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#F8F1E9] text-xs uppercase tracking-wide opacity-70">
                    Token Price
                  </p>
                  <p className="text-[#D4AF37] font-semibold">{tokenPrice}</p>
                </div>
                <div>
                  <p className="text-[#F8F1E9] text-xs uppercase tracking-wide opacity-70">
                    Supply
                  </p>
                  <p className="text-[#D4AF37] font-semibold">{tokenSupply}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-[#F8F1E9] mt-4">
              <RotateCw size={16} />
              <span>Click to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
