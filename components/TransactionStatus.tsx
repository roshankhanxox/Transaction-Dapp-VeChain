"use client";

interface TransactionStatusProps {
    txStatus: string;
    txId: string | null;
}

export default function TransactionStatus({
    txStatus,
    txId,
}: TransactionStatusProps) {
    if (!txStatus) return null;

    return (
        <div className="mt-4 p-2 text-center border rounded">
            <p>{txStatus}</p>
            {txId && (
                <p className="text-sm text-gray-600 font-mono mt-1 break-all">
                    TXID: {txId}
                </p>
            )}
        </div>
    );
}
