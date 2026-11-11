/** California Mortgage Readiness Assessment: questions and educational guidance. */

export const assessmentSteps = [
  {
    question: "What would you like to accomplish?",
    answers: [
      "Buy my first home",
      "Refinance",
      "Use home equity",
      "Invest in property",
    ],
  },
  {
    question: "Which part feels least clear?",
    answers: [
      "My credit score",
      "The down payment",
      "The paperwork",
      "Finding the right lender",
    ],
  },
  {
    question: "What is your timeline?",
    answers: ["Within 3 months", "3–6 months", "Just exploring"],
  },
] as const;

export const assessmentGoals = assessmentSteps[0].answers;
export const assessmentTimelines = assessmentSteps[2].answers;

export function getReadinessProfile(goal?: string) {
  if (goal === "Buy my first home") return "The Cautious California Buyer";
  if (goal === "Refinance") return "The Savvy Refinancer";
  return "The Prepared Explorer";
}

export function getReadinessGuidance(goal?: string, concern?: string) {
  const firstStep =
    goal === "Buy my first home"
      ? "Organize your savings plan, income documentation, and homebuying questions before speaking with a professional."
      : goal === "Refinance"
        ? "Gather your current loan information and identify the mortgage outcome you would like to evaluate."
        : goal === "Use home equity"
          ? "Clarify the intended use of funds and the home-equity questions you need answered."
          : "Define your property strategy, timing, and education priorities before evaluating next steps.";
  const concernStep =
    concern === "My credit score"
      ? "Write down the credit questions you want to discuss before making major financial changes."
      : concern === "The down payment"
        ? "Identify your available funds and the down-payment topics you need explained."
        : concern === "The paperwork"
          ? "Create a simple document checklist with a licensed professional before sharing sensitive records."
          : "Prepare questions about lender selection, available options, and the appropriate educational next step.";
  return [
    firstStep,
    concernStep,
    "Request a response only when you are ready for a California-licensed team member to follow up.",
  ];
}
