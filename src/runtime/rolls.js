import { CHAT_METADATA_KEY, writeSceneMetadata } from "../core/metadata.js";

const rollDie = sides => Math.floor(Math.random() * sides) + 1;

export default function createRollDice(obr) {
  return async function rollDice({
    diceCount,
    thornsCount,
    myChat,
    id,
    player,
    odds,
    setValue,
    role
  }) {
    const dice = [];
    const thorns = [];
    let criticalCount = 0;
    let messyCount = 0;
    let missedDiceCount = 0;
    let thornSuccessCount = 0;

    for (let index = 0; index < diceCount; index++) {
      const result = rollDie(6);
      dice.push(result);
      if (result < 4) missedDiceCount++;
      if (result === 6) criticalCount++;
      else if (result > 3) messyCount++;
    }

    for (let index = 0; index < thornsCount; index++) {
      const result = rollDie(8);
      thorns.push(result);
      if (result > 6) thornSuccessCount++;
    }

    let initialOutcome = "Grim";
    if (criticalCount > 1) initialOutcome = "Critical";
    else if (criticalCount > 0) initialOutcome = "Perfect";
    else if (messyCount > 0) initialOutcome = "Messy";

    const thornEffect = [];
    let outcome = initialOutcome;
    for (let index = 0; index < thornSuccessCount; index++) {
      if (outcome === "Messy") {
        outcome = "Grim";
        thornEffect.push("(Messy -> Grim)");
      } else if (outcome === "Perfect") {
        outcome = "Messy";
        thornEffect.push("(Perfect -> Messy)");
      } else if (outcome === "Grim") {
        outcome = "Disaster";
        thornEffect.push("(Grim -> Disaster)");
      }
    }

    if (odds) thornEffect.push(odds);
    if (outcome === "Critical") thornEffect.push("Add greater effect, secondary effect, or setup a follow-up.");
    if (outcome === "Disaster") thornEffect.push("Worst-case consequences; spend Spark to avoid it.");

    if (typeof setValue === "function") {
      const remainingDiceCount = diceCount - missedDiceCount;
      thornEffect.push(`${diceCount} ➜ ${remainingDiceCount}`);
      if (remainingDiceCount === diceCount) {
        thornEffect.push("No drops: task pool may be pushed/pivoted; other pool may use GM Suspense to drop 1d.");
      }
      setValue(remainingDiceCount);
    }

    if (dice.length === 0 && thorns.length === 0) return;

    const entry = {
      id: Date.now(),
      user: role === "GM" ? "GM" : player,
      dice,
      thorns,
      initialOutcome,
      outcome,
      thornEffect
    };

    const metadata = await obr.scene.getMetadata();
    const chatByPlayer = {
      ...(metadata?.[CHAT_METADATA_KEY] ?? {})
    };
    chatByPlayer[id] = [ ...myChat, entry ];

    writeSceneMetadata(obr.scene, {
      [CHAT_METADATA_KEY]: chatByPlayer
    });

    setTimeout(() => {
      const chatbox = document.getElementById("chatbox");
      if (chatbox) chatbox.scrollTop = chatbox.scrollHeight;
    }, 100);
  };
}
