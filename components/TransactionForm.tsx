"use client";

interface TransactionFormProps {
    toAddress: string;
    setToAddress: (address: string) => void;
    vetAmount: string;
    setVetAmount: (amount: string) => void;
    handleTransaction: () => void;
    senderBalance: { formatted: string; wei: bigint } | null;
    receiverBalance: { formatted: string; wei: bigint } | null;
}

export default function TransactionForm({
    toAddress,
    setToAddress,
    vetAmount,
    setVetAmount,
    handleTransaction,
    senderBalance,
    receiverBalance,
}: TransactionFormProps) {
    return (
        <div className="space-y-4">
            {senderBalance && (
                <p className="text-sm text-gray-600 dark:text-gray-300 text-left w-full">
                    Your Balance: {senderBalance.formatted} VET
                </p>
            )}
            <input
                type="text"
                placeholder="Recipient Address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className="w-full p-2 border rounded"
            />
            {receiverBalance && (
                <p className="text-sm text-gray-600 dark:text-gray-300 text-left w-full">
                    Recipient Balance: {receiverBalance.formatted} VET
                </p>
            )}
            <select
                value={vetAmount}
                onChange={(e) => setVetAmount(e.target.value)}
                className="w-full p-2 border rounded"
            >
                <option value="1">1 VET</option>
                <option value="5">5 VET</option>
                <option value="10">10 VET</option>
            </select>
            <button
                onClick={handleTransaction}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Transact
            </button>
        </div>
    );
}
