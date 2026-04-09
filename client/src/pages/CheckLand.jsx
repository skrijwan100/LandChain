import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/UI/Button";
import { Search, MapPin, Maximize2, FileText, LayoutGrid } from "lucide-react";

const CheckLand = () => {
  const [aadhaarQuery, setAadhaarQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [assets, setAssets] = useState(null);

  
  const handleSearch = (e) => {
    e.preventDefault();
    if (aadhaarQuery.length !== 12)
      return alert("Enter valid 12-digit Aadhaar");

    setIsSearching(true);
    console.log("🔍 Fetching assets for Aadhaar:", aadhaarQuery);

    // Mocking Context/API Data response
    setTimeout(() => {
      const mockResponse = [
        {
          id: 1,
          plotNo: "B-204/L",
          area: "1200 Sq Ft",
          location: "Sector 12, Green Valley, Pune",
          image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
          status: "Verified",
        },
        {
          id: 2,
          plotNo: "H-45",
          area: "0.5 Acres",
          location: "New Town Rural Area, West Bengal",
          image:
            "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80&w=1000",
          status: "Verified",
        },
      ];
      setAssets(mockResponse);
      setIsSearching(false);
      console.log("✅ Assets Found:", mockResponse);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-[#121212] font-['Outfit'] flex flex-col">
      <Navbar />

      <main className="grow p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          {/* SEARCH SECTION - Bauhaus Styled Input */}
          <section className="mb-16 text-center">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
              Explore <span className="text-[#1040C0]">Ledger.</span>
            </h1>

            <form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4"
            >
              <div className="relative grow group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-black z-10" />
                <input
                  type="text"
                  maxLength={12}
                  placeholder="Enter 12-Digit Aadhaar Number"
                  value={aadhaarQuery}
                  onChange={(e) =>
                    setAadhaarQuery(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full pl-14 pr-6 py-5 border-4 border-black bg-white text-xl font-black focus:outline-none focus:bg-[#F0C020]/10 transition-all shadow-[8px_8px_0px_0px_black] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[10px_10px_0px_0px_black]"
                  required
                />
              </div>
              <Button
                variant="primary"
                type="submit"
                className="md:w-48 text-xl py-5 shadow-[8px_8px_0px_0px_black]"
              >
                {isSearching ? "..." : "Search"}
              </Button>
            </form>
          </section>

          {/* ASSETS DISPLAY GRID */}
          {assets ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center gap-4 mb-8 border-b-4 border-black pb-4">
                <LayoutGrid className="w-8 h-8 text-[#D02020]" />
                <h2 className="text-3xl font-black uppercase tracking-tight">
                  Linked Assets ({assets.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {assets.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] flex flex-col group overflow-hidden"
                  >
                    {/* Property Image Header */}
                    <div className="h-48 border-b-4 border-black relative overflow-hidden bg-gray-200">
                      <img
                        src={item.image}
                        alt="Property"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-[#1040C0] text-white px-3 py-1 border-2 border-black font-black uppercase text-[10px] tracking-widest shadow-[4px_4px_0px_0px_black]">
                        {item.status}
                      </div>
                    </div>

                    {/* Property Info Body */}
                    <div className="p-6 space-y-4 grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                            Plot / Survey No.
                          </p>
                          <h3 className="text-2xl font-black uppercase">
                            {item.plotNo}
                          </h3>
                        </div>
                        <div className="bg-[#F0C020] border-2 border-black p-2 shadow-[3px_3px_0px_0px_black]">
                          <Maximize2 className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-[#121212]/80">
                        <MapPin className="w-5 h-5 text-[#D02020] shrink-0" />
                        <p className="font-bold text-sm uppercase leading-tight">
                          {item.location}
                        </p>
                      </div>

                      <div className="pt-4 border-t-2 border-black/10 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span className="font-black uppercase text-xs">
                            Area: {item.area}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full py-4 bg-[#121212] text-white font-black uppercase tracking-widest text-xs hover:bg-[#D02020] transition-colors border-t-4 border-black">
                      View On-Chain Certificate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* EMPTY STATE / INITIAL VIEW */
            !isSearching && (
              <div className="py-20 text-center border-4 border-dashed border-gray-400 bg-gray-100/50">
                <p className="text-xl font-bold text-gray-400 uppercase tracking-[0.2em]">
                  Enter Aadhaar to scan Decentralized Records
                </p>
              </div>
            )
          )}

          {/* Loading Placeholder */}
          {isSearching && (
            <div className="py-20 flex flex-col items-center">
              <div className="w-16 h-16 border-8 border-[#1040C0] border-t-[#F0C020] rounded-full animate-spin mb-4" />
              <p className="font-black uppercase animate-pulse">
                Syncing with Nodes...
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckLand;
