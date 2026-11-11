/** LIMinistries partnership content shown on the home page. */

export const partnershipModels = [
  {
    number: "01",
    title: "Commission-Tithe Partnership",
    description:
      "Pledge a fixed 10–25% of commission to LIMinistries, with a transparent client-choice ministry menu.",
    note: "Marketing kits and impact calculators included.",
  },
  {
    number: "02",
    title: "Client-Choice Donation Program",
    description:
      "Reduce commission by up to 50% and invite the client to donate the saved portion at closing.",
    note: "Escrow-ready language and a Ministry Impact Agreement are provided.",
  },
  {
    number: "03",
    title: "Niche Cause-Based Teams",
    description:
      "Serve groups such as healthcare workers, families in recovery, caregivers, and seniors while funding related prayer and wellness resources.",
    note: "Examples: Homes for Healers and Second-Chance Housing.",
  },
  {
    number: "04",
    title: "Property Gifts & Investor Partnerships",
    description:
      "Educate investors on gifts of appreciated real estate or cash-flow stakes, and partner on faith-based development impact.",
    note: "Complex gifts should route through experienced counsel or a donor-advised fund provider.",
  },
  {
    number: "05",
    title: "Referral Network Integration",
    description:
      "Feature LIMinistries in an existing giving menu and report the ministry outcomes funded after every gift.",
    note: "A clear, visible pathway for ongoing partnership.",
  },
] as const;

export type PartnershipModel = (typeof partnershipModels)[number];

export const successStories = [
  {
    name: "Give Realty",
    location: "Austin, Texas",
    proof:
      "25% of commissions donated to client-chosen nonprofits; over $1 million directed to charitable causes.",
  },
  {
    name: "Christian West Howard",
    location: "Florida · The Heart That Gives",
    proof:
      "A 50% commission-giving model where the gift is made in the client’s name, supporting trust and referrals.",
  },
  {
    name: "Gerald Leonard",
    location: "Coastal Elite Real Estate",
    proof:
      "A 50% model described as a “win-win-win”: charity receives a gift, the client receives a deduction, and the agent earns trust.",
  },
  {
    name: "Blessings of Home Team",
    location: "Faith-Based Brand Model",
    proof:
      "Publicly connecting home transactions with giving to ministries and faith-based charities through a “home with a purpose” story.",
  },
] as const;

export const nextSteps = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "A 30-minute conversation to understand goals, client base, and the partnership model that fits.",
  },
  {
    step: "02",
    title: "Customized Proposal",
    description:
      "A specific agreement covering donation percentage, marketing plan, impact measures, and compliance considerations.",
  },
  {
    step: "03",
    title: "Launch Support",
    description:
      "Training, materials, marketing tools, and spiritual encouragement for a confident rollout.",
  },
  {
    step: "04",
    title: "Ongoing Partnership",
    description:
      "Quarterly reviews, impact reporting, and continuous partnership stewardship.",
  },
] as const;

/** Partnership questions and answers for real estate and lending professionals. */
export const partnershipFaqs = [
  {
    question:
      "What is the simplest way for an individual realtor or loan officer to begin?",
    answer:
      "Begin with a Pilot Partnership: commit 10–15% of commissions from the next five transactions. LIMinistries provides marketing materials, impact tracking, and client-communication templates so you can test the model with clarity.",
  },
  {
    question: "Can loan officers participate, or is this only for realtors?",
    answer:
      "Loan officers can participate. The partnership conversation will identify an approach that aligns with your lender’s policies, compensation practices, and compliance requirements while connecting your work to measurable ministry impact.",
  },
  {
    question: "How are charitable gifts structured?",
    answer:
      "Partnerships should use clear written agreements, direct charitable gifts, and transparent statements about the giving percentage. Each participant should consult the appropriate brokerage, lender, escrow, legal, and tax advisors before putting a structure into practice.",
  },
  {
    question: "Can clients choose the ministry work their transaction supports?",
    answer:
      "Yes. A client-choice menu can be included in a Commission-Tithe Partnership so clients see how their transaction connects to specific ministry outcomes. The exact process is defined in the customized partnership agreement and related communication materials.",
  },
  {
    question:
      "What support does LIMinistries provide to participating professionals?",
    answer:
      "Support can include co-branded campaigns, social media templates, listing-presentation materials, an impact calculator, training on ethically serving clients under stress, prayer calls, and access to ministry resources.",
  },
  {
    question: "What happens after I submit an inquiry?",
    answer:
      "The process begins with a 30-minute discovery call to understand your goals, client base, and preferred partnership model. LIMinistries then prepares a customized proposal, provides launch support, and establishes an approach for ongoing stewardship reviews.",
  },
  {
    question: "How will I know what my partnership has accomplished?",
    answer:
      "LIMinistries can provide branded impact reports and quarterly reviews that connect giving to prayer support, digital discipleship, trauma-informed care, and other reported ministry outcomes.",
  },
  {
    question: "Does a team or brokerage need to approve participation?",
    answer:
      "For team, office, brokerage, lender, or escrow participation, internal approvals and appropriate professional review should occur before launch. This helps align the partnership with organizational policies and preserves clear communication with clients.",
  },
] as const;

export const professionalRoleOptions = [
  { value: "realtor", label: "Realtor / real estate agent" },
  { value: "loan_officer", label: "Loan officer / MLO" },
  { value: "both", label: "Both realtor and loan officer" },
  { value: "other", label: "Other real estate professional" },
] as const;

export const partnershipInterestOptions = [
  { value: "pilot_partnership", label: "Pilot partnership" },
  { value: "team_or_office_program", label: "Team or office program" },
  { value: "brokerage_integration", label: "Brokerage-wide integration" },
  {
    value: "property_or_investor_partnership",
    label: "Property or investor partnership",
  },
  { value: "learn_more", label: "I would like to learn more" },
] as const;
