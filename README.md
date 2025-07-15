# 🧾 VeChain Transaction dApp

A beginner-friendly, full-stack VeChain dApp that lets users connect their Sync2 wallet, send VET transactions, and view real-time confirmation status — built using **Next.js** and **VeChain DAppKit**.

---

## 🚀 Features

-   🔐 Wallet connection with **Sync2**
-   💸 VET transaction form with live validation
-   📡 Real-time balance fetch (sender & receiver)
-   📦 Uses VeChain’s `dapp-kit` and `sdk-core`
-   ✅ Shows real-time transaction status using `waitForTransaction()`

---

## 🛠️ Tech Stack

-   [Next.js](https://nextjs.org/)
-   [`@vechain/dapp-kit`](https://www.npmjs.com/package/@vechain/dapp-kit)
-   [`@vechain/dapp-kit-react`](https://www.npmjs.com/package/@vechain/dapp-kit-react)
-   [`@vechain/sdk-core`](https://www.npmjs.com/package/@vechain/sdk-core)
-   TypeScript + TailwindCSS

---

## 🧑‍🍳 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/vechain-transaction-dapp.git
cd vechain-transaction-dapp
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the dev server

```bash
npm run dev
# or
yarn dev
```

---

## 🔑 Prerequisites

-   ✅ [Sync2 Wallet](https://docs.vechain.org/wallets/sync2) installed
-   💧 [VeChain Testnet Faucet](https://faucet.vecha.in/) VET tokens
-   🌐 Sync2 injected (desktop or mobile)

---

## 📚 Learnings

This project was built as a hands-on educational tutorial to explore:

-   Setting up `DAppKitProvider` and disabling SSR
-   Using the `useWallet` and `useThor` hooks
-   Building UI components with full dApp logic
-   Monitoring and displaying blockchain transaction status

🧠 Full write-up/tutorial:

---

## 💙 Special Thanks

-   [VeChain Developer Portal](https://docs.vechain.org/)
-   [VeChain GitHub](https://github.com/vechain)
