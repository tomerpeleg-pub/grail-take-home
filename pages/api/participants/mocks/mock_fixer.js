import fs from "fs";

/**
 * This is file is modifying mock data generated using mockaroo.com to match the given spec
 */

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const randLetters = (n) =>
  new Array(n)
    .fill(0)
    .map(() => LETTERS[Math.floor(Math.random() * LETTERS.length)])
    .join("");

const randNumbers = (n) =>
  new Array(n)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("");

export const generateId = () => `${randLetters(3)}-${randNumbers(3)}`;

const updateMocks = () => {
  const data = JSON.parse(
    fs.readFileSync("trial_participants.json", { endoing: "utf8" })
  ).map((participant) => ({ ...participant, id: generateId() }));

  fs.writeFileSync("trial_participants.json", JSON.stringify(data));
};
