const mockEmployees = [
    {
        id: "EMP20230001",
        firstName: 'Aarav',
        lastName: 'Sharma',
        email: 'aarav.sharma@example.com',
        department: 'HR',
        role: 'Manager'
    },
    {
        id: "EMP20230002",
        firstName: 'Diya',
        lastName: 'Patel',
        email: 'diya.patel@example.com',
        department: 'IT',
        role: 'Developer'
    },
    {
        id: "EMP20230003",
        firstName: 'Vihaan',
        lastName: 'Singh',
        email: 'vihaan.singh@example.com',
        department: 'Finance',
        role: 'Analyst'
    },
    {
        id: "EMP20230004",
        firstName: 'Ananya',
        lastName: 'Reddy',
        email: 'ananya.reddy@example.com',
        department: 'Marketing',
        role: 'Specialist'
    },
    {
        id: "EMP20230005",
        firstName: 'Reyansh',
        lastName: 'Gupta',
        email: 'reyansh.gupta@example.com',
        department: 'Operations',
        role: 'Coordinator'
    },
    {
        id: "EMP20230006",
        firstName: 'Ishaan',
        lastName: 'Kumar',
        email: 'ishaan.kumar@example.com',
        department: 'IT',
        role: 'DevOps Engineer'
    },
    {
        id: "EMP20230007",
        firstName: 'Advait',
        lastName: 'Joshi',
        email: 'advait.joshi@example.com',
        department: 'Finance',
        role: 'Accountant'
    },
    {
        id: "EMP20230008",
        firstName: 'Anika',
        lastName: 'Malhotra',
        email: 'anika.malhotra@example.com',
        department: 'HR',
        role: 'Recruiter'
    },
    {
        id: "EMP20230009",
        firstName: 'Kabir',
        lastName: 'Choudhary',
        email: 'kabir.choudhary@example.com',
        department: 'Sales',
        role: 'Representative'
    },
    {
        id: "EMP20230010",
        firstName: 'Pari',
        lastName: 'Mehta',
        email: 'pari.mehta@example.com',
        department: 'Marketing',
        role: 'Content Creator'
    },
    {
        id: "EMP20230011",
        firstName: 'Arjun',
        lastName: 'Nair',
        email: 'arjun.nair@example.com',
        department: 'IT',
        role: 'Senior Developer'
    },
    {
        id: "EMP20230012",
        firstName: 'Myra',
        lastName: 'Iyer',
        email: 'myra.iyer@example.com',
        department: 'Finance',
        role: 'Financial Advisor'
    },
    {
        id: "EMP20230013",
        firstName: 'Vivaan',
        lastName: 'Desai',
        email: 'vivaan.desai@example.com',
        department: 'Operations',
        role: 'Logistics Manager'
    },
    {
        id: "EMP20230014",
        firstName: 'Kiara',
        lastName: 'Saxena',
        email: 'kiara.saxena@example.com',
        department: 'HR',
        role: 'Benefits Administrator'
    },
    {
        id: "EMP20230015",
        firstName: 'Aditya',
        lastName: 'Rao',
        email: 'aditya.rao@example.com',
        department: 'Sales',
        role: 'Account Executive'
    },
    {
        id: "EMP20230016",
        firstName: 'Avni',
        lastName: 'Menon',
        email: 'avni.menon@example.com',
        department: 'IT',
        role: 'QA Engineer'
    },
    {
        id: "EMP20230017",
        firstName: 'Dhruv',
        lastName: 'Banerjee',
        email: 'dhruv.banerjee@example.com',
        department: 'Marketing',
        role: 'SEO Specialist'
    },
    {
        id: "EMP20230018",
        firstName: 'Anvi',
        lastName: 'Chatterjee',
        email: 'anvi.chatterjee@example.com',
        department: 'Finance',
        role: 'Auditor'
    },
    {
        id: "EMP20230019",
        firstName: 'Shaurya',
        lastName: 'Mukherjee',
        email: 'shaurya.mukherjee@example.com',
        department: 'Operations',
        role: 'Facilities Manager'
    },
    {
        id: "EMP20230020",
        firstName: 'Aanya',
        lastName: 'Trivedi',
        email: 'aanya.trivedi@example.com',
        department: 'HR',
        role: 'Training Coordinator'
    },
    {
        id: "EMP20230021",
        firstName: 'Atharv',
        lastName: 'Goswami',
        email: 'atharv.goswami@example.com',
        department: 'IT',
        role: 'System Administrator'
    },
    {
        id: "EMP20230022",
        firstName: 'Ira',
        lastName: 'Bose',
        email: 'ira.bose@example.com',
        department: 'Sales',
        role: 'Sales Manager'
    },
    {
        id: "EMP20230023",
        firstName: 'Krish',
        lastName: 'Chakraborty',
        email: 'krish.chakraborty@example.com',
        department: 'Marketing',
        role: 'Social Media Manager'
    },
    {
        id: "EMP20230024",
        firstName: 'Meera',
        lastName: 'Pillai',
        email: 'meera.pillai@example.com',
        department: 'Finance',
        role: 'Financial Analyst'
    },
    {
        id: "EMP20230025",
        firstName: 'Rudra',
        lastName: 'Naidu',
        email: 'rudra.naidu@example.com',
        department: 'Operations',
        role: 'Supply Chain Specialist'
    },
    {
        id: "EMP20230026",
        firstName: 'Tara',
        lastName: 'Venkatesh',
        email: 'tara.venkatesh@example.com',
        department: 'IT',
        role: 'UI/UX Designer'
    },
    {
        id: "EMP20230027",
        firstName: 'Yuvan',
        lastName: 'Hegde',
        email: 'yuvan.hegde@example.com',
        department: 'HR',
        role: 'Compensation Analyst'
    },
    {
        id: "EMP20230028",
        firstName: 'Zara',
        lastName: 'Kapoor',
        email: 'zara.kapoor@example.com',
        department: 'Sales',
        role: 'Business Development'
    },
    {
        id: "EMP20230029",
        firstName: 'Ayaan',
        lastName: 'Khanna',
        email: 'ayaan.khanna@example.com',
        department: 'Marketing',
        role: 'Brand Manager'
    },
    {
        id: "EMP20230030",
        firstName: 'Amaira',
        lastName: 'Srinivasan',
        email: 'amaira.srinivasan@example.com',
        department: 'Finance',
        role: 'Tax Specialist'
    },
    {
        id: "EMP20230031",
        firstName: 'Ishita',
        lastName: 'Chawla',
        email: 'ishita.chawla@example.com',
        department: 'IT',
        role: 'Data Scientist'
    },
    {
        id: "EMP20230032",
        firstName: 'Virat',
        lastName: 'Bajaj',
        email: 'virat.bajaj@example.com',
        department: 'Operations',
        role: 'Project Manager'
    },
    {
        id: "EMP20230033",
        firstName: 'Navya',
        lastName: 'Grover',
        email: 'navya.grover@example.com',
        department: 'HR',
        role: 'HRIS Analyst'
    },
    {
        id: "EMP20230034",
        firstName: 'Rehan',
        lastName: 'Chauhan',
        email: 'rehan.chauhan@example.com',
        department: 'Sales',
        role: 'Customer Success'
    },
    {
        id: "EMP20230035",
        firstName: 'Kyra',
        lastName: 'Agarwal',
        email: 'kyra.agarwal@example.com',
        department: 'Marketing',
        role: 'Digital Strategist'
    }
];