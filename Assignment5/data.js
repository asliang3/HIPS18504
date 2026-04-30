// ============================================================
// DATA.JS — Course content extracted from syllabus
// Computation, Culture & Society 2026 (HIPS 18504)
// Prof. James A. Evans, University of Chicago
// ============================================================

const WEEKS = [
  {
    id: "w1",
    number: 1,
    title: "Arithmetic-Accelerated",
    dates: "March 24, 26",
    room: "counting",
    summary: "Numbers form the basis of computation. Early machines augmented human computing for bookkeeping, finance, astronomy, and nautical measurement. From Pascal to Leibniz.",
    questions: [
      "What challenges come with large-scale arithmetic problems put to machines?",
      "What are the social and technical challenges of designing novel devices never built before?",
      "What are the implications for skilling and de-skilling human workers/thinkers?"
    ],
    readings: [
      {
        id: "r1a",
        title: "Dedicatory Letter to Chancellor Séguier on the Subject of the Machine",
        author: "Blaise Pascal",
        year: "1645",
        type: "primary",
        description: "Pascal's pitch for his mechanical calculator—a machine to perform arithmetic without pen or tokens.",
        concepts: ["calculation", "automation", "labor", "machine"],
        tensions: ["human vs machine", "skilling vs de-skilling"],
        institutions: ["state", "commerce", "science"]
      },
      {
        id: "r1b",
        title: "Carrying Tens: Pascal, Morland, and the Challenge of Machine Calculation",
        author: "Matthew L. Jones",
        year: "2016",
        source: "Reckoning with Matter, pp. 13-43",
        type: "secondary",
        description: "How the mechanical carry—tens-place transfer—posed the central unsolved engineering problem for 17th-century calculator designers.",
        concepts: ["calculation", "mechanism", "innovation", "thinking about thinking"],
        tensions: ["design vs implementation", "mind vs matter"],
        institutions: ["science", "engineering"]
      }
    ],
    explore: "Use an abacus simulator to compute 9233×144, experiencing the 'carry' challenge firsthand."
  },
  {
    id: "w2",
    number: 2,
    title: "Computational Creation",
    dates: "March 31, April 2",
    room: "creativity",
    summary: "Theologians, philosophers, artists, and engineers tried to turn everything into number—to quantify reasoning and creativity for computation. From Lull to Leibniz to IBM's Chef Watson.",
    questions: [
      "What is the process of turning qualities into quantities—what choices are involved?",
      "What is lost and what is gained in the translation?",
      "Who is the creator/discoverer—who deserves credit in works driven by computation?",
      "If computation models physical and metaphysical worlds, can it change them?"
    ],
    readings: [
      {
        id: "r2a",
        title: "Towards a Universal Characteristic",
        author: "Gottfried Leibniz",
        year: "1685",
        source: "Leibniz: Selections, ed. Philip Wiener",
        type: "primary",
        description: "Leibniz's vision of a universal symbolic language in which all truths could be calculated—the dream of mechanizing thought itself.",
        concepts: ["universal language", "logic", "calculation", "creativity", "formalization"],
        tensions: ["quality vs quantity", "human vs machine authorship"],
        institutions: ["philosophy", "mathematics", "church"]
      },
      {
        id: "r2b",
        title: "Ars Combinatoria: Chance and Choice in 18th Century Music",
        author: "Leonard Ratner",
        year: "1980",
        source: "Studies in 18th Century Music, pp. 343-362",
        type: "secondary",
        description: "How dice games and combinatorial tables let composers (and anyone) generate music algorithmically—including Mozart's Musikalisches Würfelspiel.",
        concepts: ["creativity", "randomness", "combinatorics", "music", "algorithm"],
        tensions: ["chance vs intention", "human vs algorithmic authorship"],
        institutions: ["art", "music", "aristocracy"]
      },
      {
        id: "r2c",
        title: "A Big Data Approach to Computational Creativity",
        author: "Lav R. Varshney et al. (IBM)",
        year: "2019",
        source: "IBM Journal of Research and Development",
        type: "contemporary",
        description: "IBM's Chef Watson: using ingredient flavor databases and combinatorial search to generate novel, surprising recipes—creativity as data-driven optimization.",
        concepts: ["creativity", "big data", "AI", "combinatorics", "optimization"],
        tensions: ["machine vs human creativity", "novelty vs quality"],
        institutions: ["corporation", "research lab"]
      },
      {
        id: "r2d",
        title: "The 9 Billion Names of God",
        author: "Arthur C. Clarke",
        year: "1953",
        type: "fiction",
        description: "Monks hire a computer to enumerate all possible names of God. When it finishes, the universe ends. A parable about computation completing the work of meaning.",
        concepts: ["computation", "meaning", "religion", "enumeration", "limits"],
        tensions: ["sacred vs secular", "completion vs consequence"],
        institutions: ["religion", "computing industry"]
      }
    ],
    explore: "Perform Mozart's dice composition game, or use GANBreeder to create generative art."
  },
  {
    id: "w3",
    number: 3,
    title: "Computer Programming",
    dates: "April 7, 9",
    room: "labor",
    summary: "Computers were once people—human workers in a division of labor. Babbage separated mill (CPU) from store (memory). Turing generalized this to a universal machine. What does programming mean when it transitions from managing humans to instructing machines?",
    questions: [
      "What are the difficulties between managing a computer with a program vs. managing a computing staff?",
      "What did programming allow that building computing machines makes difficult?",
      "If programming is 'all mind', what are the implications of different programming 'languages'?"
    ],
    readings: [
      {
        id: "r3a",
        title: "Sketch of the Analytical Engine Invented by Charles Babbage",
        author: "Luigi Menabrea (trans. Ada Lovelace, with notes)",
        year: "1843",
        source: "Scientific Memoirs, 3, 666-731",
        type: "primary",
        description: "The first published account of Babbage's Analytical Engine, translated and vastly expanded by Ada Lovelace—whose notes contain the first algorithm intended for a machine.",
        concepts: ["programming", "algorithm", "machine", "labor division", "abstraction"],
        tensions: ["human programmer vs machine executor", "credit and authorship"],
        institutions: ["science", "aristocracy", "gender"]
      },
      {
        id: "r3b",
        title: "Address on the Gold Medal / The Ninth Bridgewater Treatise",
        author: "Henry Thomas Colebrooke / Charles Babbage",
        year: "1825/1838",
        type: "primary",
        description: "Babbage's machine as proof of divine design and rational order—computation enlisted in natural theology.",
        concepts: ["machine", "God", "order", "calculation", "legitimacy"],
        tensions: ["religion vs science", "mechanism vs meaning"],
        institutions: ["church", "science", "state"]
      },
      {
        id: "r3c",
        title: "The Children of Adam Smith",
        author: "David Gier",
        year: "2005",
        source: "When Computers Were Human, pp. 26-45",
        type: "secondary",
        description: "Human computers as workers in a factory of calculation—division of labor applied to arithmetic, with all its attendant hierarchies and deskilling.",
        concepts: ["labor", "division of labor", "human computers", "deskilling", "management"],
        tensions: ["human vs machine", "skill vs scale"],
        institutions: ["labor", "government", "science"]
      },
      {
        id: "r3d",
        title: "Programming",
        author: "Matt Jones",
        year: "2021",
        source: "Information: A Historical Companion, pp. 703-708",
        type: "secondary",
        description: "A compressed history of programming as a practice—how the concept of 'program' migrated from human organizations to machine instructions.",
        concepts: ["programming", "abstraction", "language", "instruction", "history"],
        tensions: ["formal vs informal", "universal vs particular"],
        institutions: ["computing industry", "military", "science"]
      }
    ],
    explore: "Write a program to calculate the Fibonacci sequence (like Ada Lovelace), or read Turing's 1936 paper on computable numbers."
  },
  {
    id: "w4",
    number: 4,
    title: "Data Science",
    dates: "April 14, 16",
    room: "counting",
    summary: "Statistics migrated from astronomy to society. Quetelet's 'average man' applied error theory to human behavior—discovering 'social laws' that raised questions about free will, culpability, and the nature of human nature.",
    questions: [
      "What does social law mean for human free will and culpability?",
      "If crime rates are regular, are perpetrators culpable?",
      "What is gained and lost when scientific methods move from stars to societies?"
    ],
    readings: [
      {
        id: "r4a",
        title: "Treatise on Man and the Development of His Faculties",
        author: "Adolphe Quetelet",
        year: "1835",
        type: "primary",
        description: "The founding text of social statistics: Quetelet's 'average man' as the center of gravity of a social body, with crime and suicide obeying natural laws.",
        concepts: ["statistics", "average", "social law", "measurement", "classification"],
        tensions: ["free will vs determinism", "individual vs aggregate", "science vs morality"],
        institutions: ["state", "science", "law", "medicine"]
      },
      {
        id: "r4b",
        title: "The Empire of Chance",
        author: "Gerd Gigerenzer et al.",
        year: "1989",
        source: "Sections 2-2.2, pp. 37-69",
        type: "secondary",
        description: "How probability migrated from gambling and insurance to become the foundation of scientific reasoning across all disciplines.",
        concepts: ["probability", "statistics", "science", "risk", "uncertainty"],
        tensions: ["chance vs law", "individual vs population"],
        institutions: ["science", "insurance", "state"]
      },
      {
        id: "r4c",
        title: "The Rise of Statistical Thinking, 1820-1900",
        author: "Theodore Porter",
        year: "1986",
        source: "Chapters 2 and additional pp.",
        type: "secondary",
        description: "How statistical thinking reshaped the social and natural sciences—making variation, not essence, the object of scientific inquiry.",
        concepts: ["statistics", "social science", "measurement", "objectivity", "normalization"],
        tensions: ["objectivity vs values", "measurement vs meaning"],
        institutions: ["state", "science", "reform movements"]
      }
    ],
    explore: "Compute empirical and modeled distributions in Google Colab, or read 19th-century statistical articles from the Journal of the Statistical Society of London.",
    fieldTrip: "April 14: Field Trip to Adler Planetarium's Historical Collections"
  },
  {
    id: "w5",
    number: 5,
    title: "Artificial Intelligence",
    dates: "April 21, 23",
    room: "control",
    summary: "Turing's imitation game launched AI. The 1955 Dartmouth proposal named and framed a research program. The battle between symbolic (top-down) and connectionist (bottom-up) AI shaped everything that followed—with deep learning eventually winning.",
    questions: [
      "What definition and standard of intelligence was chosen—and what did that choice foreclose?",
      "What are the ethical considerations of the AI program?",
      "Why did bottom-up (learning from data) win over top-down (logic from theory)?",
      "What makes AI cultural and social as well as technical?"
    ],
    readings: [
      {
        id: "r5a",
        title: "Computing Machinery and Intelligence",
        author: "Alan Turing",
        year: "1950",
        source: "Mind 59(236):433",
        type: "primary",
        description: "The Turing Test: can a machine imitate a human convincingly enough to fool a judge? A deceptively simple question that defined AI's ambitions for decades.",
        concepts: ["intelligence", "imitation", "test", "machine", "consciousness"],
        tensions: ["human vs machine", "intelligence vs performance", "mind vs mechanism"],
        institutions: ["science", "military", "philosophy"]
      },
      {
        id: "r5b",
        title: "Alan Turing: The Enigma (excerpt)",
        author: "Andrew Hodges",
        year: "2014",
        source: "pp. 474-490",
        type: "secondary",
        description: "The human story behind the Turing Test—the persecution, the politics, and the profound loneliness that inflected Turing's thinking about machine minds.",
        concepts: ["biography", "persecution", "sexuality", "state violence", "intelligence"],
        tensions: ["individual vs state", "brilliance vs punishment"],
        institutions: ["state", "military", "science", "law"]
      },
      {
        id: "r5c",
        title: "A Logical Calculus of the Ideas Immanent in Nervous Activity",
        author: "Warren S. McCulloch and Walter Pitts",
        year: "1943",
        source: "Bulletin of Mathematical Biophysics, 5",
        type: "primary",
        description: "The first neural network: neurons modeled as logic gates—a mathematical proof that brains could compute, and that computers could think like brains.",
        concepts: ["neural network", "logic", "brain", "computation", "emergence"],
        tensions: ["brain vs computer", "biology vs mechanism"],
        institutions: ["science", "neuroscience", "mathematics"]
      },
      {
        id: "r5d",
        title: "Deep Learning",
        author: "Yann LeCun, Yoshua Bengio, and Geoffrey Hinton",
        year: "2015",
        source: "Nature 521, no. 7553",
        type: "contemporary",
        description: "The manifesto of the deep learning revolution: how layered neural networks learning from massive data overtook symbolic AI and transformed computer vision, speech, and language.",
        concepts: ["deep learning", "neural network", "data", "pattern recognition", "revolution"],
        tensions: ["interpretability vs performance", "data vs theory"],
        institutions: ["research lab", "corporation", "university"]
      },
      {
        id: "r5e",
        title: "Large AI Models are Cultural and Social Technologies",
        author: "Henry Farrell, Allison Gopnik, Cosma Shalizi, and James Evans",
        year: "2025",
        source: "Science",
        type: "contemporary",
        description: "LLMs are not just technical artifacts but cultural ones—trained on human expression, they reflect and reproduce social structures, biases, and ways of knowing.",
        concepts: ["LLM", "culture", "society", "bias", "language"],
        tensions: ["technical vs social", "neutral vs political"],
        institutions: ["research", "corporation", "society"]
      }
    ],
    explore: "Build a neural network in TensorFlow Playground, or try GPT-4/Claude in a role-play scenario."
  },
  {
    id: "w6",
    number: 6,
    title: "Augmented Intelligence",
    dates: "April 28, 30",
    room: "interface",
    summary: "While AI sought to replace human intelligence, a parallel program sought to amplify it. Vannevar Bush's memex and Douglas Engelbart's NLS/mouse/hypertext demo defined augmented intelligence—and this very course is an exercise in it.",
    questions: [
      "What is the difference between Artificial and Augmented Intelligence?",
      "Where does augmentation end and automation begin?",
      "What kinds of technologies emerge under augmentation vs. replacement standards?",
      "What are unexplored possibilities for augmented intelligence?"
    ],
    readings: [
      {
        id: "r6a",
        title: "As We May Think",
        author: "Vannevar Bush",
        year: "1945",
        source: "The Atlantic",
        type: "primary",
        description: "Bush's visionary essay imagining the memex—a personal knowledge device with associative trails. The founding document of hypertext, the web, and augmented intelligence.",
        concepts: ["memory", "association", "hypertext", "interface", "augmentation", "archive"],
        tensions: ["individual vs collective memory", "augmentation vs automation"],
        institutions: ["science", "military", "democracy"]
      },
      {
        id: "r6b",
        title: "Augmenting Human Intellect: A Conceptual Framework",
        author: "Douglas Engelbart",
        year: "1962",
        source: "pp. 1-29",
        type: "primary",
        description: "Engelbart's research manifesto: a systematic program to boost human capability through tools, language, methods, and training—the intellectual blueprint for the PC revolution.",
        concepts: ["augmentation", "interface", "tool", "hypertext", "mouse", "framework"],
        tensions: ["human vs machine", "tool vs replacement"],
        institutions: ["research lab", "military", "democracy"]
      },
      {
        id: "r6c",
        title: "The Mother of All Demos (1968)",
        author: "Douglas Engelbart",
        year: "1968",
        type: "primary",
        description: "Engelbart's live demonstration of the mouse, hypertext, video conferencing, and collaborative editing—all in 1968. The most influential technology demonstration in history.",
        concepts: ["mouse", "hypertext", "interface", "collaboration", "demo"],
        tensions: ["vision vs implementation", "individual vs collective work"],
        institutions: ["research lab", "military-industrial complex"]
      },
      {
        id: "r6d",
        title: "The Turing Trap: The Promise & Peril of Human-Like Artificial Intelligence",
        author: "Erik Brynjolfsson",
        year: "2022",
        source: "Daedalus 151(2): 272-287",
        type: "contemporary",
        description: "Chasing the Turing Test—building AI that mimics humans—may be the wrong goal. Automation that replaces humans destroys value; augmentation that complements them creates it.",
        concepts: ["Turing Test", "automation", "augmentation", "labor", "inequality"],
        tensions: ["replacement vs augmentation", "efficiency vs human flourishing"],
        institutions: ["economy", "labor market", "corporation"]
      }
    ],
    explore: "Read Engelbart's 'Mother of All Demos', or explore Ross Ashby's Introduction to Cybernetics.",
    fieldTrip: "April 28: Field Trip to Regenstein Special Collections"
  },
  {
    id: "w7",
    number: 7,
    title: "Social Computing",
    dates: "May 5, 7",
    room: "network",
    summary: "Computers became communication devices. ARPANET, PLATO, the WELL, and hypertext created new social formations—virtual communities, countercultures, and new economies—raising questions about the mutual shaping of human and machine networks.",
    questions: [
      "Does the human network drive the machine network, or vice versa?",
      "What are the consequences of a global computer network for sociability and society?",
      "How did 1960s-1970s society shape early computer networks?"
    ],
    readings: [
      {
        id: "r7a",
        title: "The Medium is the Massage",
        author: "Marshall McLuhan",
        year: "1967",
        source: "pp. 48-85",
        type: "primary",
        description: "McLuhan's sensory polemic: media are not neutral channels but active shapers of human perception and social organization. The medium, not the message, is what matters.",
        concepts: ["media", "perception", "society", "communication", "environment"],
        tensions: ["medium vs message", "individual vs collective"],
        institutions: ["media", "education", "culture"]
      },
      {
        id: "r7b",
        title: "The Computer as a Communication Device",
        author: "J.C.R. Licklider and Robert W. Taylor",
        year: "1968",
        source: "Science and Technology",
        type: "primary",
        description: "The ARPA memo that redefined the computer: not a calculator but a communication medium, connecting people to people through shared information spaces.",
        concepts: ["communication", "network", "ARPANET", "community", "interface"],
        tensions: ["tool vs medium", "individual vs network"],
        institutions: ["military", "research lab", "university"]
      },
      {
        id: "r7c",
        title: "Where the Counterculture Met the New Economy: The WELL and the Origins of Virtual Community",
        author: "Fred Turner",
        year: "2005",
        source: "Technology and Culture 46",
        type: "secondary",
        description: "How the Whole Earth Catalog's communalist ideals merged with Silicon Valley entrepreneurialism on the WELL bulletin board—and invented the ideology of the digital economy.",
        concepts: ["community", "counterculture", "network", "ideology", "virtual"],
        tensions: ["utopia vs market", "community vs commerce"],
        institutions: ["counterculture", "corporation", "community"]
      },
      {
        id: "r7d",
        title: "PLATO's Republic: Or the Other ARPANet",
        author: "Joy Risi Rankin",
        year: "2018",
        source: "A People's History of Computing, pp. 193-207",
        type: "secondary",
        description: "PLATO at UIUC: a parallel, non-military network that created online games, communities, and education—a democratic computing history suppressed by ARPANET's narrative dominance.",
        concepts: ["network", "community", "education", "democracy", "alternative history"],
        tensions: ["military vs civilian", "elite vs popular computing"],
        institutions: ["university", "military", "education"]
      }
    ],
    explore: "Read Ted Nelson's Computer Lib / Dream Machines, or play a multi-user dungeon (MUD).",
    fieldTrip: "May 5: Field Trip to Stephen M. Stigler's house museum"
  },
  {
    id: "w8",
    number: 8,
    title: "Digital Doubles",
    dates: "May 12, 14",
    room: "double",
    summary: "Computation creates models—digital doubles of phenomena. The Monte Carlo method, climate models, and AI brain maps show how simulation becomes indistinguishable from understanding, and how models shape the reality they represent.",
    questions: [
      "Why do scientists build computer models of natural phenomena?",
      "How does one determine whether a model is 'good enough'?",
      "What is the relationship between a model and a theory?",
      "What happens when two equally strong but distinct models compete?"
    ],
    readings: [
      {
        id: "r8a",
        title: "The Monte Carlo Method",
        author: "Nicolas Metropolis and Stanley Ulam",
        year: "1949",
        source: "Journal of the American Statistical Association 44(247): 335-341",
        type: "primary",
        description: "The invention of Monte Carlo simulation at Los Alamos: using random sampling to model nuclear reactions when equations were unsolvable—chance as a computational tool.",
        concepts: ["simulation", "randomness", "model", "nuclear", "uncertainty"],
        tensions: ["model vs reality", "randomness vs determinism"],
        institutions: ["military", "science", "national lab"]
      },
      {
        id: "r8b",
        title: "Stan Ulam, John von Neumann, and the Monte Carlo Method",
        author: "Roger Eckhardt",
        year: "1987",
        source: "Los Alamos Science",
        type: "secondary",
        description: "The human story of Monte Carlo: Ulam's convalescence, a card game, von Neumann's insight—and how wartime secrecy gave the method its casino code name.",
        concepts: ["simulation", "history of science", "Manhattan Project", "randomness"],
        tensions: ["secrecy vs openness", "military vs civilian science"],
        institutions: ["military", "national lab", "science"]
      },
      {
        id: "r8c",
        title: "On the Unreasonable Effectiveness of Mathematics in Natural Science",
        author: "Eugene P. Wigner",
        year: "1960",
        source: "Communications in Pure and Applied Mathematics",
        type: "primary",
        description: "Why does mathematics—invented abstractly—describe physical reality so precisely? Wigner's puzzle remains unanswered: the fit between mathematical structure and natural law is miraculous.",
        concepts: ["mathematics", "science", "modeling", "effectiveness", "philosophy"],
        tensions: ["abstract vs real", "discovered vs invented"],
        institutions: ["mathematics", "physics", "philosophy"]
      },
      {
        id: "r8d",
        title: "Geometric Analysis of Shell Coiling: General Problems",
        author: "David M. Raup",
        year: "1966",
        source: "Journal of Paleontology",
        type: "primary",
        description: "Raup showed that a three-parameter model generates the entire morphological space of coiled shells—most of which evolution never visited. Modeling reveals possibility space.",
        concepts: ["morphology", "model", "evolution", "possibility space", "simulation"],
        tensions: ["actual vs possible", "model vs organism"],
        institutions: ["science", "paleontology", "mathematics"]
      },
      {
        id: "r8e",
        title: "A Vast Machine: Computer Models, Climate Data, and the Politics of Global Warming",
        author: "Paul N. Edwards",
        year: "2010",
        source: "MIT Press, Chapters 1, 14, Conclusion",
        type: "secondary",
        description: "Climate models are not neutral tools but deeply political ones—shaped by military funding, Cold War data networks, and the politics of scientific consensus.",
        concepts: ["climate", "model", "data", "politics", "infrastructure"],
        tensions: ["model vs reality", "science vs politics", "consensus vs uncertainty"],
        institutions: ["military", "state", "science", "international organizations"]
      },
      {
        id: "r8f",
        title: "Simulated Subjects: The Promise & Peril of AI Stand-ins for Social Agents",
        author: "Austin Kozlowski and James Evans",
        year: "2025",
        source: "Sociological Methods & Research",
        type: "contemporary",
        description: "Can AI simulate human subjects in social science research? The promise of synthetic data meets the peril of models that reflect training data rather than human reality.",
        concepts: ["simulation", "AI", "social science", "synthetic data", "digital double"],
        tensions: ["model vs human", "efficiency vs validity"],
        institutions: ["science", "research", "corporation"]
      }
    ],
    explore: "Read about inverse molecular design using ML, or find an article using ML to construct a 'digital double' of a phenomenon."
  },
  {
    id: "w9",
    number: 9,
    title: "The Singularity?",
    dates: "May 19, 21",
    room: "future",
    summary: "What happens when machines surpass human intelligence? Kurzweil's singularity, Tegmark's life 3.0, Russell's human-compatible AI, and Evans' agentic explosion—competing visions of AI's ultimate trajectory and humanity's ultimate risk.",
    questions: [
      "What are the most compelling risks associated with AI?",
      "Are AI risks existential—do they threaten extinction or long-term prosperity reduction?",
      "What should humanity do to contain or mitigate these risks?",
      "Is the risk one superintelligent machine, a network of AI agents, or the new human-bot hybrid?"
    ],
    readings: [
      {
        id: "r9a",
        title: "The Singularity is Near",
        author: "Ray Kurzweil",
        year: "2005",
        source: "Prolog + Chapter 1, pp. 1-34",
        type: "primary",
        description: "Kurzweil's exponential optimism: the Singularity—when machine intelligence exceeds human—will usher in an era of radical abundance, immortality, and cosmic expansion.",
        concepts: ["singularity", "exponential growth", "utopia", "intelligence", "futures"],
        tensions: ["utopia vs dystopia", "human vs posthuman"],
        institutions: ["corporation", "futurism", "technology industry"]
      },
      {
        id: "r9b",
        title: "Life 3.0 (Prelude)",
        author: "Max Tegmark",
        year: "2017",
        source: "Prelude",
        type: "primary",
        description: "Tegmark's scenario: an AI that achieves superintelligence in secret, then transforms the economy and politics before anyone can respond—a parable for AI governance.",
        concepts: ["superintelligence", "governance", "risk", "scenario", "control"],
        tensions: ["speed vs oversight", "benefit vs control"],
        institutions: ["corporation", "state", "research"]
      },
      {
        id: "r9c",
        title: "Future Risks: Unaligned Artificial Intelligence",
        author: "Toby Ord",
        year: "2020",
        source: "The Precipice",
        type: "contemporary",
        description: "AI as existential risk: the chance that misaligned AI destroys civilization before alignment is solved—and why this probability, however small, demands urgent attention.",
        concepts: ["existential risk", "alignment", "safety", "extinction", "futures"],
        tensions: ["probability vs magnitude", "present vs future"],
        institutions: ["philosophy", "research", "policy"]
      },
      {
        id: "r9d",
        title: "Human-Compatible Artificial Intelligence",
        author: "Stuart Russell",
        year: "2021",
        source: "Human-Like Machine Intelligence, Oxford University Press",
        type: "contemporary",
        description: "Russell's 'assistance game' framework: AI that knows it doesn't know human preferences, and therefore defers to humans rather than maximizing a fixed objective.",
        concepts: ["alignment", "human values", "safety", "uncertainty", "cooperation"],
        tensions: ["control vs capability", "alignment vs performance"],
        institutions: ["research", "university", "policy"]
      },
      {
        id: "r9e",
        title: "Many Experts Say We Shouldn't Worry About Superintelligent AI. They're Wrong.",
        author: "Stuart Russell",
        year: "2019",
        source: "IEEE Spectrum",
        type: "contemporary",
        description: "Against complacency: the standard arguments for ignoring AI risk (it's not possible, it's far away, we'll figure it out) are logically flawed and dangerously self-serving.",
        concepts: ["risk", "complacency", "superintelligence", "governance", "urgency"],
        tensions: ["optimism vs precaution", "short vs long term"],
        institutions: ["research", "industry", "policy"]
      },
      {
        id: "r9f",
        title: "Agentic AI and the Next Intelligence Explosion",
        author: "James Evans, Benjamin Bratton, Blaise Aguera y Arcas",
        year: "2026",
        source: "Science",
        type: "contemporary",
        description: "The next phase: AI agents that act autonomously in the world, recursively improving themselves and each other—potentially triggering an intelligence explosion beyond human control.",
        concepts: ["agentic AI", "intelligence explosion", "risk", "autonomy", "futures"],
        tensions: ["autonomy vs control", "progress vs safety"],
        institutions: ["research", "corporation", "policy"]
      }
    ],
    explore: "Watch Her, The Matrix, or 2001: A Space Odyssey; or read 100 pages from a sci-fi novel like Neuromancer or The Diamond Age."
  }
];

// ============================================================
// CONCEPTUAL ROOMS — cross-week groupings
// ============================================================

const ROOMS = {
  counting: {
    id: "counting",
    name: "The Counting Room",
    icon: "⚙",
    description: "Where quantities are made from qualities. Calculation machines, statistical averages, social physics—the long history of turning the world into number.",
    color: "#8B6914",
    weeks: ["w1", "w4"],
    themes: ["calculation", "measurement", "statistics", "average", "data"]
  },
  labor: {
    id: "labor",
    name: "The Labor Room",
    icon: "⚒",
    description: "Human computers, programming as management, deskilling and reskilling—the persistent question of what machines do to workers and what workers do to machines.",
    color: "#7A3B2E",
    weeks: ["w1", "w3", "w6"],
    themes: ["labor", "deskilling", "automation", "human computers", "division of labor"]
  },
  creativity: {
    id: "creativity",
    name: "The Creativity Room",
    icon: "✦",
    description: "Can machines create? From Leibniz's universal calculus to Mozart's dice game to IBM's Chef Watson—the long argument about whether creativity is calculation.",
    color: "#2E5E4E",
    weeks: ["w2", "w5"],
    themes: ["creativity", "authorship", "algorithm", "generative", "art"]
  },
  control: {
    id: "control",
    name: "The Control Room",
    icon: "◎",
    description: "AI, alignment, and the problem of telling machines what we actually want. From the Turing Test to the paperclip maximizer—control as the central problem of intelligence.",
    color: "#3B3B6E",
    weeks: ["w5", "w9"],
    themes: ["control", "alignment", "intelligence", "safety", "risk"]
  },
  interface: {
    id: "interface",
    name: "The Interface Room",
    icon: "⬡",
    description: "Mice, screens, hypertext, neuro-implants—the history of interfaces as the history of augmented intelligence. The point where human and machine touch.",
    color: "#1A4A5E",
    weeks: ["w6", "w7"],
    themes: ["interface", "augmentation", "hypertext", "mouse", "tool"]
  },
  network: {
    id: "network",
    name: "The Network Room",
    icon: "◈",
    description: "ARPANET, PLATO, the WELL, the web—how computers became communication devices and communication became computation. Networks shape what can be thought.",
    color: "#4A2E6E",
    weeks: ["w7"],
    themes: ["network", "community", "communication", "internet", "social"]
  },
  double: {
    id: "double",
    name: "The Double Room",
    icon: "⬟",
    description: "Simulation, models, digital twins. The Monte Carlo method, climate models, shell morphologies—what does a model know that the thing itself doesn't?",
    color: "#2E4A3E",
    weeks: ["w8"],
    themes: ["simulation", "model", "digital double", "mathematics", "representation"]
  },
  future: {
    id: "future",
    name: "The Future Room",
    icon: "◬",
    description: "Singularity, alignment, existential risk. Where the course's historical arc meets its uncertain horizon—and students must decide what they believe.",
    color: "#4E2E2E",
    weeks: ["w9"],
    themes: ["futures", "risk", "singularity", "utopia", "dystopia", "existential"]
  }
};

// ============================================================
// LENSES — ways of re-sorting the course
// ============================================================

const LENSES = {
  chronology: {
    id: "chronology",
    name: "Chronology",
    icon: "⟳",
    description: "The arc of the course, week by week.",
    groups: [
      { label: "Origins (Weeks 1-2)", weeks: ["w1", "w2"] },
      { label: "The Machine Era (Weeks 3-4)", weeks: ["w3", "w4"] },
      { label: "Intelligence (Weeks 5-6)", weeks: ["w5", "w6"] },
      { label: "Society & Models (Weeks 7-8)", weeks: ["w7", "w8"] },
      { label: "Futures (Week 9)", weeks: ["w9"] }
    ]
  },
  humanCapacities: {
    id: "humanCapacities",
    name: "Human Capacities",
    icon: "⬡",
    description: "What human powers does computation extend, replace, or transform?",
    groups: [
      { label: "Calculation & Memory", weeks: ["w1", "w4", "w8"], readingIds: ["r1a","r1b","r4a","r8a","r6a"] },
      { label: "Creativity & Expression", weeks: ["w2", "w5"], readingIds: ["r2a","r2b","r2c","r2d","r5d"] },
      { label: "Communication & Sociality", weeks: ["w7"], readingIds: ["r7a","r7b","r7c","r7d"] },
      { label: "Reasoning & Intelligence", weeks: ["w3", "w5", "w6"], readingIds: ["r3a","r5a","r5c","r6b","r6d"] },
      { label: "Judgment & Control", weeks: ["w9"], readingIds: ["r9c","r9d","r9e","r9f"] }
    ]
  },
  socialInstitutions: {
    id: "socialInstitutions",
    name: "Social Institutions",
    icon: "◫",
    description: "Which institutions built, used, and were transformed by computation?",
    groups: [
      { label: "State & Empire", weeks: ["w1", "w4"], readingIds: ["r1a","r1b","r4a","r4b","r4c"] },
      { label: "Military & War", weeks: ["w5", "w8"], readingIds: ["r5b","r8a","r8b","r8e"] },
      { label: "Science & University", weeks: ["w2", "w3", "w4", "w8"], readingIds: ["r2c","r3d","r4b","r8c","r8d"] },
      { label: "Market & Corporation", weeks: ["w6", "w9"], readingIds: ["r6d","r9a","r9b"] },
      { label: "Community & Culture", weeks: ["w7"], readingIds: ["r7c","r7d"] }
    ]
  },
  ethicalTensions: {
    id: "ethicalTensions",
    name: "Ethical Tensions",
    icon: "⚖",
    description: "The moral fault lines running through the history of computation.",
    groups: [
      { label: "Who Deserves Credit?", weeks: ["w2", "w3"], readingIds: ["r2a","r2b","r2c","r3a","r3c"] },
      { label: "Free Will vs. Social Law", weeks: ["w4"], readingIds: ["r4a","r4b","r4c"] },
      { label: "Human vs. Machine Intelligence", weeks: ["w5", "w6"], readingIds: ["r5a","r5e","r6d"] },
      { label: "Deskilling & Labor Displacement", weeks: ["w1", "w3", "w6"], readingIds: ["r1b","r3c","r6d"] },
      { label: "Risk & Responsibility", weeks: ["w9"], readingIds: ["r9c","r9d","r9e","r9f"] }
    ]
  },
  laborAutomation: {
    id: "laborAutomation",
    name: "Labor & Automation",
    icon: "⚒",
    description: "From human computers to AI agents—the long arc of labor displacement.",
    groups: [
      { label: "Human Computers", weeks: ["w1", "w3"], readingIds: ["r1a","r1b","r3c"] },
      { label: "Programming as Management", weeks: ["w3"], readingIds: ["r3a","r3b","r3d"] },
      { label: "Statistical Labor", weeks: ["w4"], readingIds: ["r4a","r4c"] },
      { label: "Augmentation vs. Replacement", weeks: ["w6"], readingIds: ["r6b","r6d"] },
      { label: "Agentic Automation", weeks: ["w9"], readingIds: ["r9a","r9f"] }
    ]
  },
  memoryArchives: {
    id: "memoryArchives",
    name: "Memory & Archives",
    icon: "⬛",
    description: "How computation stores, retrieves, and structures memory—from Babbage's store to Bush's memex to cloud archives.",
    groups: [
      { label: "Machine Memory", weeks: ["w1", "w3"], readingIds: ["r1b","r3a","r3d"] },
      { label: "Statistical Records", weeks: ["w4"], readingIds: ["r4a","r4c"] },
      { label: "The Memex & Associative Trails", weeks: ["w6"], readingIds: ["r6a","r6b"] },
      { label: "Networked Archives", weeks: ["w7"], readingIds: ["r7b","r7c","r7d"] },
      { label: "Models as Memory", weeks: ["w8"], readingIds: ["r8e","r8f"] }
    ]
  },
  modelingDoubles: {
    id: "modelingDoubles",
    name: "Modeling & Digital Doubles",
    icon: "⬟",
    description: "The computational drive to simulate, represent, and replace phenomena with models.",
    groups: [
      { label: "Early Formalization", weeks: ["w2"], readingIds: ["r2a","r2b"] },
      { label: "Statistical Models of Society", weeks: ["w4"], readingIds: ["r4a","r4b","r4c"] },
      { label: "Neural Models of Cognition", weeks: ["w5"], readingIds: ["r5c","r5d"] },
      { label: "Simulation & Monte Carlo", weeks: ["w8"], readingIds: ["r8a","r8b","r8c","r8d"] },
      { label: "AI Stand-ins for Humans", weeks: ["w8"], readingIds: ["r8f"] }
    ]
  },
  riskFutures: {
    id: "riskFutures",
    name: "Risk & Futures",
    icon: "◬",
    description: "How computation has shaped visions of the future—utopian and dystopian—and what genuine risks may lie ahead.",
    groups: [
      { label: "Computation as Natural Order", weeks: ["w3", "w4"], readingIds: ["r3b","r4a","r4c"] },
      { label: "AI Utopias", weeks: ["w5", "w9"], readingIds: ["r5a","r9a","r9b"] },
      { label: "The Turing Trap", weeks: ["w6"], readingIds: ["r6d"] },
      { label: "Network Risks", weeks: ["w7"], readingIds: ["r7c"] },
      { label: "Existential Risk", weeks: ["w9"], readingIds: ["r9c","r9d","r9e","r9f"] }
    ]
  }
};

// ============================================================
// ASSOCIATIVE TRAILS — paths through the course
// ============================================================

const TRAILS = [
  {
    id: "t1",
    title: "From Mechanical Aid to Labor Replacement",
    description: "Trace computation's relationship with labor from 17th-century calculators to agentic AI—each step a new negotiation between human skill and machine capability.",
    stops: [
      { readingId: "r1a", note: "Pascal frames his calculator as labor-saving—replacing tedious arithmetic work done by hand." },
      { readingId: "r1b", note: "Jones shows that the 'carry' mechanism wasn't just technical but about automating a specifically human cognitive act." },
      { readingId: "r3c", note: "Gier reveals that 'computers' were people—workers in a factory of calculation, subject to Taylorist management." },
      { readingId: "r3a", note: "Lovelace's notes transform Babbage's engine from a calculator into a universal machine—and raise the question of who programs whom." },
      { readingId: "r6d", note: "Brynjolfsson distinguishes the Turing Trap: AI designed to imitate humans replaces them; AI designed to augment them creates value." },
      { readingId: "r9f", note: "Evans et al. argue agentic AI triggers a next intelligence explosion—making the labor question existential, not merely economic." }
    ]
  },
  {
    id: "t2",
    title: "Computation as Creativity",
    description: "Is creativity calculation? Follow the argument from Leibniz's universal characteristic through Mozart's dice game to IBM's Chef Watson and Clarke's theological parable.",
    stops: [
      { readingId: "r2a", note: "Leibniz imagines a calculus of all truths—creativity as symbol manipulation." },
      { readingId: "r2b", note: "Mozart's dice game shows that combinatorics can generate music indistinguishable from composed pieces." },
      { readingId: "r2d", note: "Clarke's monks ask: if a computer can enumerate all names of God, who is the creator?" },
      { readingId: "r2c", note: "IBM's Chef Watson applies big-data combinatorics to culinary creativity—with surprisingly compelling results." },
      { readingId: "r5d", note: "Deep learning generates images, text, and music—raising the question of whether the distinction between human and machine creativity survives." },
      { readingId: "r5e", note: "Farrell et al. argue LLMs are cultural artifacts: they create by recombining human expression, making them mirrors of us." }
    ]
  },
  {
    id: "t3",
    title: "From Social Statistics to AI Bias",
    description: "How the drive to measure society mathematically—from Quetelet's average man to algorithmic decision-making—embeds assumptions about normality, deviation, and who counts.",
    stops: [
      { readingId: "r4a", note: "Quetelet's 'average man' makes statistical normality a social ideal—deviants are errors, not individuals." },
      { readingId: "r4b", note: "Gigerenzer shows how probability became the language of objectivity—while encoding particular social assumptions." },
      { readingId: "r4c", note: "Porter traces how 'objectivity' through numbers gained trust precisely because it displaced human judgment." },
      { readingId: "r5c", note: "McCulloch and Pitts model neurons as logic gates—embedding a particular theory of mind in every subsequent AI system." },
      { readingId: "r5e", note: "Farrell et al. show LLMs are trained on human culture and therefore reproduce its biases, stereotypes, and power structures." }
    ]
  },
  {
    id: "t4",
    title: "From Interfaces to Augmented Intelligence",
    description: "The lineage from Bush's memex through Engelbart's demo to contemporary AI interfaces—each an attempt to extend the human mind rather than replace it.",
    stops: [
      { readingId: "r6a", note: "Bush's memex: personal knowledge organized by associative trails rather than hierarchical index—the founding vision." },
      { readingId: "r6b", note: "Engelbart translates Bush's vision into a research program—the mouse, hypertext, and collaborative editing emerge." },
      { readingId: "r6c", note: "The Mother of All Demos (1968): Engelbart demonstrates everything we now take for granted, 50 years early." },
      { readingId: "r7b", note: "Licklider and Taylor extend augmentation to networks: the computer as communication device between augmented minds." },
      { readingId: "r6d", note: "Brynjolfsson asks whether modern AI is augmenting or replacing—and argues we've been choosing the wrong path." }
    ]
  },
  {
    id: "t5",
    title: "From Models to Digital Doubles",
    description: "How simulation became science—from Monte Carlo methods in nuclear physics to climate models to AI stand-ins for human subjects.",
    stops: [
      { readingId: "r8a", note: "Metropolis and Ulam invent Monte Carlo: randomness as a tool for solving equations that are analytically intractable." },
      { readingId: "r8c", note: "Wigner asks why mathematics fits nature so precisely—the question that makes models seem miraculous." },
      { readingId: "r8d", note: "Raup's shell model shows that a handful of parameters generates the entire space of biological possibility—most of which evolution never explored." },
      { readingId: "r8e", note: "Edwards shows climate models are not neutral: they carry Cold War funding, political assumptions, and contested data." },
      { readingId: "r8f", note: "Kozlowski and Evans ask: can AI simulate human subjects? The promise and peril of replacing people with digital doubles." }
    ]
  },
  {
    id: "t6",
    title: "From Automation to Existential Risk",
    description: "The escalating ambition of the AI project—from replacing arithmetic to replacing human judgment to, perhaps, replacing humanity.",
    stops: [
      { readingId: "r1a", note: "Pascal's calculator: automation of arithmetic, framed as relief from tedium." },
      { readingId: "r5a", note: "Turing's test: automation of intelligence, framed as imitation of human thought." },
      { readingId: "r9a", note: "Kurzweil's Singularity: automation of intelligence itself—machines that improve faster than humans can understand." },
      { readingId: "r9c", note: "Ord's existential risk: the chance, however small, that misaligned AI ends civilization." },
      { readingId: "r9d", note: "Russell's solution: AI that defers to human preferences rather than maximizing fixed objectives." },
      { readingId: "r9f", note: "Evans et al.: agentic AI triggers recursive self-improvement—a potential intelligence explosion with no guaranteed off-switch." }
    ]
  }
];

// ============================================================
// CONCEPT GLOSSARY — recurring terms across the course
// ============================================================

const CONCEPTS = [
  "calculation", "automation", "labor", "deskilling", "creativity", "authorship",
  "algorithm", "statistics", "average", "social law", "free will", "intelligence",
  "imitation", "neural network", "deep learning", "augmentation", "interface",
  "hypertext", "memory", "archive", "network", "community", "simulation",
  "model", "digital double", "risk", "alignment", "singularity", "futures",
  "language", "bias", "culture", "society", "data", "probability", "control"
];

// Export for use in script.js
if (typeof module !== 'undefined') {
  module.exports = { WEEKS, ROOMS, LENSES, TRAILS, CONCEPTS };
}
