"use client";
import { WalletButton, useWallet } from "@vechain/dapp-kit-react";
import TransactionForm from "./TransactionForm";
import { useThor } from "@vechain/dapp-kit-react";
import { Address } from "@vechain/sdk-core";
import { useState, useCallback, useEffect } from "react";
import TransactionStatus from "./TransactionStatus";

export default function Homepage() {
    const { account, signer } = useWallet();
    const thor = useThor();
    const [toAddress, setToAddress] = useState("");
    const [vetAmount, setVetAmount] = useState("1");
    const [txStatus, setTxStatus] = useState("");
    const [txId, setTxId] = useState<string | null>(null);
    const [senderBalance, setSenderBalance] = useState<{
        formatted: string;
        wei: bigint;
    } | null>(null);
    const [receiverBalance, setReceiverBalance] = useState<{
        formatted: string;
        wei: bigint;
    } | null>(null);

    const fetchBalances = useCallback(async () => {
        const formatBalance = (wei: bigint) => {
            const vet = Number(wei) / 1e18;
            return vet.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
            });
        };

        if (account) {
            try {
                const sender = await thor.accounts.getAccount(
                    Address.of(account)
                );
                const senderWei = BigInt(sender.balance);
                setSenderBalance({
                    formatted: formatBalance(senderWei),
                    wei: senderWei,
                });
            } catch {
                setSenderBalance(null);
            }
        }

        if (toAddress && /^0x[a-fA-F0-9]{40}$/.test(toAddress)) {
            try {
                const receiver = await thor.accounts.getAccount(
                    Address.of(toAddress)
                );
                const receiverWei = BigInt(receiver.balance);
                setReceiverBalance({
                    formatted: formatBalance(receiverWei),
                    wei: receiverWei,
                });
            } catch {
                setReceiverBalance(null);
            }
        } else {
            setReceiverBalance(null);
        }
    }, [account, toAddress, thor.accounts]);

    useEffect(() => {
        fetchBalances();
    }, [fetchBalances]);

    const handleTransaction = async () => {
        if (!signer || !toAddress || !senderBalance) {
            setTxStatus(
                "Please connect wallet, enter a valid recipient address, and wait for balance to load."
            );
            return;
        }

        const vetAmountInWei = BigInt(parseFloat(vetAmount) * 1e18);

        if (senderBalance.wei < vetAmountInWei) {
            setTxStatus("Insufficient VET balance.");
            return;
        }

        setTxStatus("Sending transaction...");
        setTxId(null);

        try {
            const valueInWei = vetAmountInWei.toString();

            const txid = await signer.sendTransaction({
                clauses: [
                    {
                        to: toAddress,
                        value: valueInWei,
                        data: "0x",
                    },
                ],
            });

            setTxStatus(`Transaction sent. Waiting for confirmation...`);
            setTxId(txid);

            const txReceipt = await thor.transactions.waitForTransaction(txid);

            if (txReceipt?.reverted) {
                setTxStatus(`Transaction reverted.`);
            } else {
                setTxStatus("Transaction confirmed successfully!");
                fetchBalances(); // Refetch balances after successful transaction
            }
        } catch (error) {
            console.error("Transaction failed:", error);
            setTxStatus(`Transaction failed: ${(error as Error).message}`);
        }
    };

    return (
        <div className="p-4 md:p-8">
            <main className="max-w-md mx-auto p-6 border rounded-lg shadow-md flex flex-col items-center">
                <h1 className="text-2xl font-bold text-center mb-2">
                    VeChain Transaction dApp
                </h1>

                <WalletButton />

                {account && (
                    <p className="text-center mt-4">
                        Connected to:{" "}
                        <span className="font-mono text-sm text-lime-400">
                            {account}
                        </span>
                    </p>
                )}

                <TransactionForm
                    toAddress={toAddress}
                    setToAddress={setToAddress}
                    vetAmount={vetAmount}
                    setVetAmount={setVetAmount}
                    handleTransaction={handleTransaction}
                    senderBalance={senderBalance}
                    receiverBalance={receiverBalance}
                />
                <TransactionStatus txStatus={txStatus} txId={txId} />
            </main>
        </div>
    );
}
