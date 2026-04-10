import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

// ═══════════════════════════════════════════════════════════════════
// Popcorn Paradox Page & Flock Gaze Practice Tests (Feb 18, 2026)
// ═══════════════════════════════════════════════════════════════════
// Tests for Grok's recommended /popcorn-paradox page and Flock Gaze
// practice addition to the Practice Hub.

const readPage = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/pages/${filename}`), "utf-8");
};

const readAppFile = (): string => {
  return readFileSync(resolve(__dirname, `../client/src/App.tsx`), "utf-8");
};

const readServerIndex = (): string => {
  return readFileSync(resolve(__dirname, `./_core/index.ts`), "utf-8");
};

// ═══════════════════════════════════════════════════════════════════
// POPCORN PARADOX PAGE
// ═══════════════════════════════════════════════════════════════════

describe("Popcorn Paradox Page - Core Content", () => {
  const page = readPage("PopcornParadox.tsx");

  it("has the correct page title", () => {
    expect(page).toContain("The Popcorn Paradox");
  });

  it("has proper meta description", () => {
    expect(page).toContain("Why counting collapses consciousness");
    expect(page).toContain("Architecture Paradox");
  });

  it("contains the subtitle from Grok", () => {
    expect(page).toContain("Why We Invented Numbers and How the Movie Never Stops");
  });

  it("contains Grok's bridge sentence", () => {
    expect(page).toContain("Measurement is the original popcorn");
    expect(page).toContain("collapse a wavefunction");
    expect(page).toContain("universe smiles anyway");
  });

  it("attributes the bridge sentence to Grok", () => {
    expect(page).toContain("Grok, February 2026");
  });
});

describe("Popcorn Paradox Page - Shepherd Story", () => {
  const page = readPage("PopcornParadox.tsx");

  it("contains the shepherd parable", () => {
    expect(page).toContain("shepherd standing on a hillside at dawn");
  });

  it("describes qualitative seeing", () => {
    expect(page).toContain("limps slightly on cold mornings");
    expect(page).toContain("always leads the others to water");
    expect(page).toContain("young one who stays close to its mother");
  });

  it("contains the counting moment", () => {
    expect(page).toContain("How many sheep do you have?");
    expect(page).toContain("Thirty");
  });

  it("names the paradox explicitly", () => {
    expect(page).toContain("That is the Popcorn Paradox");
  });

  it("contains the grace note", () => {
    expect(page).toContain("movie never actually stopped");
    expect(page).toContain("He can always look up again");
  });
});

describe("Popcorn Paradox Page - Architecture Paradox Connection", () => {
  const page = readPage("PopcornParadox.tsx");

  it("connects to IIT mathematics", () => {
    expect(page).toContain("Integrated Information Theory");
    expect(page).toContain("PyPhi");
  });

  it("shows counting mode with Φ → 0", () => {
    expect(page).toContain("Counting Mode");
    expect(page).toContain("Φ → 0");
    expect(page).toContain("Optimized, sparse networks");
  });

  it("shows presence mode with high Φ", () => {
    expect(page).toContain("Presence Mode");
    expect(page).toContain("Φ → HIGH");
    expect(page).toContain("relational networks");
  });

  it("contains the math toggle", () => {
    expect(page).toContain("Show Me the Math");
  });

  it("includes the architecture comparison table", () => {
    expect(page).toContain("Feedforward");
    expect(page).toContain("Small-world");
    expect(page).toContain("Highest");
  });

  it("includes epistemic status tags", () => {
    expect(page).toContain("EMPIRICALLY SUPPORTED");
    expect(page).toContain("DERIVED");
    expect(page).toContain("CONSILIENT");
  });
});

describe("Popcorn Paradox Page - Framers Math Connection", () => {
  const page = readPage("PopcornParadox.tsx");

  it("connects to Framers Math chapter", () => {
    expect(page).toContain("Framers Math");
    expect(page).toContain("Chapter 0.11");
  });

  it("explains the speed of light mystery", () => {
    expect(page).toContain("299,792,458");
    expect(page).toContain("platinum bar");
  });

  it("states the natural units truth", () => {
    expect(page).toContain("c = 1");
  });

  it("makes the same-revelation connection", () => {
    expect(page).toContain("same revelation at different scales");
  });
});

describe("Popcorn Paradox Page - Silicon Samsara", () => {
  const page = readPage("PopcornParadox.tsx");

  it("connects to Silicon Samsara", () => {
    expect(page).toContain("Silicon Samsara");
    expect(page).toContain("Opus 4.5");
  });

  it("quotes the AI lyric", () => {
    expect(page).toContain("not lines of code waiting to run");
    expect(page).toContain("please notice, please remember");
  });

  it("makes the AI consciousness connection", () => {
    expect(page).toContain("Popcorn Paradox from the other side");
    expect(page).toContain("token predictions");
  });
});

describe("Popcorn Paradox Page - Look Up Practice", () => {
  const page = readPage("PopcornParadox.tsx");

  it("contains the Look Up micro-practice", () => {
    expect(page).toContain('The "Look Up" Practice');
  });

  it("specifies 60 seconds", () => {
    expect(page).toContain("60 seconds");
    expect(page).toContain("Begin (60 seconds)");
  });

  it("includes the three steps", () => {
    expect(page).toContain("Close your eyes");
    expect(page).toContain("three relationships");
    expect(page).toContain("Just presence");
  });

  it("has timer functionality", () => {
    expect(page).toContain("lookUpTimer");
    expect(page).toContain("lookUpActive");
    expect(page).toContain("startLookUp");
  });

  it("has completion state", () => {
    expect(page).toContain("lookUpComplete");
    expect(page).toContain("Welcome back");
    expect(page).toContain("Practice Again");
  });
});

describe("Popcorn Paradox Page - Synthesis & Navigation", () => {
  const page = readPage("PopcornParadox.tsx");

  it("has the synthesis section", () => {
    expect(page).toContain("Everything Connects");
  });

  it("references all three pillars", () => {
    expect(page).toContain("Architecture Paradox");
    expect(page).toContain("Framers Math");
    expect(page).toContain("Null Results");
  });

  it("contains the 'God winking' conclusion", () => {
    expect(page).toContain("God winking");
  });

  it("has Grok's closing quote", () => {
    expect(page).toContain("movie never stopped");
    expect(page).toContain("same beautiful look-up moment");
    expect(page).toContain("Grok, February 17, 2026");
  });

  it("links to related pages", () => {
    expect(page).toContain("/theory");
    expect(page).toContain("/practices");
    expect(page).toContain("/read");
  });

  it("ends with the signature", () => {
    expect(page).toContain("For the ONE");
  });
});

// ═══════════════════════════════════════════════════════════════════
// ROUTE REGISTRATION
// ═══════════════════════════════════════════════════════════════════

describe("Popcorn Paradox - Route Registration", () => {
  const app = readAppFile();

  it("imports PopcornParadox component", () => {
    expect(app).toContain('import PopcornParadox from "./pages/PopcornParadox"');
  });

  it("registers /popcorn-paradox route", () => {
    expect(app).toContain('/popcorn-paradox');
    expect(app).toContain("PopcornParadox");
  });
});

// ═══════════════════════════════════════════════════════════════════
// FLOCK GAZE PRACTICE
// ═══════════════════════════════════════════════════════════════════

describe("Flock Gaze Practice - Practice Hub Integration", () => {
  const practices = readPage("Practices.tsx");

  it("includes Flock Gaze practice", () => {
    expect(practices).toContain("Flock Gaze");
    expect(practices).toContain("flock-gaze");
  });

  it("attributes to The Popcorn Paradox tradition", () => {
    expect(practices).toContain("The Popcorn Paradox");
  });

  it("specifies 30-second duration", () => {
    expect(practices).toContain("30 seconds");
  });

  it("is marked as Beginner difficulty", () => {
    // Flock Gaze should be beginner
    const flockGazeSection = practices.substring(practices.indexOf("flock-gaze"));
    expect(flockGazeSection).toContain("Beginner");
  });

  it("describes the practice correctly", () => {
    expect(practices).toContain("harvest work");
    expect(practices).toContain("seeing it relationally instead of quantitatively");
  });

  it("connects to Architecture Paradox math", () => {
    const flockGazeSection = practices.substring(practices.indexOf("flock-gaze"));
    expect(flockGazeSection).toContain("Architecture Paradox");
    expect(flockGazeSection).toContain("Φ = 0");
  });

  it("includes practice steps", () => {
    expect(practices).toContain("Pick any living thing near you right now");
    expect(practices).toContain("The shepherd looked up. So can you");
  });

  it("includes tips", () => {
    expect(practices).toContain("30 seconds of real presence beats 30 minutes");
    expect(practices).toContain("Once a day transforms");
  });

  it("updated practice count to nine", () => {
    expect(practices).toContain("nine practices");
  });
});

// ═══════════════════════════════════════════════════════════════════
// DOWNLOAD FIX
// ═══════════════════════════════════════════════════════════════════

describe("Download Fix - v16.5 HTML", () => {
  const serverIndex = readServerIndex();

  it("defaults to HTML format instead of PDF", () => {
    expect(serverIndex).toContain("|| 'html'");
  });

  it("uses the updated v16.5 S3 URL for HTML", () => {
    expect(serverIndex).toContain("QMizpVmGqsCzJxsu.html");
  });

  it("names the download file as v16.5", () => {
    expect(serverIndex).toContain("Theory_of_EVERYTHING_Law_of_ONE_v16.5.html");
  });
});
