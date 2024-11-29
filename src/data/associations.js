// components/data/associations.js

const associations = [
  {
    id: 1,
    name: "Emirates Kokan Committee",
    country: "UAE",
    contactNumber: "123456789",
    website: "https://emirateskokan.org",
    image: "/images/uae2.jpg",
    missionStatement:
      "To uplift the Kokan community in the UAE through education, health, and social welfare initiatives.",
    objectives: [
      "Support underprivileged families",
      "Facilitate educational scholarships for students",
      "Provide medical aid to those in need",
    ],
    membership: {
      eligibility: "Kokan community members residing in the UAE",
      currentMembers: 500,
      targetMembers: 1000,
    },
    activities: [
      "Monthly donation drives",
      "Community iftar gatherings during Ramadan",
      "Annual educational seminars",
    ],
    leadership: {
      chairperson: "Ahmed Khan",
      secretary: "Fatima Mohammed",
      treasurer: "Imran Shaikh",
    },
    communicationStrategy: "Monthly newsletters and weekly WhatsApp updates",
    budget: {
      initialFunding: "AED 150,000",
      revenueSources: ["Member donations", "Charity events"],
      fundManagement: "Managed by the finance committee",
    },
    benefits:
      "Empowers the Kokan community in UAE by providing support and building a strong network.",
    evaluationPlan: "Annual member surveys and impact assessments.",
  },
  {
    id: 2,
    name: "Oman Kokan Welfare Association (OKWA)",
    country: "Oman",
    contactNumber: "123456789",
    website: "https://okwacommunity.org",
    image: "/images/oman2.jpg",
    missionStatement:
      "To support the Kokan community in Oman through educational and healthcare initiatives.",
    objectives: [
      "Offer financial assistance to needy families",
      "Promote education through scholarships",
      "Organize community health camps",
    ],
    membership: {
      eligibility: "Kokan community members residing in Oman",
      currentMembers: 300,
      targetMembers: 600,
    },
    activities: [
      "Monthly community meet-ups",
      "Educational support programs",
      "Medical aid drives",
    ],
    leadership: {
      chairperson: "Ali Shaikh",
      secretary: "Zahra Ibrahim",
      treasurer: "Hussain Patel",
    },
    communicationStrategy: "Bi-monthly newsletters and social media updates",
    budget: {
      initialFunding: "OMR 50,000",
      revenueSources: ["Community donations", "Charity events"],
      fundManagement: "Managed by the finance committee",
    },
    benefits:
      "Improves the quality of life for the Kokan community in Oman by providing essential support.",
    evaluationPlan: "Quarterly reviews and feedback from beneficiaries.",
  },
  {
    id: 3,
    name: "Kokan Committee, Bahrain",
    country: "Bahrain",
    contactNumber: "123456789",
    website: "https://kokanbahrain.org",
    image: "/images/bahrain.jpg",
    missionStatement:
      "To promote unity and support among the Kokan community in Bahrain.",
    objectives: [
      "Provide financial aid to families in need",
      "Organize educational workshops for youth",
      "Support community welfare projects",
    ],
    membership: {
      eligibility: "Kokan community members residing in Bahrain",
      currentMembers: 350,
      targetMembers: 700,
    },
    activities: [
      "Community Iftar events",
      "Fundraising drives for education",
      "Annual community sports day",
    ],
    leadership: {
      chairperson: "Salman Ahmed",
      secretary: "Layla Yusuf",
      treasurer: "Rashid Khan",
    },
    communicationStrategy: "Monthly newsletters and WhatsApp groups",
    budget: {
      initialFunding: "BHD 40,000",
      revenueSources: ["Member contributions", "Charity events"],
      fundManagement: "Managed by the treasurer",
    },
    benefits:
      "Strengthens the community bonds and supports educational growth among youth.",
    evaluationPlan: "Bi-annual member feedback and financial audits.",
  },
  {
    id: 4,
    name: "Kokan Welfare Society, Kuwait",
    country: "Kuwait",
    contactNumber: "123456789",
    website: "https://kwskwt.com/",
    image: "/images/kuwait.jpg",
    missionStatement:
      "To provide assistance and foster development within the Kokan community in Kuwait.",
    objectives: [
      "Offer scholarships to deserving students",
      "Provide financial assistance to low-income families",
      "Support medical treatment for those in need",
    ],
    membership: {
      eligibility: "Kokan community members residing in Kuwait",
      currentMembers: 600,
      targetMembers: 1000, // Corrected from "xy00" to 1000
    },
    activities: [
      "Monthly health check-ups",
      "Education support programs",
      "Community events during Eid",
    ],
    leadership: {
      chairperson: "Mohammed Abdullah",
      secretary: "Fatima Hussain",
      treasurer: "Irfan Shaikh",
    },
    communicationStrategy: "Monthly newsletters and community gatherings",
    budget: {
      initialFunding: "KWD 100,000",
      revenueSources: ["Community donations", "Sponsorships"],
      fundManagement: "Managed by the finance committee",
    },
    benefits:
      "Provides critical support to those in need and encourages educational growth.",
    evaluationPlan: "Annual impact analysis and community surveys.",
  },
  {
    id: 5,
    name: "Relief Foundation, Qatar",
    country: "Qatar",
    contactNumber: "123456789",
    website: "https://relieffoundationqatar.org",
    image: "/images/abc.png",
    missionStatement:
      "To provide relief and assistance to the underprivileged Kokan community in Qatar.",
    objectives: [
      "Distribute food and clothing to families in need",
      "Support educational programs for children",
      "Organize community awareness campaigns",
    ],
    membership: {
      eligibility: "Kokan community members and well-wishers in Qatar",
      currentMembers: 450,
      targetMembers: 900,
    },
    activities: [
      "Monthly food distribution",
      "Back-to-school drives",
      "Community awareness workshops",
    ],
    leadership: {
      chairperson: "Khalid Mansoor",
      secretary: "Aisha Noor",
      treasurer: "Yusuf Ali",
    },
    communicationStrategy: "Weekly email updates and social media outreach",
    budget: {
      initialFunding: "QAR 200,000",
      revenueSources: ["Donations", "Charity events"],
      fundManagement: "Managed by the finance team",
    },
    benefits:
      "Provides vital support to those in need, improving their quality of life.",
    evaluationPlan: "Quarterly impact reports and feedback from beneficiaries.",
  },
  {
    id: 6,
    name: "Kokan Committee Khobar-Dammam",
    country: "Saudi Arabia",
    contactNumber: "123456789",
    website: "https://kokandammam.org",
    image: "/images/damam.jpg",
    missionStatement:
      "To strengthen the Kokan community in Khobar-Dammam through social support and welfare initiatives.",
    objectives: [
      "Support new immigrants with accommodation and job placements",
      "Organize community welfare programs",
      "Provide financial aid for healthcare",
    ],
    membership: {
      eligibility: "Kokan community members residing in Khobar-Dammam",
      currentMembers: 400,
      targetMembers: 800,
    },
    activities: [
      "Job fairs and employment workshops",
      "Monthly welfare meet-ups",
      "Community Ramadan programs",
    ],
    leadership: {
      chairperson: "Saud Al-Khan",
      secretary: "Hafsa Ahmed",
      treasurer: "Omar Malik",
    },
    communicationStrategy: "Monthly newsletters and WhatsApp group updates",
    budget: {
      initialFunding: "SAR 300,000",
      revenueSources: ["Community donations", "Charity events"],
      fundManagement: "Managed by the treasurer and finance team",
    },
    benefits:
      "Assists new immigrants and supports the welfare of the community in Khobar-Dammam.",
    evaluationPlan: "Bi-annual reviews and community feedback sessions.",
  },
  {
    id: 7,
    name: "Kokan Committee Jubail",
    country: "Saudi Arabia",
    contactNumber: "123456789",
    website: "https://kokanjubail.org",
    image: "/images/jubail.jpg",
    missionStatement:
      "To support and empower the Kokan community in Jubail through education and welfare initiatives.",
    objectives: [
      "Provide financial support to needy families",
      "Promote education through scholarships",
      "Organize community welfare activities",
    ],
    membership: {
      eligibility: "Kokan community members residing in Jubail",
      currentMembers: 350,
      targetMembers: 700,
    },
    activities: [
      "Monthly community gatherings",
      "Back-to-school initiatives",
      "Fundraising events during Ramadan",
    ],
    leadership: {
      chairperson: "Naseeruddin Siddiqui",
      secretary: "Farah Qureshi",
      treasurer: "Yasir Malik",
    },
    communicationStrategy:
      "Bi-monthly newsletters and community WhatsApp updates",
    budget: {
      initialFunding: "SAR 250,000",
      revenueSources: ["Member donations", "Charity events"],
      fundManagement: "Managed by the finance committee",
    },
    benefits:
      "Supports educational growth and provides a social safety net for the Kokan community in Jubail.",
    evaluationPlan:
      "Quarterly feedback surveys and community impact assessments.",
  },
  {
    id: 8,
    name: "Kokan Committee Jeddah (KCJed)",
    country: "Saudi Arabia",
    contactNumber: "123456789",
    website: "https://kcjeddah.org",
    image: "/images/jedaah2.jpg",
    missionStatement:
      "To build a strong support network for the Kokan community in Jeddah, focusing on education, health, and social welfare.",
    objectives: [
      "Facilitate access to healthcare services",
      "Provide educational support and scholarships",
      "Organize cultural and community events",
    ],
    membership: {
      eligibility: "Kokan community members residing in Jeddah",
      currentMembers: 500,
      targetMembers: 1000,
    },
    activities: [
      "Annual medical camps",
      "Community cultural events",
      "Scholarship distribution ceremonies",
    ],
    leadership: {
      chairperson: "Zubair Ahmed",
      secretary: "Saima Khan",
      treasurer: "Mohsin Shaikh",
    },
    communicationStrategy: "Monthly newsletters and social media updates",
    budget: {
      initialFunding: "SAR 400,000",
      revenueSources: ["Member contributions", "Event sponsorships"],
      fundManagement: "Managed by the finance team",
    },
    benefits:
      "Creates a strong community network and supports education and health initiatives.",
    evaluationPlan: "Annual impact reports and member satisfaction surveys.",
  },
  {
    id: 9,
    name: "Kokan Committee Makkah",
    country: "Saudi Arabia",
    contactNumber: "123456789",
    website: "https://kokanmakkah.org",
    image: "/images/makkah.jpg",
    missionStatement:
      "To provide humanitarian aid and support to the Kokan community in Makkah.",
    objectives: [
      "Distribute food and clothing to low-income families",
      "Support orphans and widows",
      "Promote education through scholarships and mentorship",
    ],
    membership: {
      eligibility: "Kokan community members residing in Makkah",
      currentMembers: 600,
      targetMembers: 1000, // Corrected from "xy00" to 1000
    },
    activities: [
      "Monthly food drives",
      "Educational seminars and workshops",
      "Community iftar and Eid celebrations",
    ],
    leadership: {
      chairperson: "Aslam Shaikh",
      secretary: "Nadia Ali",
      treasurer: "Sameer Patel",
    },
    communicationStrategy:
      "Monthly newsletters and regular social media engagement",
    budget: {
      initialFunding: "SAR 500,000",
      revenueSources: ["Donations", "Charity events"],
      fundManagement: "Managed by the finance committee",
    },
    benefits:
      "Provides essential support to vulnerable community members and promotes education.",
    evaluationPlan: "Bi-annual reviews and feedback from beneficiaries.",
  },
  {
    id: 10,
    name: "Kokan Committee Khamis Mushait",
    country: "Saudi Arabia",
    contactNumber: "123456789",
    website: "https://kokankhamis.org",
    image: "/images/khamis.jpg",
    missionStatement:
      "To serve the Kokan community in Khamis Mushait through social welfare and educational programs.",
    objectives: [
      "Provide support to families in financial distress",
      "Offer scholarships for students pursuing higher education",
      "Organize health camps and wellness activities",
    ],
    membership: {
      eligibility: "Kokan community members residing in Khamis Mushait",
      currentMembers: 400,
      targetMembers: 800,
    },
    activities: [
      "Monthly welfare distribution",
      "Community sports events",
      "Educational and vocational training sessions",
    ],
    leadership: {
      chairperson: "Fahad Usmani",
      secretary: "Sara Khan",
      treasurer: "Rizwan Qureshi",
    },
    communicationStrategy: "Bi-monthly newsletters and WhatsApp updates",
    budget: {
      initialFunding: "SAR 300,000",
      revenueSources: ["Community donations", "Sponsorships"],
      fundManagement: "Managed by the finance team",
    },
    benefits:
      "Supports the educational and social needs of the Kokan community in Khamis Mushait.",
    evaluationPlan: "Quarterly member feedback and program impact reviews.",
  },
];

export default associations;
