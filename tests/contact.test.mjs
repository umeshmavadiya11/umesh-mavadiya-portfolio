import test from "node:test";
import assert from "node:assert/strict";
import { validateInquiry, cleanText, projectTypes, budgetOptions } from "../src/lib/contact.ts";
import { projects, projectDisclosure } from "../src/data/projects.ts";

const valid = { name: "Alex Morgan", email: "alex@example.com", projectType: "Full-Stack Development", budget: "Let’s discuss", message: "I would like to discuss a new product and a practical implementation plan.", consent: true, website: "", startedAt: Date.now() - 5000, source: "test" };

test("accepts a well-formed inquiry", () => { assert.deepEqual(validateInquiry(valid), {}); });
test("rejects missing required fields", () => { const errors = validateInquiry({}); assert.ok(errors.name); assert.ok(errors.email); assert.ok(errors.projectType); assert.ok(errors.budget); assert.ok(errors.message); assert.ok(errors.consent); });
test("validates name and message after trimming", () => { const errors = validateInquiry({ ...valid, name: "  ", message: "                   short " }); assert.ok(errors.name); assert.ok(errors.message); });
test("rejects malformed or oversized email addresses", () => { for (const email of ["not-an-email", "a@", "a b@example.com", `${"a".repeat(255)}@example.com`]) assert.ok(validateInquiry({ ...valid, email }).email); });
test("enforces field length limits", () => { assert.ok(validateInquiry({ ...valid, name: "a".repeat(101) }).name); assert.ok(validateInquiry({ ...valid, message: "a".repeat(5001) }).message); });
test("rejects unrecognized selections and missing consent", () => { const errors = validateInquiry({ ...valid, projectType: "forged", budget: "forged", consent: false }); assert.ok(errors.projectType); assert.ok(errors.budget); assert.ok(errors.consent); });
test("supports every advertised service and budget option", () => { for (const projectType of projectTypes) for (const budget of budgetOptions) assert.deepEqual(validateInquiry({ ...valid, projectType, budget }), {}); });
test("normalizes text without interpreting markup", () => { assert.equal(cleanText("  <b>Hello</b>\u0000  "), "Hello"); });
test("project slugs are unique and all studies have complete content", () => { assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length); for (const project of projects) { assert.match(project.slug, /^[a-z0-9-]+$/); assert.ok(project.problem.length > 30); assert.ok(project.solution.length > 30); assert.ok(project.architecture.length >= 4); assert.ok(project.challenges.length >= 3); assert.ok(project.technologies.length >= 4); } });
test("illustrative work is clearly disclosed", () => { assert.match(projectDisclosure, /illustrative/); assert.match(projectDisclosure, /not verified/); assert.match(projectDisclosure, /no client names/i); });
