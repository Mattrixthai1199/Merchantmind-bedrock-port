import { world, system, ItemStack } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";

// --- Data & Constants ---
const WORTH = {
    "minecraft:dirt": 1, "minecraft:cobblestone": 1, "minecraft:stone": 2, "minecraft:netherrack": 1,
    "minecraft:deepslate": 2, "minecraft:sandstone": 2, "minecraft:smooth_stone": 3, "minecraft:glass": 2,
    "minecraft:bricks": 8, "minecraft:obsidian": 25, "minecraft:oak_log": 4, "minecraft:oak_planks": 1,
    "minecraft:stick": 1, "minecraft:flint": 2, "minecraft:string": 3, "minecraft:leather": 6,
    "minecraft:coal": 3, "minecraft:charcoal": 2, "minecraft:raw_copper": 3, "minecraft:copper_ingot": 5,
    "minecraft:raw_iron": 6, "minecraft:iron_ingot": 10, "minecraft:iron_nugget": 1,
    "minecraft:raw_gold": 8, "minecraft:gold_ingot": 14, "minecraft:gold_nugget": 2,
    "minecraft:redstone": 4, "minecraft:lapis_lazuli": 4, "minecraft:quartz": 5, "minecraft:amethyst_shard": 8,
    "minecraft:emerald": 30, "minecraft:diamond": 80, "minecraft:netherite_scrap": 220, "minecraft:netherite_ingot": 1000,
    "minecraft:coal_block": 26, "minecraft:copper_block": 44, "minecraft:iron_block": 88,
    "minecraft:gold_block": 124, "minecraft:redstone_block": 34, "minecraft:lapis_block": 34,
    "minecraft:quartz_block": 20, "minecraft:emerald_block": 265, "minecraft:diamond_block": 710,
    "minecraft:netherite_block": 8800, "minecraft:bookshelf": 20,
    "minecraft:wooden_sword": 4, "minecraft:stone_sword": 6, "minecraft:iron_sword": 22,
    "minecraft:golden_sword": 30, "minecraft:diamond_sword": 165, "minecraft:netherite_sword": 1180,
    "minecraft:bow": 20, "minecraft:crossbow": 45, "minecraft:trident": 600, "minecraft:mace": 900,
    "minecraft:arrow": 2, "minecraft:spectral_arrow": 6, "minecraft:tipped_arrow": 12,
    "minecraft:wooden_pickaxe": 6, "minecraft:stone_pickaxe": 9, "minecraft:iron_pickaxe": 34,
    "minecraft:golden_pickaxe": 46, "minecraft:diamond_pickaxe": 245, "minecraft:netherite_pickaxe": 1260,
    "minecraft:wooden_axe": 6, "minecraft:stone_axe": 9, "minecraft:iron_axe": 34,
    "minecraft:diamond_axe": 245, "minecraft:netherite_axe": 1260,
    "minecraft:iron_shovel": 12, "minecraft:diamond_shovel": 85,
    "minecraft:iron_hoe": 22, "minecraft:diamond_hoe": 165,
    "minecraft:shears": 20, "minecraft:flint_and_steel": 12, "minecraft:fishing_rod": 10,
    "minecraft:brush": 26, "minecraft:spyglass": 26, "minecraft:compass": 44, "minecraft:clock": 60,
    "minecraft:leather_helmet": 30, "minecraft:leather_chestplate": 48, "minecraft:leather_leggings": 42, "minecraft:leather_boots": 24,
    "minecraft:chainmail_helmet": 60, "minecraft:chainmail_chestplate": 96, "minecraft:chainmail_leggings": 84, "minecraft:chainmail_boots": 48,
    "minecraft:iron_helmet": 50, "minecraft:iron_chestplate": 80, "minecraft:iron_leggings": 70, "minecraft:iron_boots": 40,
    "minecraft:golden_helmet": 70, "minecraft:golden_chestplate": 112, "minecraft:golden_leggings": 98, "minecraft:golden_boots": 56,
    "minecraft:diamond_helmet": 400, "minecraft:diamond_chestplate": 640, "minecraft:diamond_leggings": 560, "minecraft:diamond_boots": 320,
    "minecraft:netherite_helmet": 1400, "minecraft:netherite_chestplate": 1640, "minecraft:netherite_leggings": 1560, "minecraft:netherite_boots": 1320,
    "minecraft:turtle_helmet": 250, "minecraft:shield": 20,
    "minecraft:golden_apple": 120, "minecraft:fire_charge": 6, "minecraft:snowball": 1,
    "minecraft:egg": 2, "minecraft:tnt": 40, "minecraft:eye_of_ender": 24, "minecraft:firework_rocket": 6,
    "minecraft:ender_pearl": 18, "minecraft:wind_charge": 6, "minecraft:experience_bottle": 20,
    "minecraft:chest": 8, "minecraft:barrel": 10, "minecraft:ender_chest": 220, "minecraft:hopper": 60,
    "minecraft:shulker_box": 540, "minecraft:elytra": 2000, "minecraft:saddle": 60,
    "minecraft:name_tag": 45, "minecraft:lead": 8, "minecraft:bucket": 30,
    "minecraft:water_bucket": 32, "minecraft:lava_bucket": 40,
    "minecraft:minecart": 50, "minecraft:rail": 4, "minecraft:powered_rail": 20,
    "minecraft:bread": 4, "minecraft:cooked_beef": 6, "minecraft:cooked_porkchop": 6,
    "minecraft:cooked_chicken": 4, "minecraft:cooked_mutton": 5, "minecraft:cooked_salmon": 5,
    "minecraft:cooked_cod": 4, "minecraft:baked_potato": 3, "minecraft:carrot": 2,
    "minecraft:golden_carrot": 20, "minecraft:apple": 3, "minecraft:cake": 30,
    "minecraft:pumpkin_pie": 8, "minecraft:cookie": 2, "minecraft:melon_slice": 1,
    "minecraft:sweet_berries": 2, "minecraft:honey_bottle": 8, "minecraft:milk_bucket": 34,
    "minecraft:redstone_torch": 6, "minecraft:repeater": 24, "minecraft:comparator": 30,
    "minecraft:piston": 26, "minecraft:sticky_piston": 36, "minecraft:observer": 32,
    "minecraft:dispenser": 40, "minecraft:dropper": 12, "minecraft:lever": 3,
    "minecraft:tripwire_hook": 12, "minecraft:daylight_detector": 34, "minecraft:target": 20,
    "minecraft:redstone_lamp": 30, "minecraft:note_block": 22, "minecraft:slime_block": 45,
    "minecraft:honey_block": 40,
    "minecraft:torch": 1, "minecraft:lantern": 12, "minecraft:soul_lantern": 16, "minecraft:candle": 6,
    "minecraft:glowstone": 16, "minecraft:sea_lantern": 40, "minecraft:flower_pot": 4,
    "minecraft:painting": 10, "minecraft:item_frame": 12, "minecraft:chiseled_bookshelf": 14,
    "minecraft:oak_sign": 3, "minecraft:white_bed": 12, "minecraft:armor_stand": 12,
    "minecraft:decorated_pot": 16, "minecraft:amethyst_cluster": 30, "minecraft:lodestone": 110,
    "minecraft:enchanted_golden_apple": 1200, "minecraft:totem_of_undying": 900,
    "minecraft:nether_star": 2500, "minecraft:dragon_egg": 5000, "minecraft:dragon_head": 3000,
    "minecraft:beacon": 2600, "minecraft:conduit": 1400, "minecraft:heart_of_the_sea": 800,
    "minecraft:enchanted_book": 150, "minecraft:wither_skeleton_skull": 400,
    "minecraft:end_crystal": 300, "minecraft:shulker_shell": 260
};

const CATEGORIES = {
    "WEAPON": ["minecraft:wooden_sword", "minecraft:stone_sword", "minecraft:iron_sword", "minecraft:golden_sword", "minecraft:diamond_sword", "minecraft:netherite_sword", "minecraft:bow", "minecraft:crossbow", "minecraft:trident", "minecraft:mace", "minecraft:arrow"],
    "ARMOR": ["minecraft:leather_helmet", "minecraft:leather_chestplate", "minecraft:leather_leggings", "minecraft:leather_boots", "minecraft:chainmail_helmet", "minecraft:chainmail_chestplate", "minecraft:chainmail_leggings", "minecraft:chainmail_boots", "minecraft:iron_helmet", "minecraft:iron_chestplate", "minecraft:iron_leggings", "minecraft:iron_boots", "minecraft:golden_helmet", "minecraft:golden_chestplate", "minecraft:golden_leggings", "minecraft:golden_boots", "minecraft:diamond_helmet", "minecraft:diamond_chestplate", "minecraft:diamond_leggings", "minecraft:diamond_boots", "minecraft:netherite_helmet", "minecraft:netherite_chestplate", "minecraft:netherite_leggings", "minecraft:netherite_boots", "minecraft:turtle_helmet", "minecraft:shield"],
    "TOOLS": ["minecraft:wooden_pickaxe", "minecraft:stone_pickaxe", "minecraft:iron_pickaxe", "minecraft:golden_pickaxe", "minecraft:diamond_pickaxe", "minecraft:netherite_pickaxe", "minecraft:wooden_axe", "minecraft:stone_axe", "minecraft:iron_axe", "minecraft:diamond_axe", "minecraft:netherite_axe", "minecraft:iron_shovel", "minecraft:diamond_shovel", "minecraft:iron_hoe", "minecraft:diamond_hoe", "minecraft:shears", "minecraft:flint_and_steel", "minecraft:fishing_rod", "minecraft:brush", "minecraft:spyglass", "minecraft:compass", "minecraft:clock"],
    "RESOURCES": ["minecraft:iron_ingot", "minecraft:gold_ingot", "minecraft:copper_ingot", "minecraft:netherite_ingot", "minecraft:netherite_scrap", "minecraft:diamond", "minecraft:emerald", "minecraft:lapis_lazuli", "minecraft:redstone", "minecraft:quartz", "minecraft:amethyst_shard", "minecraft:coal", "minecraft:charcoal", "minecraft:raw_iron", "minecraft:raw_gold", "minecraft:raw_copper", "minecraft:iron_nugget", "minecraft:gold_nugget", "minecraft:stick", "minecraft:flint", "minecraft:leather", "minecraft:string"],
    "BLOCKS": ["minecraft:stone", "minecraft:cobblestone", "minecraft:oak_planks", "minecraft:oak_log", "minecraft:glass", "minecraft:bricks", "minecraft:iron_block", "minecraft:gold_block", "minecraft:diamond_block", "minecraft:emerald_block", "minecraft:copper_block", "minecraft:netherite_block", "minecraft:redstone_block", "minecraft:lapis_block", "minecraft:coal_block", "minecraft:obsidian", "minecraft:sandstone", "minecraft:quartz_block", "minecraft:bookshelf", "minecraft:smooth_stone", "minecraft:deepslate"],
    "UTILITY": ["minecraft:ender_pearl", "minecraft:wind_charge", "minecraft:experience_bottle", "minecraft:ender_chest", "minecraft:chest", "minecraft:barrel", "minecraft:hopper", "minecraft:shulker_box", "minecraft:elytra", "minecraft:saddle", "minecraft:name_tag", "minecraft:lead", "minecraft:bucket", "minecraft:water_bucket", "minecraft:lava_bucket", "minecraft:minecart", "minecraft:rail", "minecraft:powered_rail"],
    "FOOD": ["minecraft:bread", "minecraft:cooked_beef", "minecraft:cooked_porkchop", "minecraft:cooked_chicken", "minecraft:cooked_mutton", "minecraft:cooked_salmon", "minecraft:cooked_cod", "minecraft:baked_potato", "minecraft:carrot", "minecraft:golden_carrot", "minecraft:apple", "minecraft:cake", "minecraft:pumpkin_pie", "minecraft:cookie", "minecraft:melon_slice", "minecraft:sweet_berries", "minecraft:honey_bottle", "minecraft:milk_bucket"],
    "REDSTONE": ["minecraft:redstone", "minecraft:redstone_torch", "minecraft:repeater", "minecraft:comparator", "minecraft:piston", "minecraft:sticky_piston", "minecraft:observer", "minecraft:dispenser", "minecraft:dropper", "minecraft:hopper", "minecraft:lever", "minecraft:tripwire_hook", "minecraft:daylight_detector", "minecraft:target", "minecraft:redstone_lamp", "minecraft:note_block", "minecraft:slime_block", "minecraft:honey_block"],
    "DECORATION": ["minecraft:torch", "minecraft:lantern", "minecraft:soul_lantern", "minecraft:candle", "minecraft:glowstone", "minecraft:sea_lantern", "minecraft:flower_pot", "minecraft:painting", "minecraft:item_frame", "minecraft:chiseled_bookshelf", "minecraft:oak_sign", "minecraft:white_bed", "minecraft:armor_stand", "minecraft:decorated_pot", "minecraft:amethyst_cluster", "minecraft:lodestone"],
    "RARE": ["minecraft:netherite_ingot", "minecraft:enchanted_golden_apple", "minecraft:totem_of_undying", "minecraft:nether_star", "minecraft:dragon_egg", "minecraft:dragon_head", "minecraft:beacon", "minecraft:conduit", "minecraft:heart_of_the_sea", "minecraft:enchanted_book", "minecraft:wither_skeleton_skull", "minecraft:end_crystal", "minecraft:shulker_shell", "minecraft:elytra"]
};

// Combat Constants
const SLAM_MAX_TICKS = 38;
const SLAM_MIN_BONUS = 0.4;
const SLAM_MAX_BONUS = 14.0;
const ARROW_REFLECT_MULTIPLIER = 3.0;
const KEEP_CHANCE = 0.17;

// State Tracking
const playerSlamCharge = new Map(); // UUID -> startTick

// --- Helper Functions ---
function getCoins(player) {
    let coins = player.getDynamicProperty("merchantmind:coins");
    return coins === undefined ? 0 : coins;
}

function addCoins(player, amount) {
    let current = getCoins(player);
    player.setDynamicProperty("merchantmind:coins", Math.max(0, current + amount));
}

function getRandomItems(category, count = 4) {
    const pool = CATEGORIES[category];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, pool.length));
}

// --- Shop Logic (Restock) ---
function getCategoryState(category) {
    let stateStr = world.getDynamicProperty(`merchantmind:cat_${category}`);
    if (!stateStr) {
        const initialState = {
            stock: 6,
            restockTicks: 0,
            currentItems: getRandomItems(category, 4)
        };
        world.setDynamicProperty(`merchantmind:cat_${category}`, JSON.stringify(initialState));
        return initialState;
    }
    return JSON.parse(stateStr);
}

function setCategoryState(category, state) {
    world.setDynamicProperty(`merchantmind:cat_${category}`, JSON.stringify(state));
}

system.runInterval(() => {
    for (const cat in CATEGORIES) {
        let state = getCategoryState(cat);
        if (state.restockTicks > 0) {
            state.restockTicks--;
            if (state.restockTicks === 0) {
                state.stock = 6;
                state.currentItems = getRandomItems(cat, 4); // สุ่มไอเทมใหม่เมื่อเติมของเสร็จ
            }
            setCategoryState(cat, state);
        }
    }
}, 1);

// --- UI Logic ---
function openMainMenu(player) {
    const form = new ActionFormData()
        .title("Merchant Mind v1.4.4")
        .body(`Welcome, traveler. You have ${getCoins(player)} coins.\nHow can I help you today?`)
        .button("Buy Items", "textures/gui/icon/trade")
        .button("Sell Items", "textures/gui/icon/sell")
        .button("Restock Categories", "textures/gui/icon/resources")
        .button("Help", "textures/gui/icon/help");

    form.show(player).then(response => {
        if (response.canceled) return;
        switch (response.selection) {
            case 0: openBuyCategoryMenu(player); break;
            case 1: openSellMenu(player); break;
            case 2: openRestockMenu(player); break;
            case 3: openHelpMenu(player); break;
        }
    });
}

function openRestockMenu(player) {
    const form = new ActionFormData().title("Restock Management").body("Select a category to manage its stock.");
    const catKeys = Object.keys(CATEGORIES);
    for (const cat of catKeys) {
        let state = getCategoryState(cat);
        let status = state.restockTicks > 0 ? `§eRestocking (${Math.ceil(state.restockTicks/20)}s)` : `§aStock: ${state.stock}/6`;
        form.button(`${cat}\n${status}`);
    }
    form.button("Back");

    form.show(player).then(response => {
        if (response.canceled || response.selection === catKeys.length) {
            openMainMenu(player);
            return;
        }
        const cat = catKeys[response.selection];
        openCategoryRestockDetail(player, cat);
    });
}

function openCategoryRestockDetail(player, category) {
    let state = getCategoryState(category);
    const form = new ActionFormData().title(`Manage: ${category}`);

    if (state.restockTicks > 0) {
        form.body(`Status: §eRestocking...§r\nTime remaining: ${Math.ceil(state.restockTicks/20)} seconds.\n\nTo skip the wait, hold §f2 Iron Ingots§r in your hand and press the button below.`);
        form.button("§lSubmit 2 Iron Ingots§r\n(From Main Hand)");
    } else {
        form.body(`Status: §aReady§r\nCurrent Stock: ${state.stock}/6\n\nYou can manually trigger a restock to refresh the items (takes 60s).`);
        form.button("Manual Restock\n(Wait 60 seconds)");
    }
    form.button("Back");

    form.show(player).then(response => {
        if (response.canceled || response.selection === 1) {
            openRestockMenu(player);
            return;
        }

        if (state.restockTicks > 0) {
            submitIronFromHand(player, category);
        } else {
            state.restockTicks = 60 * 20;
            state.stock = 0;
            setCategoryState(category, state);
            player.sendMessage(`§e[MerchantMind] Manual restock started for ${category}.`);
            openRestockMenu(player);
        }
    });
}

function submitIronFromHand(player, category) {
    const equippable = player.getComponent("equippable");
    const mainHand = equippable.getEquipment("Mainhand");

    if (!mainHand || mainHand.typeId !== "minecraft:iron_ingot") {
        player.sendMessage("§cYou must be holding Iron Ingots in your main hand!");
        return;
    }

    if (mainHand.amount < 2) {
        player.sendMessage(`§cYou need at least 2 Iron Ingots!`);
        return;
    }

    if (mainHand.amount === 2) {
        equippable.setEquipment("Mainhand", undefined);
    } else {
        mainHand.amount -= 2;
        equippable.setEquipment("Mainhand", mainHand);
    }

    let state = getCategoryState(category);
    state.stock = 6;
    state.restockTicks = 0;
    state.currentItems = getRandomItems(category, 4); // สุ่มไอเทมใหม่ทันทีเมื่อใช้เหล็กเร่ง
    setCategoryState(category, state);

    player.playSound("random.levelup");
    player.sendMessage(`§a[MerchantMind] Restock completed for ${category} using 2 Iron Ingots!`);
    openRestockMenu(player);
}

function openBuyCategoryMenu(player) {
    const form = new ActionFormData().title("Select Category");
    const catKeys = Object.keys(CATEGORIES);
    for (const cat of catKeys) {
        form.button(cat, `textures/gui/icon/${cat.toLowerCase()}`);
    }
    form.button("Back");

    form.show(player).then(response => {
        if (response.canceled || response.selection === catKeys.length) {
            openMainMenu(player);
            return;
        }
        openBuyItemMenu(player, catKeys[response.selection]);
    });
}

function openBuyItemMenu(player, category) {
    const state = getCategoryState(category);

    // ตรวจสอบสถานะ Restock
    if (state.restockTicks > 0) {
        new MessageFormData()
            .title(`Shop: ${category}`)
            .body(`§eCategory is currently restocking...§r\nTime remaining: ${Math.ceil(state.restockTicks/20)}s`)
            .button1("Back")
            .show(player).then(() => openBuyCategoryMenu(player));
        return;
    }

    if (state.stock <= 0) {
        player.sendMessage("§cOut of stock! Please restock this category.");
        openBuyCategoryMenu(player);
        return;
    }

    const items = state.currentItems || [];
    const form = new ActionFormData().title(`Buy: ${category}`).body(`Coins: ${getCoins(player)} | Stock: ${state.stock}`);

    for (const itemId of items) {
        const price = WORTH[itemId] || 100;
        form.button(`${itemId.replace("minecraft:", "")}\nPrice: ${price} coins`);
    }
    form.button("Back");

    form.show(player).then(response => {
        if (response.canceled || response.selection === items.length) {
            openBuyCategoryMenu(player);
            return;
        }
        const selectedItem = items[response.selection];
        confirmPurchase(player, selectedItem, category);
    });
}

function confirmPurchase(player, itemId, category) {
    let state = getCategoryState(category);

    if (state.restockTicks > 0 || state.stock <= 0) {
        player.sendMessage("§cTransaction failed: Category is restocking or out of stock.");
        return;
    }

    const price = WORTH[itemId] || 100;
    new ModalFormData().title("Confirm Purchase").slider("Quantity", 1, 64, 1, 1).show(player).then(response => {
        if (response.canceled) return;
        const qty = response.formValues[0];
        const total = price * qty;

        if (getCoins(player) < total) { player.sendMessage("§cNot enough coins!"); return; }

        // Re-check state just before final transaction
        state = getCategoryState(category);
        if (state.stock <= 0) { player.sendMessage("§cOut of stock!"); return; }

        addCoins(player, -total);
        state.stock--;
        if (state.stock === 0) state.restockTicks = 60 * 20; // 60s restock
        setCategoryState(category, state);

        player.runCommandAsync(`give @s ${itemId} ${qty}`);
        player.sendMessage(`§aBought ${qty}x ${itemId.replace("minecraft:", "")}`);
    });
}

function openSellMenu(player) {
    const inventory = player.getComponent("inventory").container;
    const sellableItems = [];
    for (let i = 0; i < inventory.size; i++) {
        const item = inventory.getItem(i);
        if (item && WORTH[item.typeId]) sellableItems.push({ typeId: item.typeId, amount: item.amount, slot: i });
    }

    if (sellableItems.length === 0) {
        new MessageFormData().title("Sell Items").body("No items to sell.").button1("Back").show(player).then(() => openMainMenu(player));
        return;
    }

    const form = new ActionFormData().title("Sell Items");
    for (const item of sellableItems) {
        const value = Math.floor(WORTH[item.typeId] * 0.7);
        form.button(`${item.typeId.replace("minecraft:", "")} (x${item.amount})\nValue: ${value} each`);
    }
    form.button("Back");

    form.show(player).then(response => {
        if (response.canceled || response.selection === sellableItems.length) { openMainMenu(player); return; }
        const item = sellableItems[response.selection];
        confirmSell(player, item);
    });
}

function confirmSell(player, itemData) {
    const value = Math.floor(WORTH[itemData.typeId] * 0.7);
    new ModalFormData().title("Confirm Sale").slider("Quantity", 1, itemData.amount, 1, 1).show(player).then(response => {
        if (response.canceled) return;
        const qty = response.formValues[0];
        const inventory = player.getComponent("inventory").container;
        const currentItem = inventory.getItem(itemData.slot);
        if (!currentItem || currentItem.typeId !== itemData.typeId || currentItem.amount < qty) return;

        if (qty === currentItem.amount) inventory.setItem(itemData.slot, undefined);
        else { currentItem.amount -= qty; inventory.setItem(itemData.slot, currentItem); }

        addCoins(player, value * qty);
        player.sendMessage(`§aSold for ${value * qty} coins.`);
    });
}

function openHelpMenu(player) {
    new MessageFormData().title("Merchant Mind Help").body("- Slam Charge: Hold sword/axe while hitting/breaking to charge bonus damage.\n- Arrow Reflect: Reflect arrow damage 3x back to shooter.\n- Mob Culling: Skeletal/Baby Zombies spawn 83% less.\n- Restock: Categories lock when empty, pay iron to unlock.\n- Randomized Shop: Shop items refresh randomly after each restock.").button1("Back").show(player).then(() => openMainMenu(player));
}

// --- Events ---
world.beforeEvents.itemUse.subscribe(event => {
    const itemId = event.itemStack.typeId;
    if (itemId === "merchantmind:shop_opener") system.run(() => openMainMenu(event.source));
    else if (itemId === "merchantmind:item_cleaner") {
        system.run(() => {
            const items = world.getDimension(event.source.dimension.id).getEntities({ type: "minecraft:item" });
            items.forEach(i => i.remove());
            event.source.sendMessage(`§7[MerchantMind] Cleaned ${items.length} items.`);
        });
    }
});

// Slam Charge Logic
system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        const equippable = player.getComponent("equippable");
        const weapon = equippable.getEquipment("Mainhand");

        if (weapon && (weapon.typeId.includes("sword") || weapon.typeId.includes("axe"))) {
            let startTick = playerSlamCharge.get(player.id);
            if (startTick === undefined) {
                playerSlamCharge.set(player.id, system.currentTick);
                startTick = system.currentTick;
            }

            const heldTicks = system.currentTick - startTick;
            const ratio = Math.min(1.0, Math.max(0.0, heldTicks / SLAM_MAX_TICKS));

            if (ratio > 0.2) {
                player.dimension.spawnParticle("minecraft:electric_spark_particle", {
                    x: player.location.x,
                    y: player.location.y + 1,
                    z: player.location.z
                });

                // Sound removed per user request

                const segments = 20;
                const filled = Math.floor(ratio * segments);
                const bar = "§f" + "▮".repeat(filled) + "§8" + "▮".repeat(segments - filled);
                const color = ratio >= 1.0 ? "§6§l" : "§e";
                const glow = (system.currentTick % 10 < 5 && ratio >= 1.0) ? "§f§l" : color;

                player.onScreenDisplay.setActionBar(`${glow}⚡ SLAM CHARGE ⚡\n${bar} §r${color}${Math.round(ratio * 100)}%`);

                if (ratio >= 1.0 && system.currentTick % 20 === 0) {
                    player.dimension.spawnParticle("minecraft:electric_spark_particle", player.location);
                }
            }
        } else {
            playerSlamCharge.delete(player.id);
        }
    }
}, 2);

world.afterEvents.entityHitEntity.subscribe(event => {
    const attacker = event.damagingEntity;
    if (attacker.typeId !== "minecraft:player") return;

    const startTick = playerSlamCharge.get(attacker.id);
    if (startTick !== undefined) {
        const heldTicks = system.currentTick - startTick;
        const ratio = Math.min(1.0, Math.max(0.0, heldTicks / SLAM_MAX_TICKS));

        if (ratio >= 0.3) {
            const bonus = SLAM_MIN_BONUS + Math.pow(ratio, 1.6) * (SLAM_MAX_BONUS - SLAM_MIN_BONUS);
            event.hitEntity.applyDamage(bonus, { cause: "override", damagingEntity: attacker });
            event.hitEntity.dimension.spawnParticle("minecraft:huge_explosion_emitter", event.hitEntity.location);
            const color = ratio >= 1.0 ? "§6§l" : "§e§l";
            attacker.onScreenDisplay.setActionBar(`${color}⚡ SLAM! +${bonus.toFixed(1)} DAMAGE ⚡`);
            playerSlamCharge.set(attacker.id, system.currentTick);
        }
    }
});

// Arrow Reflect & Pearl Heal
world.afterEvents.entityHurt.subscribe(event => {
    const victim = event.hurtEntity;
    if (victim.typeId === "minecraft:player") {
        if (event.damageSource.cause === "projectile") {
            const attacker = event.damageSource.damagingEntity;
            if (attacker && attacker.isValid()) {
                attacker.applyDamage(event.damage * ARROW_REFLECT_MULTIPLIER, { cause: "thorns", damagingEntity: victim });
                victim.sendMessage("§eArrow Reflected 3x!");
            }
        }
    }
});

world.afterEvents.itemUse.subscribe(event => {
    if (event.itemStack.typeId === "minecraft:ender_pearl") {
        const health = event.source.getComponent("health");
        health.setCurrentValue(health.effectiveMax);
    }
});

// Mob Culling
world.afterEvents.entitySpawn.subscribe(event => {
    const entity = event.entity;
    if (entity.typeId === "minecraft:skeleton" || (entity.typeId === "minecraft:zombie" && entity.getComponent("is_baby"))) {
        if (Math.random() > KEEP_CHANCE) system.run(() => entity.remove());
    }
});

world.sendMessage("Merchant Mind Bedrock v1.4.4 Loaded!");
