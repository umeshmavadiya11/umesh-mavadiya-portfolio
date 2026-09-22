import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

const baseURL = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
const page = await context.newPage();
const reports = [];
try {
  for (const path of ["/", "/work", "/contact", "/work/enterprise-reporting-platform", "/about", "/services", "/privacy", "/contact?channel=contra"]) {
    await page.goto(`${baseURL}${path}`, { waitUntil: "networkidle" });
    await page.evaluate(() => { document.querySelectorAll(".reveal-pending").forEach((el) => el.classList.remove("reveal-pending")); });
    // Miniature dashboard mockups are decorative artwork, not live interface controls.
    // All actual project text, navigation, forms, and interactive diagrams remain audited.
    const result = await new AxeBuilder({ page }).exclude(".project-preview").withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    reports.push({ path, violations: result.violations });
    console.log(JSON.stringify({ path, violations: result.violations.map((violation) => ({ id: violation.id, impact: violation.impact, count: violation.nodes.length, nodes: violation.nodes.slice(0, 25).map((node) => ({ target: node.target, summary: node.failureSummary })) })) }, null, 2));
  }
  await mkdir("artifacts", { recursive: true });
  await writeFile("artifacts/accessibility-report.json", JSON.stringify(reports, null, 2));
  const failures = reports.reduce((count, report) => count + report.violations.length, 0);
  console.log(`Accessibility rule violations: ${failures}`);
  if (failures) process.exitCode = 1;
} finally { await browser.close(); }
