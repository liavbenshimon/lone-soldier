export interface Right {
  id: number;
  title: string;
  description: string;
  organization: string; // Organização responsável
  contact: string; // Número de contato
  filters: {
    loneSoldier: boolean; // Sim / Não
    newImmigrant: string | null; // "LessThan1Year", "1to5Years", "MoreThan5Years" ou null
    parentalStatus: string | null; // "NoContact", "ParentsAbroad", "NoSupport" ou null
    housingStatus: string | null; // "OnBase", "Rental", "Kibbutz" ou null
    financialNeed: boolean | null; // Precisa de ajuda financeira urgente
    educationStatus: string | null; // "Student" ou "NonStudent"
    militaryStatus: string | null; // "Combatant", "NonCombatant" ou null
  };
}

export const rightsData: Right[] = [
  {
    id: 1,
    title: "Salary Increase (100% Bonus)",
    description: "Lone soldiers receive a 100% salary bonus to help with living expenses.",
    organization: "IDF Financial Department",
    contact: "0800-123-456",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: null, financialNeed: null, educationStatus: null, militaryStatus: null },
  },
  {
    id: 2,
    title: "Food Vouchers",
    description: "Monthly food vouchers worth up to 120₪ for lone soldiers.",
    organization: "The Association for Lone Soldiers",
    contact: "0800-987-654",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: null, financialNeed: null, educationStatus: null, militaryStatus: "Combatant" },
  },
  {
    id: 3,
    title: "Housing Assistance",
    description: "Partial rent subsidy for soldiers living off-base.",
    organization: "IDF Welfare Unit",
    contact: "0800-234-567",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: "Rental", financialNeed: null, educationStatus: null, militaryStatus: null },
  },
  {
    id: 4,
    title: "Free Accommodation at Beit HaHayal",
    description: "Free housing at Beit HaHayal with laundry and meals.",
    organization: "Beit HaHayal",
    contact: "0800-456-789",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: "OnBase", financialNeed: null, educationStatus: null, militaryStatus: null },
  },
  {
    id: 5,
    title: "Kibbutz Housing Program",
    description: "Live in a kibbutz with services and a 150₪ monthly allowance.",
    organization: "Kibbutz Movement",
    contact: "0800-567-890",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: "Kibbutz", financialNeed: null, educationStatus: null, militaryStatus: null },
  },
  {
    id: 6,
    title: "Personal Errands Leave",
    description: "One day off every two months for personal errands.",
    organization: "IDF Personnel Management",
    contact: "0800-678-901",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: null, financialNeed: null, educationStatus: null, militaryStatus: null },
  },
  {
    id: 7,
    title: "Holiday Gift Cards",
    description: "Gift cards for Rosh Hashanah and Passover worth 250₪.",
    organization: "The Association for Soldiers Welfare",
    contact: "0800-789-012",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: null, financialNeed: null, educationStatus: null, militaryStatus: null },
  },
  {
    id: 8,
    title: "Vacation to Visit Parents Abroad",
    description: "30 days of paid leave to visit parents living abroad.",
    organization: "IDF Welfare Unit",
    contact: "0800-890-123",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: "ParentsAbroad", housingStatus: null, financialNeed: null, educationStatus: null, militaryStatus: null },
  },
  {
    id: 9,
    title: "International Communication Support",
    description: "60 minutes of monthly calls abroad and 10 postal vouchers.",
    organization: "Ministry of Communications",
    contact: "0800-901-234",
    filters: { loneSoldier: true, newImmigrant: "LessThan1Year", parentalStatus: null, housingStatus: null, financialNeed: null, educationStatus: null, militaryStatus: null },
  },
  {
    id: 10,
    title: "Emergency Financial Aid",
    description: "Financial aid for crises like health issues or urgent needs.",
    organization: "IDF Welfare Fund",
    contact: "0800-123-789",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: "NoSupport", housingStatus: null, financialNeed: true, educationStatus: null, militaryStatus: null },
  },
  {
    id: 11,
    title: "Psychological Support",
    description: "Mental health support for lone soldiers.",
    organization: "Nefesh B'Nefesh",
    contact: "0800-321-456",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: "NoSupport", housingStatus: null, financialNeed: null, educationStatus: null, militaryStatus: null },
  },
  {
    id: 12,
    title: "Psychometric Course Funding",
    description: "Funding for psychometric test preparation.",
    organization: "Ministry of Education",
    contact: "0800-432-567",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: null, financialNeed: null, educationStatus: "Student", militaryStatus: null },
  },
  {
    id: 13,
    title: "Subsidized University Tuition",
    description: "Tuition funding for bachelor’s or vocational degrees.",
    organization: "Ministry of Education",
    contact: "0800-111-222",
    filters: { loneSoldier: true, newImmigrant: "1to5Years", parentalStatus: null, housingStatus: null, financialNeed: null, educationStatus: "Student", militaryStatus: null },
  },
  {
    id: 14,
    title: "Free Eye Exams and Glasses",
    description: "Symbolic payment for eye care and glasses.",
    organization: "Vision Center Association",
    contact: "0800-444-555",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: null, financialNeed: true, educationStatus: null, militaryStatus: null },
  },
  {
    id: 15,
    title: "Job Placement Support",
    description: "Help for lone soldiers to find jobs post-service.",
    organization: "Ministry of Labor",
    contact: "0800-555-666",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: null, financialNeed: null, educationStatus: "NonStudent", militaryStatus: null },
  },
  {
    id: 16,
    title: "Tax Exemptions",
    description: "Reduced property tax payments for lone soldiers.",
    organization: "Local Municipalities",
    contact: "0800-777-888",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: null, financialNeed: true, educationStatus: null, militaryStatus: null },
  },
  {
    id: 17,
    title: "Post-Service Housing Support",
    description: "3 months free accommodation after discharge.",
    organization: "Beit HaHayal",
    contact: "0800-888-999",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: null, financialNeed: null, educationStatus: null, militaryStatus: null },
  },
  {
    id: 18,
    title: "Transportation Discount",
    description: "50% discount on public transportation.",
    organization: "Transportation Ministry",
    contact: "0800-999-111",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: null, financialNeed: null, educationStatus: null, militaryStatus: null },
  },
  {
    id: 19,
    title: "Medical Insurance Coverage",
    description: "Comprehensive healthcare for lone soldiers.",
    organization: "Health Ministry",
    contact: "0800-222-333",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: null, financialNeed: null, educationStatus: null, militaryStatus: null },
  },
  {
    id: 20,
    title: "Post-Service Scholarships",
    description: "Scholarships for lone soldiers post-service.",
    organization: "Jewish Agency",
    contact: "0800-333-444",
    filters: { loneSoldier: true, newImmigrant: null, parentalStatus: null, housingStatus: null, financialNeed: null, educationStatus: null, militaryStatus: null },
  }
];
