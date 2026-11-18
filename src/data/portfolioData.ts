import { Project, Milestone, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: "Pranav",
  fullName: "Pranav Badagi",
  title: "Full-Stack Engineer • Blockchain & AI Developer",
  location: "Bengaluru, Karnataka, India",
  email: "pranavbadagi20@gmail.com",
  github: "https://github.com/Pranavbadagi020",
  linkedin: "https://www.linkedin.com/in/pranav-badagi-631504291/",
  leetcode: "https://leetcode.com/u/Pranav_Badagi--20/",
  resumePdf: "/Pranav_Badagi_Resume.pdf",
  avatar: "/pranav.jpg",
  bio: "Information Science & Engineering undergraduate in Bengaluru building scalable full-stack web apps, Ethereum smart contracts, and AI-driven systems.",
  status: "Available for SDE / Backend Roles",
};

export const PROJECTS: Project[] = [
  {
    id: "marinex-ai",
    title: "MARINEX",
    badge: "SIH 2026 Hackathon",
    subtitle: "AI-Powered Marine Mission Planning & Risk Scoring System",
    summary: "LLM-powered marine mission planning system that translates natural-language requirements into structured, risk-aware mission plans with multi-agent orchestration and marine environmental data analysis.",
    techStack: ["Python", "Multi-Agent LLM Orchestration", "Prompt Engineering", "React", "Environmental APIs", "FastAPI"],
    featuredTag: "Smart India Hackathon 2026",
    links: {
      github: "https://github.com/Pranavbadagi020",
    },
    metrics: [
      { label: "Planning Latency", value: "< 1.2s" },
      { label: "Risk Assessment", value: "Explainable" },
      { label: "Multi-Agent", value: "4 Agents" },
    ],
    modalDetails: {
      overview: "Developed for the Smart India Hackathon (SIH 2026). MARINEX translates unstructured, natural-language mission directives into validated, risk-aware tactical maritime execution routes. It aggregates marine weather, bathymetric data, and obstacle telemetry in real time.",
      architectureOverview: "Coordinated multi-agent workflow where specialized agents (Mission Parser, Environmental Telemetry Agent, Risk Scoring Evaluator, and Route Synthesizer) collaborate to generate evidence-backed mission briefings with confidence bounds.",
      architectureHighlights: [
        "Natural-language requirements translation into structured, schema-validated mission parameters.",
        "Multi-agent LLM orchestration coordinating route feasibility and obstacle risk mitigation.",
        "Live marine environmental data parsing (ocean currents, wave height, bathymetry, weather forecasts).",
        "Explainable risk-scoring engine providing transparent rationales for mission route recommendations.",
        "Interactive React dashboard for marine intelligence visualization and evidence-based decision support."
      ],
      codeSnippet: {
        language: "python",
        filename: "marinex_mission_orchestrator.py",
        code: `@router.post("/v1/missions/synthesize", response_model=MissionPlanResponse)
async def synthesize_marine_mission(
    request: MissionPromptRequest,
    orchestrator: Annotated[MultiAgentOrchestrator, Depends(get_orchestrator)]
) -> MissionPlanResponse:
    # 1. Parse natural-language directives into structured mission objectives
    parsed_intent = await orchestrator.intent_agent.parse(request.directive)
    
    # 2. Query environmental APIs (ocean currents, wave heights, wind vectors)
    environmental_data = await environmental_client.fetch_marine_telemetry(
        origin=parsed_intent.origin_coords,
        destination=parsed_intent.destination_coords,
        timeframe=parsed_intent.time_window
    )
    
    # 3. Multi-agent risk evaluation and explainable scoring
    risk_evaluation = await orchestrator.risk_agent.evaluate(
        intent=parsed_intent,
        telemetry=environmental_data
    )
    
    # 4. Generate structured waypoint plan with contingency recommendations
    synthesized_plan = await orchestrator.routing_agent.generate_plan(
        intent=parsed_intent,
        risk_metrics=risk_evaluation
    )
    
    return MissionPlanResponse(
        mission_id=synthesized_plan.id,
        status="FEASIBLE",
        risk_score=risk_evaluation.composite_score,
        risk_rationale=risk_evaluation.explainable_factors,
        waypoints=synthesized_plan.waypoints,
        environmental_snapshot=environmental_data.summary
    )`
      },
      techBreakdown: [
        {
          category: "AI & Orchestration",
          items: ["Multi-Agent LLM Orchestration", "Prompt Engineering", "LangChain / CrewAI", "Python 3.11"]
        },
        {
          category: "Telemetry & Data APIs",
          items: ["Marine Environmental APIs", "NOAA / Open-Meteo", "GeoJSON", "FastAPI"]
        },
        {
          category: "Dashboard & UI",
          items: ["React", "Tailwind CSS", "Interactive Map Visualization", "Recharts"]
        }
      ]
    }
  },
  {
    id: "certchain",
    title: "CertChain",
    badge: "Enterprise Web3",
    subtitle: "Blockchain-Based Academic & Credential Verification System",
    summary: "Decentralized verification engine utilizing Java 21, Spring Boot 3, and Ethereum with character-level Apache PDFBox tamper detection and QR instant validation.",
    techStack: ["Java 21", "Spring Boot 3", "Solidity", "Ethereum", "React 18", "Apache PDFBox", "Docker", "Cloudflare"],
    featuredTag: "Production Backend",
    links: {
      github: "https://github.com/Pranavbadagi020",
    },
    metrics: [
      { label: "Passing Tests", value: "81+ Suites" },
      { label: "Tamper Precision", value: "Char-level" },
      { label: "Stack", value: "Java 21 / Spring Boot 3" },
    ],
    modalDetails: {
      overview: "Built to eliminate academic credential forgery. CertChain extracts raw glyph metadata from PDF certificates using Apache PDFBox, calculates deterministically reproducible SHA-256 leaf nodes, and anchors them to an Ethereum smart contract for zero-trust public verification.",
      architectureOverview: "High-throughput Java 21 Spring Boot microservice with Hibernate/JPA and PostgreSQL, Dockerized with multi-stage builds and protected by Cloudflare Edge rules.",
      architectureHighlights: [
        "Apache PDFBox text stripper parsing coordinates and font structures for character-level tamper detection.",
        "81+ automated integration and unit test suites across Spring Boot controllers and smart contract bindings.",
        "Self-contained QR generation encoding signed verification URLs for instant mobile scanning.",
        "Production-grade Docker containerization deployed behind Cloudflare SSL termination."
      ],
      codeSnippet: {
        language: "java",
        filename: "CertificateVerificationService.java",
        code: `@Service
public class CertificateVerificationService {

    private final EthereumContractClient contractClient;
    private final PDFTamperEngine pdfTamperEngine;

    public VerificationResult verifyCertificate(MultipartFile certificateFile) throws IOException {
        // 1. Calculate file SHA-256 hash
        byte[] fileBytes = certificateFile.getBytes();
        String computedHash = DigestUtils.sha256Hex(fileBytes);

        // 2. Query Ethereum blockchain registry
        Optional<BlockRecord> onChainRecord = contractClient.findRecord(computedHash);
        if (onChainRecord.isEmpty()) {
            return VerificationResult.tampered("Hash not registered on Ethereum ledger");
        }

        // 3. Perform character-level glyph inspection via Apache PDFBox
        boolean glyphsIntact = pdfTamperEngine.verifyGlyphMetrics(fileBytes, onChainRecord.get().getGlyphChecksum());
        if (!glyphsIntact) {
            return VerificationResult.tampered("Character layout or font metadata altered");
        }

        return VerificationResult.verified(onChainRecord.get());
    }
}`
      },
      techBreakdown: [
        {
          category: "Backend & Systems",
          items: ["Java 21", "Spring Boot 3", "Hibernate / JPA", "Apache PDFBox", "PostgreSQL"]
        },
        {
          category: "Decentralized Layer",
          items: ["Solidity", "Ethereum Sepolia / Mainnet", "Web3j", "Smart Contracts"]
        },
        {
          category: "Deployment & DevOps",
          items: ["Docker Multi-Stage", "Cloudflare", "Git / GitHub Actions", "JUnit 5"]
        }
      ]
    }
  },
  {
    id: "votehub",
    title: "VoteHub",
    badge: "Full-Stack System",
    subtitle: "Real-Time Cryptographically Auditable Web Voting Platform",
    summary: "Secure, real-time web voting application featuring robust state management, cryptographic vote receipts, user authentication, and live result aggregation.",
    techStack: ["React", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "WebSockets", "JWT"],
    featuredTag: "Real-Time Platform",
    links: {
      github: "https://github.com/Pranavbadagi020",
      demo: "https://github.com/Pranavbadagi020",
    },
    metrics: [
      { label: "Sync Latency", value: "< 25ms" },
      { label: "State Reducers", value: "Normalized" },
      { label: "Audit Integrity", value: "100%" },
    ],
    modalDetails: {
      overview: "VoteHub eliminates centralized tampering risks in organizational and civic polling. Every cast ballot is signed with user credentials, verified via JWT and anti-double-voting atomic operators, and pushed across live WebSocket channels to update dashboard charts instantly.",
      architectureOverview: "Client-side Redux Toolkit manages normalized optimistic UI updates, while Express.js endpoints run atomic MongoDB `$addToSet` and `$inc` mutations inside database transactions to prevent race conditions during high-concurrency ballot flushes.",
      architectureHighlights: [
        "Strict Redux slice architecture separating auth, active ballots, voting sessions, and live metrics.",
        "Atomic ACID MongoDB transactions ensuring one person cannot submit concurrent ballots.",
        "WebSocket broadcast clustering for millisecond-level live vote tally charts.",
        "Cryptographic voter receipt hashes allowing independent voter ballot verification."
      ],
      codeSnippet: {
        language: "javascript",
        filename: "voteController.js",
        code: `export const castBallot = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { ballotId, optionId } = req.body;
    const voterId = req.user.id;

    // Atomic verify-and-lock to guarantee single vote per user
    const updatedBallot = await Ballot.findOneAndUpdate(
      { _id: ballotId, voters: { $ne: voterId }, isActive: true },
      { 
        $push: { voters: voterId },
        $inc: { "options.$[elem].votes": 1 }
      },
      { 
        arrayFilters: [{ "elem._id": optionId }],
        new: true,
        session 
      }
    );

    if (!updatedBallot) {
      await session.abortTransaction();
      return res.status(409).json({ error: "Ballot already submitted or inactive" });
    }

    const auditReceipt = crypto
      .createHmac("sha256", process.env.VOTE_SECRET)
      .update(\`\${voterId}:\${ballotId}:\${optionId}\`)
      .digest("hex");

    await session.commitTransaction();
    io.to(ballotId).emit("BALLOT_TALLY_UPDATE", { ballotId, optionId });
    return res.status(200).json({ success: true, receipt: auditReceipt });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: "Atomic vote submission failed" });
  } finally {
    session.endSession();
  }
};`
      },
      techBreakdown: [
        {
          category: "Frontend Architecture",
          items: ["React", "Redux Toolkit", "RTK Query", "Tailwind CSS", "Recharts"]
        },
        {
          category: "Backend & Microservices",
          items: ["Node.js", "Express.js", "Socket.IO", "JSON Web Tokens (JWT)", "Bcrypt"]
        },
        {
          category: "Database & Security",
          items: ["MongoDB Atlas", "Mongoose ORM", "ACID Transactions", "HMAC-SHA256 Receipts"]
        }
      ]
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Java (Java 21)", level: "Advanced", highlight: true },
      { name: "JavaScript (ES6+)", level: "Advanced", highlight: true },
      { name: "TypeScript", level: "Proficient", highlight: true },
      { name: "Python", level: "Proficient", highlight: true },
      { name: "Solidity", level: "Advanced", highlight: true },
      { name: "C / C++", level: "Foundational" },
      { name: "SQL", level: "Proficient" },
    ]
  },
  {
    title: "Full-Stack Web & Backend",
    skills: [
      { name: "Spring Boot 3", level: "Advanced", highlight: true },
      { name: "React.js (React 18)", level: "Advanced", highlight: true },
      { name: "Redux Toolkit", level: "Proficient", highlight: true },
      { name: "Node.js", level: "Advanced", highlight: true },
      { name: "Express.js", level: "Advanced", highlight: true },
      { name: "RESTful API Design", level: "Advanced", highlight: true },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "HTML5 / Modern CSS", level: "Advanced" },
      { name: "Hibernate / JPA", level: "Proficient" },
      { name: "Apache PDFBox", level: "Specialized" },
    ]
  },
  {
    title: "Databases & Web3 Architecture",
    skills: [
      { name: "MongoDB", level: "Advanced", highlight: true },
      { name: "PostgreSQL", level: "Proficient", highlight: true },
      { name: "MySQL", level: "Proficient" },
      { name: "Ethereum EVM", level: "Advanced", highlight: true },
      { name: "Smart Contracts", level: "Advanced", highlight: true },
      { name: "Cryptography (SHA-256)", level: "Advanced", highlight: true },
      { name: "Web3.js / Ethers.js", level: "Proficient" },
      { name: "Docker Containerization", level: "Proficient", highlight: true },
    ]
  },
  {
    title: "DevOps, Tools & Workflow",
    skills: [
      { name: "Git & GitHub", level: "Advanced", highlight: true },
      { name: "Docker", level: "Proficient", highlight: true },
      { name: "Cloudflare", level: "Proficient" },
      { name: "Linux / macOS Terminal", level: "Advanced", highlight: true },
      { name: "Postman", level: "Advanced" },
      { name: "IntelliJ IDEA", level: "Advanced" },
      { name: "VS Code", level: "Advanced" },
      { name: "Data Structures & Algorithms", level: "Advanced", highlight: true },
    ]
  }
];

export const MARQUEE_TECH_ROW_1 = [
  { name: "Java 21", icon: "☕" },
  { name: "Spring Boot 3", icon: "🍃" },
  { name: "Solidity", icon: "💠" },
  { name: "Ethereum", icon: "Ξ" },
  { name: "React 18", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Python", icon: "🐍" },
  { name: "Multi-Agent LLMs", icon: "🧠" },
  { name: "Node.js", icon: "🟢" },
  { name: "Express.js", icon: "⚡" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Docker", icon: "🐳" },
];

export const MARQUEE_TECH_ROW_2 = [
  { name: "SHA-256 Verification", icon: "🔒" },
  { name: "Environmental APIs", icon: "🌊" },
  { name: "RESTful APIs", icon: "🔌" },
  { name: "Redux Toolkit", icon: "🔄" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Apache PDFBox", icon: "📄" },
  { name: "Cloudflare", icon: "☁️" },
  { name: "Linux Terminal", icon: "🐧" },
  { name: "Data Structures (DSA)", icon: "🌲" },
  { name: "Prompt Engineering", icon: "⚡" },
  { name: "Smart Contracts", icon: "📜" },
];

export const MILESTONES: Milestone[] = [
  {
    id: "m1",
    year: "2023 – 2027",
    title: "B.E. in Information Science and Engineering",
    institution: "MS Engineering College (VTU) — Bengaluru, KA",
    description: "Maintaining a strong academic CGPA of 8.8 with rigorous coursework across Data Structures & Algorithms, Object-Oriented Programming (Java/C++), Operating Systems, Computer Networks, and Database Management Systems.",
    badges: ["CGPA: 8.8 / 10.0", "Core CS Foundations", "Bengaluru"],
    highlight: "Academic Excellence"
  },
  {
    id: "m2",
    year: "2026",
    title: "Smart India Hackathon (SIH 2026)",
    institution: "MS Engineering College — SIH Internal Hackathon",
    description: "Developed MARINEX, an AI-powered marine mission planning system utilizing multi-agent LLM orchestration, environmental telemetry parsing (currents, waves, weather), and explainable risk scoring to assist decision support during our college SIH hackathon.",
    badges: ["SIH 2026", "Multi-Agent LLM", "Marine Intelligence"],
    highlight: "College Hackathon"
  },
  {
    id: "m3",
    year: "2025 – 2026",
    title: "Core Backend Systems, Web3 & Algorithmic Rigor",
    institution: "Competitive Programming & Open Source",
    description: "Active problem solver on LeetCode with deep focus on Arrays, Trees, Graphs, and Dynamic Programming. Architected CertChain with 81+ automated passing test suites, proving end-to-end reliability.",
    badges: ["LeetCode Problem Solving", "Java 21 / Spring Boot 3", "81+ Automated Tests"],
    highlight: "Engineering Rigor"
  },
  {
    id: "m4",
    year: "2021 – 2023",
    title: "Pre-University Course (PCMB)",
    institution: "SRA Composite PU College — Bagalkot, KA",
    description: "Completed higher secondary education with a distinguished 88% aggregate in Physics, Chemistry, Mathematics, and Biology, establishing foundational mathematical and analytical problem-solving abilities.",
    badges: ["Score: 88%", "Analytical & Math Foundation"],
    highlight: "Distinction"
  }
];
