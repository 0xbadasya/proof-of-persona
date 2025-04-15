import fs from "fs";
import path from "path";
import archiver from "archiver";

const storageDir = path.resolve("storage");
const exportDir = path.resolve("export");

const thoughtsFile = path.join(storageDir, "thoughts.json");
const personasFile = path.join(storageDir, "personas.json");

export function exportCommand() {
  const target = process.argv[3];
  const zip = process.argv.includes("--zip");
  const format = process.argv.includes("--format=txt") ? "txt" : "json";
  const isDemo = target === "demo";

  if (isDemo) {
    const demoType = process.argv[4];

    if (demoType === "thoughts") {
      generateDemoFile("thoughts");
    } else if (demoType === "personas") {
      generateDemoFile("personas");
    } else {
      console.log(`❌ Please specify: thoughts or personas`);
    }

    return;
  }

  if (!target || (target !== "thoughts" && target !== "personas")) {
    console.log(`❌ Usage: persona export [thoughts|personas] [--zip] [--format=txt]`);
    return;
  }

  const sourceFile = target === "thoughts" ? thoughtsFile : personasFile;
  if (!fs.existsSync(sourceFile)) {
    console.log(`❌ No ${target} found.`);
    return;
  }

  const exportData = JSON.parse(fs.readFileSync(sourceFile, "utf-8"));
  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

  const outFile = path.join(exportDir, `${target}-export.${format}`);
  const content = format === "txt"
    ? exportData.map((item: any) => JSON.stringify(item)).join("\n")
    : JSON.stringify(exportData, null, 2);

  fs.writeFileSync(outFile, content);
  console.log(`✅ Exported ${exportData.length} ${target} to ${outFile}`);

  if (zip) {
    const zipPath = path.join(exportDir, `${target}-export.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);
    archive.file(outFile, { name: path.basename(outFile) });
    archive.finalize();

    output.on("close", () => {
      console.log(`📦 Zipped to ${zipPath} (${archive.pointer()} bytes)`);
    });
  }
}

function generateDemoFile(type: "thoughts" | "personas") {
  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

  const filename = path.join(exportDir, `${type}-demo.json`);
  const demoContent =
    type === "thoughts"
      ? [
          {
            content: "Crypto is the new language of freedom.",
            topic: "philosophy",
            timestamp: new Date().toISOString(),
            author: "DemoPersona",
            signature: "0xSIGNATURE",
          },
        ]
      : [
          {
            alias: "DemoPersona",
            publicKey: "0xPUBLIC_KEY",
            behaviorModel: "philosopher",
          },
        ];

  fs.writeFileSync(filename, JSON.stringify(demoContent, null, 2));
  console.log(`🧪 Demo ${type} exported to ${filename}`);
}
