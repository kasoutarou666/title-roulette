import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";

export const CONTRACT_ADDRESS = "0x558924bac486f7C4588c1d0F824Dd9f43FE0daDb" as const;

export const CONTRACT_ABI = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "titleEn", type: "string" },
      { name: "titleJa", type: "string" },
      { name: "birthYear", type: "uint16" },
      { name: "birthMonth", type: "uint8" },
      { name: "birthDay", type: "uint8" },
      { name: "uri", type: "string" },
    ],
    outputs: [],
  },
] as const;

export async function mintTitleNFT(
  titleEn: string,
  titleJa: string,
  birthYear: number,
  birthMonth: number,
  birthDay: number,
) {
  const uri = `https://title-roulette-j3xw.vercel.app/api/metadata/${encodeURIComponent(titleEn)}`;

  const hash = await writeContract(config, {
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "mint",
    args: [titleEn, titleJa, birthYear, birthMonth, birthDay, uri],
  });

  const receipt = await waitForTransactionReceipt(config, { hash });
  return receipt;
}
