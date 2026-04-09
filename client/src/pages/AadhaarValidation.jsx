import React, { useState, useEffect } from 'react';
import {
    ShieldCheck,
    ArrowRight,
    Fingerprint,
    Lock,
    XCircle,
    CheckCircle2,
    Circle,
    Square,
    Triangle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useVerifyData } from '../contaxts/verifyDataContext';

const AadhaarValidation = () => {
    const [step, setStep] = useState('aadhaar'); // 'aadhaar', 'otp', 'success', 'error'
    const [aadhaar, setAadhaar] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [referenceId, setReferenceId] = useState('');

    const { verifyData, setVerifyData } = useVerifyData();

    // Mock handlers for the demo
    const handleAadhaarSubmit = async (e) => {
        e.preventDefault();

        if (aadhaar.length === 12) {
            try {
                setIsLoading(true);

                const res = await axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/api/aadhar/send-otp`,
                    {
                        aadharNumber: aadhaar
                    }
                );

                // extract reference_id
                const refId = res.data?.data?.data?.reference_id;

                setReferenceId(refId); // store reference_id
                setStep('otp');

            } catch (error) {
                console.error(error);
                setStep('error');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/aadhar/verify-otp`,
                {
                    reference_id: referenceId,
                    otp: otp
                }
            );

            const status = res.data?.data?.data?.status;

            if (status === "VALID") {
                setVerifyData({
                    aadhaar: aadhaar,
                    name: res.data?.data?.data?.name,
                    address: res.data?.data?.data?.full_address
                })
                setStep('success');
            } else {
                setStep('error');
            }

        } catch (error) {
            console.error(error);
            setStep('error');
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setStep('aadhaar');
        setAadhaar('');
        setOtp('');
    };

    return (
        <div className="min-h-screen bg-[#F0F0F0] text-[#121212] font-['Outfit',sans-serif] selection:bg-[#F0C020]">
            {/* 1. NAVIGATION (Bauhaus Style) */}
            <Navbar />

            {/* 2. MAIN CONTENT AREA */}
            <main className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[calc(100vh-80px)]">

                {/* Left Panel: Verification Form */}
                <section className="p-8 lg:p-16 flex flex-col justify-center border-r-0 lg:border-r-4 border-black">
                    <div className="mb-8">
                        <span className="inline-block px-3 py-1 bg-[#F0C020] border-2 border-black font-bold text-xs uppercase mb-4 shadow-[2px_2px_0px_0px_black]">
                            Secure Verification
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
                            Verify <br />
                            <span className="text-[#D02020]">Identity.</span>
                        </h1>
                        <p className="text-lg font-medium text-gray-700 max-w-md border-l-4 border-[#1040C0] pl-4">
                            Link your Aadhaar to the LandChain protocol to secure your property rights on the decentralized ledger.
                        </p>
                    </div>

                    {/* DYNAMIC FORM CONTAINER */}
                    <div className="relative">
                        {/* Bauhaus Card Background Decoration */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#F0C020] rounded-full border-4 border-black -z-10" />

                        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] p-8 relative overflow-hidden">

                            {/* Step 1: Aadhaar Input */}
                            {step === 'aadhaar' && (
                                <form onSubmit={handleAadhaarSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block font-black uppercase tracking-widest text-sm">Aadhaar Number</label>
                                        <div className="relative">
                                            <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                                            <input
                                                type="text"
                                                maxLength={12}
                                                placeholder="0000 0000 0000"
                                                value={aadhaar}
                                                onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                                                className="w-full pl-14 pr-4 py-4 border-4 border-black text-xl font-bold focus:outline-none focus:bg-[#FFF9C4] transition-colors"
                                                required
                                            />
                                        </div>
                                        <p className="text-xs font-bold text-gray-500 italic uppercase">Your data is encrypted using AES-256</p>
                                    </div>

                                    <button
                                        disabled={aadhaar.length !== 12 || isLoading}
                                        className={`w-full py-4 border-4 border-black font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all
                      ${aadhaar.length === 12
                                                ? 'bg-[#F0C020] shadow-[6px_6px_0px_0px_black] active:translate-x-0.5 active:translate-y-[2px] active:shadow-none'
                                                : 'bg-gray-200 cursor-not-allowed opacity-50'}`}
                                    >
                                        {isLoading ? "Processing..." : "Verify Identity"}
                                        {!isLoading && <ArrowRight className="w-6 h-6" />}
                                    </button>
                                </form>
                            )}

                            {/* Step 2: OTP Input */}
                            {step === 'otp' && (
                                <form onSubmit={handleOtpSubmit} className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                                    <div className="space-y-2">
                                        <label className="block font-black uppercase tracking-widest text-sm">Enter OTP</label>
                                        <p className="text-sm font-medium mb-2">Sent to mobile linked with UIDAI ending in XXXX</p>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                                            <input
                                                type="text"
                                                maxLength={6}
                                                placeholder="123456"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                className="w-full pl-14 pr-4 py-4 border-4 border-black text-4xl tracking-[1em] font-black focus:outline-none focus:bg-[#FFF9C4] transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        disabled={otp.length !== 6 || isLoading}
                                        className={`w-full py-4 border-4 border-black font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all
                      ${otp.length === 6
                                                ? 'bg-[#D02020] text-white shadow-[6px_6px_0px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                                                : 'bg-gray-200 cursor-not-allowed opacity-50'}`}
                                    >
                                        {isLoading ? "Verifying..." : "Confirm OTP"}
                                        {!isLoading && <ShieldCheck className="w-6 h-6" />}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep('aadhaar')}
                                        className="w-full text-center font-bold uppercase text-xs hover:underline"
                                    >
                                        Back to edit Aadhaar
                                    </button>
                                </form>
                            )}

                            {/* Step 3: Success */}
                            {step === 'success' && (
                                <div className="text-center py-8 animate-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-[#1040C0] border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_0px_black]">
                                        <CheckCircle2 className="w-12 h-12 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Verification <br /> Successful</h3>
                                    <p className="text-sm font-medium text-gray-600 mb-8 px-4">
                                        Your identity is now verified. You can proceed with property registration.
                                    </p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="px-8 py-3 bg-black text-white border-2 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#1040C0]"
                                    >
                                        Proceed to Dashboard
                                    </button>
                                </div>
                            )}

                            {/* Step 4: Error */}
                            {step === 'error' && (
                                <div className="text-center py-8 animate-in shake duration-300">
                                    <div className="w-24 h-24 bg-[#D02020] border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_0px_black]">
                                        <XCircle className="w-12 h-12 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Not Applicable</h3>
                                    <p className="text-sm font-medium text-gray-600 mb-8 px-4">
                                        The OTP entered is incorrect or has expired. Please try again.
                                    </p>
                                    <button
                                        onClick={reset}
                                        className="px-8 py-3 bg-[#F0C020] border-4 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_black] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </section>

                {/* Right Panel: Bauhaus Composition (Artistic Side) */}
                <section className="bg-[#1040C0] relative overflow-hidden flex items-center justify-center p-8">
                    {/* Background Dot Grid */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)',
                            backgroundSize: '30px 30px'
                        }}
                    />

                    {/* Abstract Composition */}
                    <div className="relative w-full max-w-md aspect-square">
                        {/* Large Circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border-8 border-black bg-white/10 backdrop-blur-sm" />

                        {/* Rotated Square */}
                        <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-[#F0C020] border-4 border-black rotate-12 shadow-[12px_12px_0px_0px_black]" />

                        {/* Bottom Triangle */}
                        <div className="absolute bottom-[5%] left-[15%] w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-[#D02020] drop-shadow-[8px_8px_0px_black] rotate-[-15deg]" />

                        {/* Functional Block Card (matches the image reference) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-white border-4 border-black shadow-[12px_12px_0px_0px_black] flex flex-col p-4 z-20">
                            <div className="w-full h-32 bg-[#121212] flex items-center justify-center mb-6">
                                <span className="text-white font-black tracking-widest text-sm uppercase">Verification Node</span>
                            </div>
                            <div className="space-y-4">
                                <div className="h-3 w-3/4 bg-gray-200" />
                                <div className="h-3 w-1/2 bg-gray-200" />
                                <div className="h-8 w-full border-2 border-black bg-[#F0C020] flex items-center px-2">
                                    <div className="w-4 h-4 rounded-full bg-black animate-pulse mr-2" />
                                    <span className="text-[10px] font-black uppercase">Status: Syncing...</span>
                                </div>
                            </div>
                        </div>

                        {/* Small floating accents */}
                        <div className="absolute top-[20%] left-[10%] w-8 h-8 rounded-full bg-[#D02020] border-2 border-black" />
                        <div className="absolute bottom-[20%] right-[15%] w-10 h-10 bg-black border-2 border-white rotate-45" />
                    </div>
                </section>
            </main>

            {/* Footer Divider */}
            <footer className="h-10 border-t-4 border-black bg-[#F0C020] flex items-center px-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">© 2024 LANDCHAIN PROTOCOL — FORM FOLLOWS FUNCTION</span>
            </footer>

            {/* Tailwind specific custom animations */}
            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
        </div>
    );
}

export default AadhaarValidation
