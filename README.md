# Merchant Mind (Bedrock Edition Port)

> **Source code only — no issue tracker here. Please report bugs or feature requests via email: [mattrixthai9911@zohomail.com](mailto:mattrixthai9911@zohomail.com)**

An AI-powered Minecraft shopkeeper mod for Bedrock Edition with a rotating catalog, smart barter trading, and a Charge & Slam combat mechanic. Built entirely with AI assistance in Thailand.

*To be completely honest:* Opening the shop menu in this Bedrock port feels significantly worse than Java (UI stutters/lags badly). Furthermore, features like **Auto Restock** and the **Iron Slot for Instant Restock** have been completely removed due to Bedrock Engine limitations. Worse UI, missing features, but it works!

---

## Features

### The AI Shopkeeper
A rotating shop with a catalog of items across **11 categories**: Weapon, Armor, Tools, Throwables, Resources, Blocks, Utility, Food, Redstone, Decor, and Rare. Each category has an independent restock timer. When stock runs out or the timer expires, shelves are cleared and refilled with random items from the category pool.

*(Note: Auto Restock and the Iron Restock Shortcut have been stripped out due to Bedrock limitations).*

### Per-World Saves
Shop inventory, restock timers, and player coin balances are saved locally to the specific world folder. Every world maintains a completely separate economy.

### Intelligent Trading (Barter)
The "Trade" tab calculates the true worth of offered items and matches them against shop stock using a deterministic value-matching algorithm with a square-root bundle curve. Leftover value returns as coins.

### Smart Selling
The "Sell" tab applies a **capped bulk bonus of up to +35%** — selling more yields a better per-item rate. Payout is clamped to **70% of true worth** to prevent arbitrage.

### Charge & Slam Combat
Hold the Slam button to charge your weapon. Bonus damage scales up to **+14.0** at full charge (38 ticks / ~1.9 s). A HUD bar shows charge percentage and bonus damage in real time.

### Combat Tweaks
- **Arrow Reflect** — Mob arrows reflect back at **3x damage**
- **Instant Pearl Heal** — Ender Pearl landing grants instant regeneration (6 hearts + Regen III)
- **Jump Crits** — Small bonus for airborne critical hits on hostile mobs
- **Mob Suppression** — Skeletons and baby zombies have an **83% spawn cull rate**
- **Clear Dropped Items** — Option to clear all dropped items in the world

---

## Version Scheme

Merchant Mind follows **Semantic Versioning + build metadata** in the format `MAJOR.MINOR.PATCH+mc<minecraft_version>`.

| Component | When to Increment | Notes |
|-----------|-------------------|-------|
| **MAJOR** | Breaking change — old saves/configs no longer work | Reset MINOR and PATCH to 0 |
| **MINOR** | New feature added, everything old still works | Reset PATCH to 0 |
| **PATCH** | Bug-fix-only, no new features, nothing broken | |
| **+mc\*** | Minecraft version this build targets | No effect on version comparison |

Only one position is incremented per release, matching the **biggest change**. New features always outranks bug fixes.

---

## Technical Details

| | |
|---|---|
| **Platform** | Bedrock Edition (Resource / Behavior Pack) |
| **Minecraft** | 26.1.2 |
| **Dependencies** | None |
| **External Libraries** | None |
| **License** | MIT |
| **Environment** | Client / Server |

---

## Contact

Found a bug? Want a feature? Have an idea? Email me at **mattrixthai9911@zohomail.com** — I will review it and decide whether to add it.

This repository contains source code only. There is no issue tracker here.

---

*This mod was made in Thailand with the assistance of AI tools.*
this mod not for mcpe 1.21.x but for mcpe 1.26.40+
