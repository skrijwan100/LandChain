import React, { useEffect } from 'react'
import contract from "../contracts/LandRegistry.sol/AllLandRegistry.json";
export default function Hello() {
    useEffect(() => {
        const fecthalldata = async () => {
            const infuraProvider = new ethers.JsonRpcProvider(
                import.meta.env.VITE_INFURA_URL
            );
            const Landcontratcget = new ethers.Contract(
                import.meta.env.VITE_CONTRACT_DEPOLY_ADDRESS,
                contract.abi,
                infuraProvider
            );

            const hashedId = keccak256(toUtf8Bytes(aadhaarQuery));

            const depocontract = await Landcontratcget.filters.SaveLandRegistry();
            const event = await Landcontratcget.queryFilter(depocontract);
            if (event.length > 0) {
                const parsedAssets = event.map((e) => {
                    const raw = e.args;
                    return {
                        ownerName: raw[0],
                        hashedId: raw[1],
                        plotNo: Number(raw[2]).toString(),
                        area: raw[3],
                        location: raw[4],
                        image: `https://amber-wonderful-kite-814.mypinata.cloud/ipfs/${raw[5]}`,
                        ownerWallet: raw[6],
                        registryWallet: raw[7],
                    };
                });

            }
        }


        })
    return (
        <div>

        </div>
    )
}
