export const projectTypes = ["Full-Stack Development", "Frontend Development", "API Development", "Performance Optimization", "Application Modernization", "Cloud & Deployment", "Something Else"] as const;
export const budgetOptions = ["Let’s discuss", "Under $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000+"] as const;
export type InquiryInput = { name: string; email: string; projectType: string; budget: string; message: string; consent: boolean; website: string; startedAt: number; source: string };
export type InquiryErrors = Partial<Record<keyof InquiryInput, string>>;

export function validateInquiry(input: Partial<InquiryInput>): InquiryErrors {
  const errors: InquiryErrors = {};
  if (typeof input.name !== "string" || input.name.trim().length < 2 || input.name.trim().length > 100) errors.name = "Please enter your name (2–100 characters).";
  if (typeof input.email !== "string" || input.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.email = "Please enter a valid email address.";
  if (!projectTypes.includes(input.projectType as typeof projectTypes[number])) errors.projectType = "Choose the kind of help you’re looking for.";
  if (!budgetOptions.includes(input.budget as typeof budgetOptions[number])) errors.budget = "Please select a budget range, or choose ‘Let’s discuss’.";
  if (typeof input.message !== "string" || input.message.trim().length < 20 || input.message.trim().length > 5000) errors.message = "Tell me a little more about your project (20–5,000 characters).";
  if (input.consent !== true) errors.consent = "Please agree to the use of your details to respond to this inquiry.";
  return errors;
}

export function cleanText(text: string) {
  return text.trim().replace(/\u0000/g, "").replace(/<[^>]*>/g, "");
}
