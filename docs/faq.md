# ❓ FAQ – Frequently Asked Questions

## What is `persona`?

**persona** is a programmable onchain identity toolkit.  
It's not a login, not a platform, not a profile — it's your thought, your style, your presence, signed cryptographically.  
Everything is local, verifiable, and pseudonymous by default.

---

## How is it different from a typical Web3 wallet or identity?

While wallets represent addresses and allow transactions,  
`persona` represents **thinking** and **expression** — in a verifiable, programmable way.  
It’s identity through thought, not possession.

---

## Do I need a server or database to use it?

**No.**  
Everything is stored locally in JSON files under `./storage/`.  
You can export, import, zip, and manipulate them freely.  
No central server. No vendor lock-in. No data leakage.

---

## Does it require an internet connection?

**No, not at all.**  
The entire system works locally, offline.  
You sign and verify thoughts using your own private key.  
If you want, you can later publish thoughts or build onchain integrations — but it’s not required.

---

## Is there any blockchain dependency?

Not yet.  
`persona` does not rely on any live blockchain or smart contract at this stage.  
But all thoughts are signed with Ethereum-compatible keys (`ethers.js`),  
so you can verify authorship or bring this data into any Web3 app.

---

## Can I use `persona` in a dApp, bot, or backend?

Yes.  
The CLI is just one interface.  
You can import the core library in **Node.js**, bots, DAOs, dApps, or data pipelines:

```ts
import { createPersona, postThought } from "proof-of-persona";
```

## What is the `.persona-config.json` file?

It's a small local config that tracks the **currently active persona**.  
It lets you switch between identities easily and makes CLI usage seamless.

```bash
persona use alice
persona post "Thought from Alice"
```
## Are my thoughts public?

**By default, no.**  
Everything stays in your local `storage/` folder.  
You choose when (or if) to export, publish, or share your thoughts.

---

## Can thoughts be faked?

**No — unless someone has your private key.**  
Each thought is signed using `ethers.js` with your private key.  
Verification uses the recovered public key to ensure authenticity.

---

## Can I backup or sync my thoughts?

**Yes.**  
You can export them to `.json`, `.txt`, or `.zip` —  
or even upload to IPFS, Git, or decentralized archives.  
In future versions, syncing with Arweave/IPFS or custom publishing pipelines will be supported.

---

## Can I use multiple personas?

**Yes.**  
You can create and manage as many personas as you want.  
Each one has its own `alias`, `behaviorModel`, `publicKey`, and signed thought history.

---

## What is a behavior model?

It’s a descriptor of your **thinking style** —  
such as `socratic-punk`, `zen-daoist`, `rational-skeptic`, etc.  
Currently symbolic, it may soon power filtering, LLM tuning, or style-based personalization.

---

## Is this anonymous?

**Yes — unless you choose to reveal yourself.**  
The system uses cryptographic keys and pseudonyms, not emails or accounts.  
You can be anyone — or remain entirely anonymous.

---

## Can this be used as a reputation system?

**Absolutely.**  
Thought history + signature verification = **provable expression**.  
In the future, DAOs or dApps could use this as a trust signal —  
rewarding quality, engagement, or philosophical consistency.

---

## What’s next?

Here’s a glimpse of what’s coming:

- ✅ Onchain publishing (e.g. IPFS, ENS, Arweave)  
- ✅ zkProof support for anonymous thought verification  
- ✅ Persona-to-persona messaging  
- ✅ Integrations with DAO tools, publishing dApps, identity platforms  
- ✅ Browser plugin for reading/posting as your persona across Web3

---

For a deeper dive into the concept, see [whitepaper.md](./whitepaper.md).

> ❓ Real questions. Real freedom. Real you.