import { ArrowRight, TrendingUp, Lock, Globe } from 'lucide-react';
import FlipCard from '@/components/FlipCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F1E9]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#F8F1E9] border-b-2 border-[#D4AF37] z-50">
        <div className="container flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663411014546/3VU2yRwqfwuDCwj6AyQWr5/autotoken_mark_only_d3e9278d.PNG" alt="autotoken.me logo" className="w-12 h-12 object-contain" />
            <h1 className="text-2xl font-bold text-[#0A1128]">autotoken.me</h1>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#era" className="text-[#0A1128] hover:text-[#D4AF37] transition">
              The Era
            </a>
            <a href="#concepts" className="text-[#0A1128] hover:text-[#D4AF37] transition">
              Concepts
            </a>
            <a href="#assets" className="text-[#0A1128] hover:text-[#D4AF37] transition">
              Assets
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-[#0A1128] mb-6 leading-tight">
                Tokenizing Luxury Automobiles
              </h2>
              <p className="text-xl text-[#0A1128] mb-8 leading-relaxed opacity-80">
                Transform high-value vehicles into regulated digital investment assets. 
                Own fractional shares of exotic cars and participate in a new era of 
                alternative investments.
              </p>
              <div className="flex gap-4">
                <Button className="bg-[#0A1128] text-[#F8F1E9] hover:bg-[#D4AF37] hover:text-[#0A1128] px-8 py-6 text-lg">
                  Explore Assets <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button variant="outline" className="border-[#D4AF37] text-[#0A1128] hover:bg-[#D4AF37] hover:text-[#0A1128] px-8 py-6 text-lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-[#0A1128] to-[#D4AF37] rounded-lg p-1">
                <div className="bg-[#F8F1E9] rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp size={64} className="text-[#D4AF37] mx-auto mb-4" />
                    <p className="text-[#0A1128] font-semibold">Premium Digital Assets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Tokenization Era Section */}
      <section id="era" className="py-20 bg-[#0A1128] text-[#F8F1E9]">
        <div className="container max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            The World is Embracing Tokenization
          </h2>
          <p className="text-center text-[#D4AF37] text-xl font-semibold mb-12">
            This is the moment the industry begins. Now is the time to lead.
          </p>
          
          {/* The Institutional Momentum */}
          <div className="mb-16 bg-[#F8F1E9] bg-opacity-5 border border-[#D4AF37] border-opacity-30 rounded-lg p-10">
            <h3 className="text-3xl font-bold mb-6 text-[#D4AF37]">Institutional Momentum in the West</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-3 text-[#F8F1E9]" style={{color: '#b8966f'}}>BlackRock's Commitment</h4>
                <ul className="space-y-2 text-[#F8F1E9] opacity-80">
                  <li style={{color: '#70604c'}}>• <strong style={{color: '#70604c'}}>$2.5 billion</strong> in tokenized Treasuries via BUIDL fund</li>
                  <li style={{color: '#b98850'}}>• Actively building infrastructure for on-chain asset management</li>
                  <li style={{color: '#9d6c34'}}>• Signaling institutional confidence in tokenized markets</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 text-[#F8F1E9]" style={{color: '#cea678'}}>JPMorgan's Blockchain Division</h4>
                <ul className="space-y-2 text-[#F8F1E9] opacity-80">
                  <li style={{color: '#ac8e6c'}}>• Launched multiple blockchain products for institutional clients</li>
                  <li style={{color: '#a78e72'}}>• Developing settlement infrastructure for tokenized assets</li>
                  <li style={{color: '#a07f5a'}}>• Pioneering regulatory compliance frameworks</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Market Explosion */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#F8F1E9] bg-opacity-5 border border-[#D4AF37] border-opacity-30 rounded-lg p-8">
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">$35B+</div>
              <p className="text-[#F8F1E9] font-semibold mb-3" style={{color: '#4f3517'}}>Current Market Size</p>
              <p className="text-[#F8F1E9] opacity-70 text-sm" style={{color: '#34322d'}}>
                Tokenized RWAs reached over $35 billion by November 2025, up from $5 billion in 2022—a 600% increase in just 3 years.
              </p>
            </div>
            <div className="bg-[#F8F1E9] bg-opacity-5 border border-[#D4AF37] border-opacity-30 rounded-lg p-8">
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">224%</div>
              <p className="text-[#F8F1E9] font-semibold mb-3" style={{color: '#24180a'}}>Sector Growth (2024-2025)</p>
              <p className="text-[#F8F1E9] opacity-70 text-sm" style={{color: '#6a4a25'}}>
                The tokenization sector grew 224% year-over-year, evolving from experiments into the programmable foundation of global capital markets.
              </p>
            </div>
            <div className="bg-[#F8F1E9] bg-opacity-5 border border-[#D4AF37] border-opacity-30 rounded-lg p-8">
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">539%</div>
              <p className="text-[#F8F1E9] font-semibold mb-3" style={{color: '#170d02'}}>Tokenized Treasury Growth</p>
              <p className="text-[#F8F1E9] opacity-70 text-sm" style={{color: '#180c0c'}}>
                Tokenized Treasury market expanded 539% from January 2024 to April 2025, driven by institutional adoption.
              </p>
            </div>
          </div>

          {/* The Critical Moment */}
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#E8C547] rounded-lg p-10 text-[#0A1128]">
            <h3 className="text-3xl font-bold mb-4">Why Now is the Critical Moment</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold mb-3">Regulatory Clarity Emerging</h4>
                <p className="opacity-90 leading-relaxed">
                  The U.S., EU, and Asia are establishing clear frameworks for tokenized assets. Dubai's VARA provides the gold standard. The regulatory foundation is being laid right now.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3">Infrastructure is Ready</h4>
                <p className="opacity-90 leading-relaxed">
                  Blockchain networks are production-ready. Settlement is faster and cheaper than traditional systems. The technical barriers have been solved.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3">Institutional Capital is Moving</h4>
                <p className="opacity-90 leading-relaxed">
                  Trillions in institutional capital are waiting for compliant, transparent tokenized assets. Early movers will capture disproportionate market share.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3">Alternative Assets are Underserved</h4>
                <p className="opacity-90 leading-relaxed">
                  Luxury collectibles and vehicles represent $2+ trillion in value with fragmented ownership. Tokenization unlocks this market for institutional investors.
                </p>
              </div>
            </div>
          </div>

          {/* Future Projections */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold mb-6 text-[#D4AF37]">The Trillion-Dollar Opportunity</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#F8F1E9] bg-opacity-5 border border-[#D4AF37] border-opacity-30 rounded-lg p-8">
                <div className="text-5xl font-bold text-[#D4AF37] mb-2">$11-30T</div>
                <p className="text-[#F8F1E9] font-semibold mb-2">By 2030</p>
                <p className="text-[#F8F1E9] opacity-70 text-sm">
                  Ark Invest and BCG project tokenized assets will reach $11-30 trillion by 2030, representing nearly 10% of global GDP.
                </p>
              </div>
              <div className="bg-[#F8F1E9] bg-opacity-5 border border-[#D4AF37] border-opacity-30 rounded-lg p-8">
                <div className="text-5xl font-bold text-[#D4AF37] mb-2">100x</div>
                <p className="text-[#F8F1E9] font-semibold mb-2">Growth Potential</p>
                <p className="text-[#F8F1E9] opacity-70 text-sm">
                  From $35 billion today to $1+ trillion in the next 5 years. Early participants will see exponential returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concepts Section */}
      <section id="concepts" className="py-20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1128] mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="border-l-4 border-[#D4AF37] pl-6">
                <h3 className="text-2xl font-bold text-[#0A1128] mb-2">Asset-Referenced Virtual Assets (ARVA)</h3>
                <p className="text-[#0A1128] opacity-80">
                  Each luxury vehicle is converted into a regulated digital asset. 
                  The car is held in a Special Purpose Vehicle (SPV) with full legal 
                  and financial structuring.
                </p>
              </div>
              <div className="border-l-4 border-[#D4AF37] pl-6">
                <h3 className="text-2xl font-bold text-[#0A1128] mb-2">Fractional Ownership</h3>
                <p className="text-[#0A1128] opacity-80">
                  Own fractional shares through tokens. Each token represents economic 
                  rights in the vehicle. Trade on secondary markets or hold for appreciation.
                </p>
              </div>
              <div className="border-l-4 border-[#D4AF37] pl-6">
                <h3 className="text-2xl font-bold text-[#0A1128] mb-2">Regulated Exit</h3>
                <p className="text-[#0A1128] opacity-80">
                  Exit through asset liquidation or secondary market trading. Benefit 
                  from vehicle appreciation and additional revenue streams like exhibition 
                  or branding rights.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0A1128] to-[#D4AF37] rounded-lg p-1">
              <div className="bg-[#F8F1E9] rounded-lg p-8 h-full flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#D4AF37] mb-2">$16T</div>
                    <p className="text-[#0A1128] font-semibold">Projected tokenized assets by 2030</p>
                  </div>
                  <div className="h-px bg-[#D4AF37]"></div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#0A1128] mb-2">27%</div>
                    <p className="text-[#0A1128] font-semibold">Average ROI for investors</p>
                  </div>
                  <div className="h-px bg-[#D4AF37]"></div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#0A1128] mb-2">3 months - 1 year</div>
                    <p className="text-[#0A1128] font-semibold">Typical investment period</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Asset Section */}
      <section id="assets" className="py-20 bg-[#0A1128]">
        <div className="container max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F8F1E9] mb-4 text-center">
            Featured Asset
          </h2>
          <p className="text-center text-[#F8F1E9] opacity-80 mb-12 max-w-2xl mx-auto">
            Click the card to explore the tokenization details. See how a luxury vehicle 
            becomes an investment opportunity with transparent valuation and ROI projections.
          </p>
          <div className="flex justify-center">
            <FlipCard
              carName="Ferrari SF90 Stradale 2023"
              carImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663411014546/3VU2yRwqfwuDCwj6AyQWr5/ferrari_sf90_99a4a2c5.jpg"
              roi="27%"
              period="3 Years"
              mileage="2,150 km"
              condition="Excellent"
              marketValue="AED 2,200,000"
              tokenPrice="AED 220"
              tokenSupply="10,000 tokens"
            />
          </div>
        </div>
      </section>

      {/* Why autotoken.me Section */}
      <section className="py-20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1128] mb-12 text-center">
            Why autotoken.me
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#0A1128] font-bold text-2xl">✓</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A1128] mb-2">Regulated</h3>
              <p className="text-[#0A1128] opacity-70 text-sm">
                VARA-compliant framework ensures investor protection and transparency
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#0A1128] font-bold text-2xl">✓</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A1128] mb-2">Transparent</h3>
              <p className="text-[#0A1128] opacity-70 text-sm">
                Real-time dashboards and clear valuation metrics for all assets
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#0A1128] font-bold text-2xl">✓</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A1128] mb-2">Secure</h3>
              <p className="text-[#0A1128] opacity-70 text-sm">
                Professional custody and blockchain-backed ownership verification
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#0A1128] font-bold text-2xl">✓</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A1128] mb-2">Accessible</h3>
              <p className="text-[#0A1128] opacity-70 text-sm">
                Fractional ownership opens luxury assets to global investors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0A1128] to-[#1a1f3a]">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F8F1E9] mb-6">
            Join the Tokenization Revolution
          </h2>
          <p className="text-xl text-[#F8F1E9] opacity-80 mb-8">
            Be part of the future of alternative investments. Access luxury assets 
            with transparency, security, and institutional-grade infrastructure.
          </p>
          <Button className="bg-[#D4AF37] text-[#0A1128] hover:bg-[#F8F1E9] px-10 py-6 text-lg font-bold">
            Get Started <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A1128] text-[#F8F1E9] py-12 border-t-2 border-[#D4AF37]">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">autotoken.me</h4>
              <p className="text-sm opacity-70">
                Tokenizing luxury automobiles into digital investment assets.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#" className="hover:text-[#D4AF37]">About Us</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">Careers</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#" className="hover:text-[#D4AF37]">Terms</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">Privacy</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">Compliance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#" className="hover:text-[#D4AF37]">Twitter</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">LinkedIn</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#D4AF37] border-opacity-30 pt-8 text-center text-sm opacity-70">
            <p>&copy; 2026 autotoken.me. All rights reserved. Regulated by VARA.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
